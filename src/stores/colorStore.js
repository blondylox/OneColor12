import { defineStore } from 'pinia'
import axios from 'axios'

export const useColorStore = defineStore('colors', {
  state: () => ({
    colors: [
      { id: 1, name: 'Indian Red', hex: '#CD5C5C', rgb: '205, 92, 92' },
      { id: 2, name: 'Dodger Blue', hex: '#1E90FF', rgb: '30, 144, 255' },
      { id: 3, name: 'Lime Green', hex: '#32CD32', rgb: '50, 205, 50' },
      { id: 4, name: 'Dark Orchid', hex: '#9932CC', rgb: '153, 50, 204' }
    ],
    isLoading: false,
    error: null,
    lastAddedColor: null
  }),
  actions: {
    // Метод для загрузки данных из API
    async fetchColorsFromApi() {
      this.isLoading = true
      this.error = null
      try {
        // Имитация загрузки данных с API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Добавляем тестовый цвет
        const newColor = {
          id: this.colors.length + 1,
          name: 'API Color ' + (this.colors.length + 1),
          hex: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
          rgb: this.hexToRgb('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))
        }
        
        this.colors.push(newColor)
        return newColor
        
      } catch (err) {
        this.error = 'Ошибка загрузки данных: ' + err.message
        console.error('API Error:', err)
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // Метод для отправки формы
    async submitForm(formData) {
      this.isLoading = true
      this.error = null
      try {
        // Валидация HEX-кода
        if (!this.isValidHex(formData.hex)) {
          throw new Error('Неверный формат HEX-кода')
        }

        // Подготовка данных
        const colorData = {
          name: formData.name,
          hex: formData.hex.toUpperCase(),
          rgb: this.hexToRgb(formData.hex),
          userId: 1 // Для JSONPlaceholder
        }

        // 1. Отправка на JSONPlaceholder (тестовый API)
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/posts',
          {
            title: colorData.name,
            body: `HEX: ${colorData.hex}, RGB: ${colorData.rgb}`,
            userId: colorData.userId
          },
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }
        )

        // 2. Добавление в локальное хранилище
        const newColor = {
          id: this.colors.length + 1,
          ...colorData
        }
        this.colors.push(newColor)
        this.lastAddedColor = newColor

        return {
          apiResponse: response.data,
          newColor: newColor
        }

      } catch (error) {
        this.error = 'Ошибка отправки: ' + error.message
        console.error('Submit Error:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Вспомогательные методы
    hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r}, ${g}, ${b}`
    },

    isValidHex(hex) {
      return /^#[0-9A-F]{6}$/i.test(hex)
    }
  },
  getters: {
    // Дополнительные геттеры при необходимости
    getColorById: (state) => (id) => {
      return state.colors.find(color => color.id === id)
    }
  }
})