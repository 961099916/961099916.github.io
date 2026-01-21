<script setup>
/**
 * 部署信息展示组件
 * 作者: jiuxialb
 * 创建时间: 2026-01-22
 */
import { ref, onMounted } from 'vue';

const deployInfo = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch('/deploy-info.json');
    if (response.ok) {
      deployInfo.value = await response.json();
    }
  } catch (e) {
    console.log('无法获取部署信息');
  } finally {
    loading.value = false;
  }
});

const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};
</script>

<template>
  <div class="deploy-info" v-if="!loading && deployInfo">
    <span class="deploy-badge">
      <span class="icon">🚀</span>
      <span class="label">部署时间：</span>
      <span class="time">{{ formatTime(deployInfo.deployTime) }}</span>
    </span>
  </div>
</template>

<style scoped>
.deploy-info {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.deploy-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2rem;
  font-size: 0.85rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.deploy-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.icon {
  font-size: 1rem;
}

.label {
  opacity: 0.9;
}

.time {
  font-weight: 600;
}

/* 暗色模式适配 */
:root[data-theme="dark"] .deploy-badge {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>
