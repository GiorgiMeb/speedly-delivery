<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isAppReady = ref(false)

onMounted(() => {
  // 3 წამიანი დაყოვნება
  setTimeout(() => {
    isAppReady.value = true
  }, 2000)
})
</script>

<template>
  <div v-if="!isAppReady" class="initial-loader">
    <div class="spinner"></div>
    <div class="loader-text">Speedly იტვირთება...</div>
  </div>

  <div v-else>
    <nav class="navbar navbar-light bg-white shadow-sm sticky-top">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="mobile-only">
          <a href="tel:+995555123456" class="mobile-icon-link">
            <i class="bi bi-telephone-fill"></i>
          </a>
        </div>

        <router-link class="navbar-brand d-flex align-items-center fw-bold text-primary m-0" to="/">
          <img src="./assets/logo.png" alt="Logo" class="logo-img">
        </router-link>

        <div class="d-none d-lg-flex align-items-center">
          <ul class="navbar-nav flex-row align-items-center">
            <li class="nav-item me-3">
              <a class="nav-link d-flex align-items-center" href="mailto:info@geodelivery.ge">
                <i class="bi bi-envelope-at text-primary me-2"></i>
                დაგვიკავშირდი
              </a>
            </li>
            <li class="nav-item">
              <a class="btn btn-primary rounded-pill px-4 d-flex align-items-center shadow-sm" href="tel:+995555123456">
                <i class="bi bi-telephone-fill me-2"></i>
                555 12 34 56
              </a>
            </li>
          </ul>
        </div>

        <div class="mobile-only">
          <a href="mailto:info@geodelivery.ge" class="mobile-icon-link">
            <i class="bi bi-envelope-at-fill"></i>
          </a>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style>
/* ლოადერის სტილები App.vue-სთვის */
.initial-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0d6efd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}
.loader-text {
  color: #0d6efd;
  font-weight: bold;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* შენი არსებული სტილები */
html, body { overflow-x: hidden; width: 100%; position: relative; }
.logo-img { height: 45px; width: auto; object-fit: contain; transition: 0.3s; }
.mobile-icon-link { font-size: 1.5rem; color: #0d6efd; display: flex; align-items: center; }
.mobile-only { display: none; }
@media (max-width: 991px) {
  .mobile-only { display: block; width: 40px; text-align: center; }
  .navbar-brand { margin: 0 auto !important; }
  .logo-img { height: 40px; }
}
#app { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
</style>