<template>
  <div class="empty-container">
    <div class="empty-icon">
      <i class="pi pi-inbox"></i>
    </div>
    <div class="empty-description">
      {{ description }}
    </div>
    <div v-if="action" class="empty-action">
      <Button :label="actionText" @click="handleAction" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  description?: string;
  action?: boolean;
  actionText?: string;
}

interface Emits {
  (e: 'action'): void;
}

const props = withDefaults(defineProps<Props>(), {
  description: '暂无数据',
  action: false,
  actionText: '操作'
});

const emit = defineEmits<Emits>();

const handleAction = (): void => {
  emit('action');
};
</script>

<style scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  min-height: 200px;
  color: var(--p-surface-500);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.empty-action {
  margin-top: 1rem;
}

/* 暗色主题适配 */
.p-dark .empty-container {
  color: var(--p-surface-400);
}

.p-dark .empty-icon {
  opacity: 0.5;
}
</style>