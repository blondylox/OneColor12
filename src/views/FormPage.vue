<template>
  <div class="form-page">
    <h1>Добавить цвет</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Название цвета:</label>
        <input 
          v-model="formData.name" 
          type="text" 
          required
          placeholder="Например: Лавандовый"
        >
      </div>
      
      <div class="form-group">
        <label>HEX-код:</label>
        <input 
          v-model="formData.hex" 
          type="text" 
          required
          pattern="#[0-9A-Fa-f]{6}"
          placeholder="#RRGGBB"
        >
      </div>
      
      <button 
        type="submit" 
        :disabled="isLoading"
        class="submit-btn"
      >
        {{ isLoading ? 'Отправка...' : 'Отправить' }}
      </button>
    </form>

    <!-- Блок отображения результатов -->
    <div v-if="message" class="message" :class="{ error: isError }">
      {{ message }}
      <pre v-if="responseData">{{ responseData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useColorStore } from '@/stores/colorStore'

const colorStore = useColorStore()
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)
const responseData = ref(null)

const formData = ref({
  name: '',
  hex: '',
  userId: 1 
})

const handleSubmit = async () => {
  isLoading.value = true
  message.value = ''
  isError.value = false
  responseData.value = null

  try {
    const data = await colorStore.submitForm(formData.value)
    message.value = 'Цвет успешно добавлен!'
    responseData.value = data
    console.log('Ответ сервера:', data)
    
    // Очистка формы после успешной отправки
    formData.value = { name: '', hex: '', userId: 1 }
  } catch (error) {
    isError.value = true
    message.value = 'Ошибка при отправке: ' + error.message
    console.error('Ошибка:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #3e8e41;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  background: #e8f5e9;
}

.message.error {
  background: #ffebee;
  color: #d32f2f;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  margin-top: 10px;
}
</style>