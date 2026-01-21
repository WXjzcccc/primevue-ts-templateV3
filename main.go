package main

import (
	"changeme/services"
	"embed"
	_ "embed"
	"log"

	"github.com/wailsapp/wails/v3/pkg/application"
)

// Wails uses Go's `embed` package to embed the frontend files into the binary.
// Any files in the frontend/dist folder will be embedded into the binary and
// made available to the frontend.
// See https://pkg.go.dev/embed for more information.

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func init() {
	// Register a custom event whose associated data type is string.
	// This is not required, but the binding generator will pick up registered events
	// and provide a strongly typed JS/TS API for them.
	application.RegisterEvent[string]("time")
}

// main function serves as the application's entry point. It initializes the application, creates a window,
// and starts a goroutine that emits a time-based event every second. It subsequently runs the application and
// logs any error that might occur.
func main() {

	// Create a new Wails application by providing the necessary options.
	// Variables 'Name' and 'Description' are for application metadata.
	// 'Assets' configures the asset server with the 'FS' variable pointing to the frontend files.
	// 'Bind' is a list of Go struct instances. The frontend has access to the methods of these instances.
	// 'Mac' options tailor the application when running an macOS.
	app := application.New(application.Options{
		Name:        "primevue-ts-templateV3",
		Description: "A demo of using raw HTML & CSS",
		Services: []application.Service{
			application.NewService(&services.GreetService{}),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	app.SetIcon(icon)

	// Create a new window with the necessary options.
	// 'Title' is the title of the window.
	// 'Mac' options tailor the window when running on macOS.
	// 'BackgroundColour' is the background colour of the window.
	// 'URL' is the URL that will be loaded into the webview.
	window := app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title: "App",
		Name:  "Main",
		Mac: application.MacWindow{
			InvisibleTitleBarHeight: 50,
			Backdrop:                application.MacBackdropTranslucent,
			TitleBar:                application.MacTitleBarHiddenInset,
		},
		Height:           600,
		Width:            800,
		Frameless:        true,
		BackgroundColour: application.NewRGB(27, 38, 54),
		URL:              "/",
		// 隐藏任务栏上的图标，但后续没有办法切换，可用于设置类或悬浮类窗口
		// Windows: application.WindowsWindow{
		// 	HiddenOnTaskbar: true,
		// },
	})

	trayMenu := app.Menu.New()
	trayMenu.Add("打开").OnClick(func(ctx *application.Context) {
		if window.IsMinimised() {
			window.Restore()
		} else if !window.IsVisible() {
			window.Show()
		}
	})
	trayMenu.Add("退出").OnClick(func(ctx *application.Context) {
		app.Quit()
	})

	sysTray := app.SystemTray.New()
	sysTray.SetIcon(icon)
	sysTray.SetLabel("app")
	sysTray.SetTooltip("primevue-ts-templateV3")
	sysTray.SetMenu(trayMenu)

	// Run the application. This blocks until the application has been exited.
	err := app.Run()

	// If an error occurred while running the application, log it and exit.
	if err != nil {
		log.Fatal(err)
	}
}
