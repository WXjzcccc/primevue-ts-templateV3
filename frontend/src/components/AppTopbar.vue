<script setup lang="ts">
import { ref } from 'vue';
import { useLayout } from "../composables/useLayout";
import AppConfig from "./AppConfig.vue";
import { Window } from '@wailsio/runtime';

const { isDarkMode, toggleDarkMode } = useLayout();
const isMaximized = ref(false);
const isWailsEnvironment = ref(false);

const minimizeWindow = () => {
    Window.Minimise();
};

const toggleMaximizeWindow = () => {
    Window.ToggleMaximise();
    Window.IsMaximised().then((maximized) => {
        isMaximized.value = maximized;
    });
};

// 关闭窗口（暂时空着）
const closeWindow = () => {
    Window.Close();
};
</script>

<template>
    <div class="topbar" style="--wails-draggable: drag;">
        <div class="topbar-container">
            <div class="topbar-brand">
                <img src="/wails.png" alt="Wails" class="topbar-logo" style="--wails-draggable: no-drag;"
                    draggable="false" onmousedown="return false;" onselectstart="return false;" />
                <span class="topbar-brand-text" style="--wails-draggable: no-drag;">
                    <span class="topbar-title">PrimeVue Template V3</span>
                    <span class="topbar-subtitle">Vue3 + TypeScript + bun</span>
                </span>
            </div>
            <div class="topbar-actions" style="--wails-draggable: no-drag;">
                <Button type="button" class="topbar-theme-button" @click="toggleDarkMode" text rounded>
                    <i :class="['pi ', 'pi ', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
                </Button>
                <div class="relative">
                    <Button v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-scalein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-fadeout',
                        hideOnOutsideClick: true,
                    }" icon="pi pi-palette" text rounded aria-label="Settings" />
                    <AppConfig />

                </div>
                <Button type="button" class="topbar-theme-button" @click="minimizeWindow" icon="pi pi-minus" text
                    rounded />
                <Button type="button" class="topbar-theme-button" @click="toggleMaximizeWindow" text rounded>
                    <i :class="['pi', isMaximized ? 'pi-window-minimize' : 'pi-window-maximize']" />
                </Button>
                <Button type="button" class="topbar-theme-button topbar-close-button" icon="pi pi-times"
                    @click="closeWindow" text rounded>
                    <i class="pi pi-times" style="color: red;" />
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.topbar-logo {
    height: 2rem;
    margin-right: 0.75rem;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    pointer-events: none;
}
</style>
