<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
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
</template>

<style>
html, body {
  overflow-x: hidden;
  width: 100%;
  position: relative;
}

/* ბაზისური სტილები */
.logo-img {
  height: 45px;
  width: auto;
  object-fit: contain;
  transition: 0.3s;
}

/* მობილურის აიქონების სტილი */
.mobile-icon-link {
  font-size: 1.5rem;
  color: #0d6efd; /* Bootstrap Primary ფერი */
  display: flex;
  align-items: center;
}

/* მობილურის აიქონების დამალვა Desktop-ზე */
.mobile-only {
  display: none;
}

/* მობილურის ვერსია */
@media (max-width: 991px) {
  .mobile-only {
    display: block;
    width: 40px; /* აიქონებისთვის ფიქსირებული სიგანე, რომ ლოგო ზუსტად ცენტრში დარჩეს */
    text-align: center;
  }

  .navbar-brand {
    margin: 0 auto !important; /* ლოგოს გაცენტრება */
  }

  .logo-img {
    height: 40px;
  }
}

/* App-ის საერთო გასუფთავება */
#app {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>