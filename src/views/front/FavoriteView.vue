<template>
<div class="container py-8">
  <loading v-model:active="isLoading"></loading>
  <a href="./products.html">繼續購物</a>
  {{ }}
  <div class="row align-items-center flex-column flex-md-row d-flex justify-content-center">
    <h2 class="text-center text-primary mb-7 fw-bold">你的收藏茶品</h2>
    <template v-if="followList.list.length > 0">
      <div class="col-md-6 col-lg-4">
        <div class="row me-3">
          <div class="d-flex align-items-center shadow-sm mb-2 mb-md-3 p-2 text-center" v-for="list in followList.list" :key="list.id">
            <span class="col-1"><a href="#"><span class="material-icons fs-2" @click.prevent="() => addtoFollow(list.id)">delete</span></a></span>
            <img class="col-4 img-fluid object-fit px-2" :src="list.imageUrl" :key="list.id" alt="img-fluid" height="130">
            <div class="col-7 d-flex flex-column">
              <p class="fs-6 fs-md-4 mb-0">{{list.title}}</p>
              <span class="col-12 fs-6 fs-md-4 d-block">{{ $filters.currency(list.price) }}</span>
              <button type="button" class="btn btn-primary" @click.prevent="() => addToCart(list.id)">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="text-center h4">目前收藏為空，再去收藏吧</p>
    </template>
  </div>
</div>
</template>
<script>
// const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
import { mapState, mapActions } from 'pinia'
import productStore from '../../stores/productStore'
import status from '../../stores/statusStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
export default {
  computed: {
    ...mapState(productStore, ['tempProducts', 'followList']),
    ...mapState(status, ['isLoading'])
  },
  methods: {
    ...mapActions(productStore, ['getProductAll', 'addToCart', 'addtoFollow', 'tempProductsall']),
    getFollow () {
      this.getProductAll()
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.getFollow()
  }
}
</script>
