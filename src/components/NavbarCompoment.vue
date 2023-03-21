<template>
      <nav class="navbar navbar-expand-lg navbar-light bg-transprent position-absolute  start-50 translate-middle-x w-100">
  <div class="container">
      <router-link to="/home">
        <img src="../assets/images/logo.svg" alt="logo" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="menu d-flex align-items-center list-unstyled mb-0">
          <li class="nav-item pe-7">
            <router-link to="/products" class="link d-block fs-6">茶品介紹</router-link>
          </li>
          <li class="nav-item pe-7">
            <router-link to="/knowledge" class="link d-block fs-6">茶葉知識</router-link>
          </li>
          <li class="nav-item pe-7">
            <router-link to="/about" class="link d-block fs-6">關於我們</router-link>
          </li>
          <li class="nav-item pe-7">
            <router-link to="/QA" class="link d-block fs-6">常見問題</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="position-relative end-0">
              <span class="material-icons fs-4"> shopping_cart </span>
              <span
                class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">{{num}}</span>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
      </nav>
      <div class="position-absolute translate-middle-x top-0 offcanvas offcanvans-start d-md-none" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header p-0 mb-12">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
          <a class="" href="#">
            <img src="../assets/images/logo.svg" alt="logo">
          </a>
        </h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-0">
        <div>
          <ul class="menu d-flex flex-column list-unstyled mb-0 offcanvas-nav text-center">
            <li class="nav-item">
              <router-link to="/products" class="link d-block fs-6 mb-7" href="#">茶品介紹</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/knowledge" class="link d-block fs-6 mb-7" href="#">茶葉知識</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="link d-block fs-6 mb-7" href="#">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/QA" class="link d-block fs-6 mb-7" href="#">常見問題</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="link d-block fs-6" href="#">購物車</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: ['num'],
  data () {
    return {
      cartNUm: 0
    }
  }
}
</script>
