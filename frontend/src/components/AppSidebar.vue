<template>
    <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }" style="--wails-draggable: drag;">
        <Menu :model="menuItems" class="sidebar-menu">
            <template #start>
                <div class="sidebar-header">
                    <Button @click="toggleSidebar" class="toggle-button"
                        :icon="isCollapsed ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'" text />
                </div>
            </template>

            <template #item="{ item, props }">
                <a v-ripple class="menu-link" v-bind="props.action" @click="navigateTo(item.route)"
                    :class="{ 'active': $route.name === item.name }">
                    <span :class="item.icon" />
                    <span v-if="!isCollapsed" class="menu-text">{{ item.label }}</span>
                </a>
            </template>

            <template #end>
                <div class="sidebar-footer" style="--wails-draggable: no-drag;">
                    <Button @click="showMsg" text> {{ version }} </Button>
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLayout } from '../composables/useLayout';
import { useToast } from 'primevue';

interface MenuItem {
    label: string;
    icon: string;
    command?: () => void;
    name?: string;
    route?: string;
}

const { isDarkMode, toggleDarkMode } = useLayout();
const router = useRouter();
const route = useRoute();
const isCollapsed = ref(false);
const windowWidth = ref(window.innerWidth);
const version = ref('');
const drawerVisible = ref(false);
const toast = useToast();

const menuItems = ref<MenuItem[]>([
    {
        label: '仪表盘',
        icon: 'pi pi-chart-line',
        command: () => navigateTo('/Dashboard'),
        name: 'Dashboard'
    },
    {
        label: '关于',
        icon: 'pi pi-info-circle',
        command: () => navigateTo('/About'),
        name: 'About'
    }
]);

const toggleSidebar = (): void => {
    isCollapsed.value = !isCollapsed.value;
};

const navigateTo = (routePath: string): void => {
    if (routePath) {
        router.push(routePath);
    }
};

const updateWindowWidth = (): void => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value < 768) {
        isCollapsed.value = true;
    } else {
        isCollapsed.value = false;
    }
};

const showMsg = (): void => {
    toast.add({ severity: 'info', summary: '版本信息', detail: version.value, life: 1500 });
};

onMounted(() => {
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
    version.value = '1.0.0';
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});
</script>

<style scoped>
.sidebar {
    width: 15vw;
    min-width: 60px;
    max-width: 300px;
    background-color: var(--p-surface-100);
    border-right: 1px solid var(--p-surface-200);
    display: flex;
    flex-direction: column;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100vh;
    position: relative;
    will-change: width;
}

.p-dark .sidebar {
    background-color: var(--p-surface-900);
    border-right-color: var(--p-surface-700);
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.toggle-button {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sidebar-collapsed {
    width: 5vw;
}

.sidebar-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-top: 1px solid var(--p-surface-200);
}

.p-dark .sidebar-footer {
    border-top-color: var(--p-surface-700);
}

.version-text {
    font-size: 0.75rem;
    color: var(--p-primary-600);
}

.p-dark .version-text {
    color: var(--p-primary-400);
}

.menu-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--p-surface-700);
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
    border-radius: 0;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.8rem;
    height: 3rem;
    /* 固定高度防止跳动 */
    position: relative;
    /* 为绝对定位的文字提供参考 */
}

.p-dark .menu-link {
    color: var(--p-surface-300);
}

.menu-link:hover {
    background-color: var(--p-surface-200);
    color: var(--p-surface-900);
}

.p-dark .menu-link:hover {
    background-color: var(--p-surface-800);
    color: var(--p-surface-0);
}

.menu-link.active {
    background-color: var(--p-primary-100);
    color: var(--p-primary-700);
    border-right: 3px solid var(--p-primary-500);
}

.p-dark .menu-link.active {
    background-color: color-mix(in srgb, var(--p-primary-400), transparent 80%);
    color: var(--p-primary-300);
}

.menu-text {
    position: absolute;
    left: 2.5rem;
    /* 图标位置 + 间距 */
    white-space: nowrap;
    overflow: hidden;
    opacity: 1;
    max-width: 200px;
    transition: opacity 0.2s ease, max-width 0.3s ease;
    pointer-events: none;
}

.menu-text-hidden {
    opacity: 0;
    max-width: 0;
}

.p-message {
    margin-top: .5rem;
}

/* 收起状态下的样式调整 */
.sidebar-collapsed .sidebar-header {
    padding: 1rem 0;
}

.sidebar-collapsed .menu-link {
    justify-content: center;
    padding: 0.75rem 0;
}

.sidebar-collapsed .menu-text {
    display: block;
    /* 保持显示但透明 */
}

/* 确保收起状态下菜单项宽度不超过侧边栏宽度 */
.sidebar-collapsed :deep(.p-menu) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
}

.sidebar-collapsed :deep(.p-menuitem-link) {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.sidebar-collapsed :deep(.p-menuitem-content) {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.sidebar-collapsed :deep(.p-menuitem) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}

.sidebar-collapsed :deep(.p-menuitem-icon) {
    margin: 0;
}

.sidebar-collapsed :deep(.p-menuitem-text) {
    display: none;
}

/* 调整PrimeVue Menu组件的样式 */
:deep(.p-menu) {
    border: none;
    background: transparent;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.p-menu-list) {
    flex: 1;
    overflow-y: auto;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
}

:deep(.p-menuitem) {
    margin: 0;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
}

:deep(.p-menuitem-content) {
    padding: 0;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
}

:deep(.p-submenu-header) {
    padding: 0;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
}

:deep(.p-menuitem-link) {
    padding: 0;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>