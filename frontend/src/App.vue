<script setup lang="ts">
import AppTopbar from "./components/AppTopbar.vue";
import AppFooter from "./components/AppFooter.vue";
import AppSidebar from "./components/AppSidebar.vue";
import { onMounted, onUnmounted } from 'vue';

const handleGlobalDragOver = (e: Event) => {
    e.preventDefault();
};

const handleGlobalDrop = (e: Event) => {
    e.preventDefault();
};

onMounted(() => {
    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('drop', handleGlobalDrop);
});

onUnmounted(() => {
    document.removeEventListener('dragover', handleGlobalDragOver);
    document.removeEventListener('drop', handleGlobalDrop);
});
</script>

<template>
    <div class="app-layout">
        <AppTopbar />
        <div class="app-body">
            <AppSidebar />
            <div class="app-content">
                <router-view v-slot="{ Component }">
                    <transition name="page-transition" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
        <!-- <AppFooter /> -->
    </div>
</template>

<style>
/* 页面过渡效果样式 */
.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 400ms ease;
}

.page-transition-enter-from {
    transform: scale(0.9);
}

.page-transition-leave-to {
    transform: scale(1.1);
}

.page-transition-enter-active,
.page-transition-leave-active {
    transition: transform 400ms ease, opacity 400ms ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
    opacity: 0;
}
</style>
