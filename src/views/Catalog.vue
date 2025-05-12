<template>
  <div class="catalog-page">
    <div class="header">
      <h1>Каталог цветов</h1>
      <div class="controls">
        <button 
          @click="fetchColors" 
          class="refresh-btn"
          :disabled="colorStore.isLoading"
        >
          <span v-if="colorStore.isLoading">
            <i class="loader"></i> Загрузка...
          </span>
          <span v-else>
            Обновить из API
          </span>
        </button>
        <div v-if="colorStore.lastUpdated" class="last-updated">
          Последнее обновление: {{ colorStore.lastUpdated }}
        </div>
      </div>
    </div>

    <div v-if="colorStore.error" class="error-message">
      {{ colorStore.error }}
    </div>

    <div class="colors-grid">
      <div 
        v-for="color in colorStore.colors" 
        :key="color.id" 
        class="color-card"
        :style="{ backgroundColor: color.hex }"
      >
        <div class="color-space"></div>
        <div class="color-info">
          <div class="color-name">{{ color.name }}</div>
          <div class="color-code">HEX: {{ color.hex }}</div>
          <div class="color-code">RGB: {{ color.rgb }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useColorStore } from '@/stores/colorStore'

const colorStore = useColorStore()

const fetchColors = async () => {
  try {
    await colorStore.fetchColorsFromApi()
  } catch (error) {
    console.error('Ошибка:', error)
  }
}

onMounted(() => {
  if (colorStore.colors.length <= 4) {
    fetchColors()
  }
})
</script>

<style scoped>
.catalog-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.refresh-btn:hover {
  background-color: #3367d6;
}

.refresh-btn:disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
}

.last-updated {
  font-size: 12px;
  color: #666;
}

.error-message {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.color-card {
  width: 200px;
  border: 1px solid #ccc;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  transition: transform 0.3s ease;
}

.color-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.color-space {
  flex: 1;
}

.color-info {
  background-color: #fff;
  color: #000;
  padding: 16px;
}

.color-name {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}

.color-code {
  font-size: 12px;
  margin-bottom: 4px;
}

.loader {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>