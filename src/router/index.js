import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Catalog from '@/views/Catalog.vue'
import Contacts from '@/views/Contacts.vue'
import FormPage from '@/views/FormPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/catalog', component: Catalog },
    { path: '/contacts', component: Contacts },
    { path: '/form', component: FormPage }
  ]
})

export default router