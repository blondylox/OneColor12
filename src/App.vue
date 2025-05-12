<template>
  <div class="app">
    <header class="header">
      <nav class="navigation">
        <router-link to="/">Главная</router-link>
        <span class="divider">|</span>
        <router-link to="/catalog">Каталог</router-link>
        <span class="divider">|</span>
        <router-link to="/contacts">Контакты</router-link>
        <span class="divider">|</span>
        <router-link to="/form">Форма</router-link>
      </nav>
    </header>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navigation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation a {
  margin: 0 15px;
  color: #333333;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 5px 0;
}

.divider {
  color: #e0e0e0;
  user-select: none;
}

.navigation a:hover {
  color: #000000;
}

.navigation a.router-link-exact-active {
  color: #000000;
  border-bottom: 2px solid #000000;
  font-weight: 600;
}

.content {
  margin-top: 80px;
  padding: 20px;
  flex: 1;
}
</style>