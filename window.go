package main

import (
	"context"
	"fmt"
	"syscall"
	"unsafe"

	"github.com/wailsapp/wails/v3/pkg/application"
)

var (
	user32 = syscall.NewLazyDLL("user32.dll")

	procFindWindow         = user32.NewProc("FindWindowW")
	procFindWindowEx       = user32.NewProc("FindWindowExW")
	procSetParent          = user32.NewProc("SetParent")
	procSendMessageTimeout = user32.NewProc("SendMessageTimeoutW")
	procIsWindowVisible    = user32.NewProc("IsWindowVisible")
	procGetWindowLongPtrW  = user32.NewProc("GetWindowLongPtrW")
	procSetWindowLongPtrW  = user32.NewProc("SetWindowLongPtrW")
	procGetAncestor        = user32.NewProc("GetAncestor")
	procSetWindowPos       = user32.NewProc("SetWindowPos")
)

type DesktopWindowTool struct {
	ctx         context.Context
	window      *application.WebviewWindow
	hwnd        uintptr
	initialWinX int
	initialWinY int
}

func NewDesktopWindowTool(window *application.WebviewWindow) *DesktopWindowTool {
	return &DesktopWindowTool{
		window: window,
	}
}

func (d *DesktopWindowTool) Startup(ctx context.Context) {
	d.ctx = ctx
}

// AttachToDesktop 将窗口附加到桌面层
func (d *DesktopWindowTool) AttachToDesktop() error {
	d.hwnd = uintptr(d.window.NativeWindow())

	// 设置窗口样式
	d.setWindowStyle()

	// 附加到桌面
	d.attachToDesktopWorker()

	return nil
}

// GetWindowHandle 获取窗口句柄
func (d *DesktopWindowTool) getWindowHandle() (uintptr, error) {
	// Wails 3 中可以通过 runtime.WindowGetHandle 获取句柄
	// 这里我们使用 Windows API 查找窗口
	windowTitle := d.window.Name()

	// 转换为 UTF16
	titlePtr, err := syscall.UTF16PtrFromString(windowTitle)
	if err != nil {
		return 0, err
	}

	// 查找窗口
	hwnd, _, _ := procFindWindow.Call(0, uintptr(unsafe.Pointer(titlePtr)))
	if hwnd == 0 {
		return 0, fmt.Errorf("未找到窗口: %s", windowTitle)
	}

	return hwnd, nil
}

// SetWindowStyle 设置窗口样式
func (d *DesktopWindowTool) setWindowStyle() {
	if d.hwnd == 0 {
		return
	}

	const (
		GWL_EXSTYLE       = -20
		WS_EX_TOOLWINDOW  = 0x00000080
		WS_EX_NOACTIVATE  = 0x08000000
		WS_EX_TRANSPARENT = 0x00000020
		WS_EX_LAYERED     = 0x00080000
	)
	var nIndexInt int32 = GWL_EXSTYLE
	// 获取当前扩展样式
	currentStyle, _, _ := procGetWindowLongPtrW.Call(
		d.hwnd,
		uintptr(nIndexInt),
	)

	// 设置新样式
	newStyle := currentStyle | uintptr(WS_EX_TOOLWINDOW|WS_EX_NOACTIVATE)
	procSetWindowLongPtrW.Call(
		d.hwnd,
		uintptr(nIndexInt),
		newStyle,
	)
}

// attachToDesktopWorker 附加到 WorkerW 桌面窗口
func (d *DesktopWindowTool) attachToDesktopWorker() {
	if d.hwnd == 0 {
		return
	}

	desktopHWND := d.findDesktopWorkerWindow()
	if desktopHWND == 0 {
		return
	}

	// 设置父窗口
	procSetParent.Call(d.hwnd, desktopHWND)

	// 确保窗口在最底层（桌面图标之上）
	const (
		HWND_BOTTOM    = 1
		SWP_NOSIZE     = 0x0001
		SWP_NOMOVE     = 0x0002
		SWP_NOACTIVATE = 0x0010
	)

	procSetWindowPos.Call(
		d.hwnd,
		uintptr(HWND_BOTTOM),
		0, 0, 0, 0,
		uintptr(SWP_NOSIZE|SWP_NOMOVE|SWP_NOACTIVATE),
	)
}

// findDesktopWorkerWindow 查找 WorkerW 桌面窗口
func (d *DesktopWindowTool) findDesktopWorkerWindow() uintptr {
	// 1. 查找 Progman
	progman, _, _ := procFindWindow.Call(
		uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr("Progman"))),
		0,
	)

	// 2. 发送 0x052C 消息，触发 WorkerW 生成
	var result uintptr
	procSendMessageTimeout.Call(
		progman, 0x052C, 0, 0, 0, 1000, uintptr(unsafe.Pointer(&result)),
	)

	// 3. 核心逻辑：找到包含 SHELLDLL_DefView 的 WorkerW，
	//    然后取它的【下一个兄弟窗口】，那个才是真正的壁纸层 WorkerW。
	var workerW uintptr = 0

	// 遍历所有顶层窗口
	cb := syscall.NewCallback(func(hwnd uintptr, lParam uintptr) uintptr {
		// 查找该窗口下是否有 SHELLDLL_DefView
		shellDll, _, _ := procFindWindowEx.Call(
			hwnd, 0,
			uintptr(unsafe.Pointer(syscall.StringToUTF16Ptr("SHELLDLL_DefView"))),
			0,
		)

		if shellDll != 0 {
			// 找到了包含图标层的 WorkerW (或者 Progman)
			// 真正的壁纸层 WorkerW 是它的下一个兄弟
			// 使用 GetWindow(GW_HWNDNEXT) 查找
			const GW_HWNDNEXT = 2
			workerW, _, _ = user32.NewProc("GetWindow").Call(hwnd, GW_HWNDNEXT)
			return 0 // 停止枚举
		}
		return 1 // 继续枚举
	})

	// EnumWindows
	user32.NewProc("EnumWindows").Call(cb, 0)

	if workerW != 0 {
		return workerW
	}

	// 如果没找到，兜底返回 Progman (通常在 Win7 或未开启透明效果时)
	return progman
}

// DetachFromDesktop 从桌面分离窗口
func (d *DesktopWindowTool) DetachFromDesktop() error {
	if d.hwnd == 0 {
		return nil
	}

	// 将父窗口设置为空（桌面）
	procSetParent.Call(d.hwnd, 0)

	// 恢复窗口样式
	d.restoreWindowStyle()

	return nil
}

func (d *DesktopWindowTool) restoreWindowStyle() {
	if d.hwnd == 0 {
		return
	}

	const (
		GWL_EXSTYLE      = -20
		WS_EX_TOOLWINDOW = 0x00000080
		WS_EX_NOACTIVATE = 0x08000000
	)
	var nIndexInt int32 = GWL_EXSTYLE

	currentStyle, _, _ := procGetWindowLongPtrW.Call(
		d.hwnd,
		uintptr(nIndexInt),
	)

	newStyle := currentStyle & ^uintptr(WS_EX_TOOLWINDOW|WS_EX_NOACTIVATE)
	procSetWindowLongPtrW.Call(
		d.hwnd,
		uintptr(nIndexInt),
		newStyle,
	)
}
