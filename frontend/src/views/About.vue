<template>
  <div class="page-container">
    <Card class="about-card">
      <template #content>
        <div class="about-content">
          <div class="welcome-section">
            <div class="welcome-icon">
              <i class="pi pi-sparkles"></i>
            </div>
            <h1 class="welcome-title">欢迎</h1>
            <p class="welcome-message">{{ greetMessage }}</p>
          </div>

          <Divider />

          <div class="info-section">
            <div class="info-item">
              <div class="info-icon" style="background-color: var(--p-primary-100); color: var(--p-primary-600);">
                <i class="pi pi-code"></i>
              </div>
              <div class="info-text">
                <h3>技术栈</h3>
                <p>Wails3 + Vue3 + TypeScript + PrimeVue</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon" style="background-color: var(--p-orange-100); color: var(--p-orange-600);">
                <i class="pi pi-send"></i>
              </div>
              <div class="info-text">
                <h3>快速开发</h3>
                <p>基于模板快速构建桌面应用</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon" style="background-color: var(--p-cyan-100); color: var(--p-cyan-600);">
                <i class="pi pi-shield"></i>
              </div>
              <div class="info-text">
                <h3>类型安全</h3>
                <p>全栈 TypeScript 类型支持</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useGreetStore } from '../store/modules/greet';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

const greetStore = useGreetStore();
const greetMessage = computed(() => greetStore.message);

onMounted(() => {
  greetStore.fetchGreet('Coder');
});
</script>

<style scoped>
.about-card {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem 0;
}

.welcome-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--p-primary-500), var(--p-cyan-500));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

.welcome-message {
  font-size: 1.25rem;
  color: var(--p-text-color-secondary);
  margin: 0;
  padding: 0 1rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--p-surface-100);
  transition: transform 0.2s, box-shadow 0.2s;
  color: var(--p-primary-700)
}

.p-dark .info-item {
  background-color: var(--p-surface-800);
}

.info-item:hover {
  transform: translateX(0.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-text h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.info-text p {
  font-size: 0.875rem;
  color: var(--p-text-color-secondary);
  margin: 0;
}
</style>
