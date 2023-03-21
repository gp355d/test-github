<template>
    <footer class="footer py-7 py-md-8 text-primary">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light d-lg-flex justify-content-center justify-content-lg-between flex-lg-row d-block flex-column">
          <!-- <div class="d-flex"> -->
            <a href="#" class="d-block text-center mb-7 mb-md-0">
              <img src="../assets/images/logo.svg" alt="logo">
            </a>
            <div class="text-center d-block justify-content-center align-items-center pb-7 pb-md-0" id="navbarNav">
              <ul class="menu d-block d-lg-flex list-unstyled mb-0">
                <li class="nav-item">
                  <router-link class="link d-block fs-6" href="#" to="/products">茶品介紹</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="link d-block fs-6" href="#" to="/knowledge">茶葉知識</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="link d-block fs-6" href="#" to="/about">關於我們</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="link d-block fs-6" href="#" to="/qa">常見問題</router-link>
                </li>
              </ul>
            </div>
            <p class="text-center texet-primary fs-6 m-0 d-lg-block texet-primary">Copyright © 2023 鮮品味 Inc.</p>
          <!-- </div> -->
        </nav>
      </div>
    </footer>
</template>
