<template>
  這是前台頁面
  <div>
    <router-link to="/">logo位置</router-link> |
    <router-link to="/about">關於我們</router-link> |
    <router-link to="/products">商品介紹</router-link> |
    <router-link to="/cart">購物車</router-link>
  </div>
  <router-view></router-view>
</template>
