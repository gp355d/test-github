<template>
  <section class="container py-8">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-md-9">
        <div class="row mb-4">
          <h2 class="text-center text-primary fw-bold mb-7">鮮品味茶品</h2>
          <div class="col-md-7">
            <swiper
                  :style="{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }"
                  :spaceBetween="10"
                  :navigation="true"
                  :thumbs="{ swiper: thumbsSwiper }"
                  :modules="modules"
                  class="mySwiper2"
                >
                  <swiper-slide
                    v-for="(image, i) in product.imagesUrl"
                    :key="i"
                  >
                    <img :src="image" />
                  </swiper-slide>
            </swiper>
              <swiper
                  @swiper="setThumbsSwiper"
                  :spaceBetween="10"
                  :slidesPerView="4"
                  :freeMode="true"
                  :watchSlidesProgress="true"
                  :modules="modules"
                  class="mySwiper align-items-center"
                >
                  <swiper-slide
                    v-for="(image, i) in product.imagesUrl"
                    :key="i"
                  >
                    <img :src="image" />
                  </swiper-slide>
              </swiper>
              {{ product.success }}
          </div>
          <div class="col-md-5">
            <div class="d-flex flex-column justify-content-center h-100">
              <div>
                <div class="d-flex align-items-center">
                  <h3 class="h3 text-nowrap me-2 fw-bold">{{ product.title }}</h3>
                  <a
                    href="#"
                    class="d-flex mb-md-0 align-items-center text-decoration-none"  @click.prevent="() => addtoFollow(product.id)" style="cursor: pointer;"
                  >
                  <span class="material-icons fs-1" v-if="followList.id.indexOf(product.id) === -1">
                  <!-- 未加入 true -->
                  favorite_border
                  </span>
                  <span class="material-icons fs-1 text-primary" style="cursor: pointer;" v-else>
                    <!-- 已加入 false-->
                    favorite
                  </span>
                  </a>
                </div>
                <span class="badge rounded-pill bg-primary">{{
                  product.category
                }}</span>
                <p v-html="product.description"></p>
                <div class="d-flex flex-column h-100">
                  <div class="align-self-end">
                    <div class="text-decoration-line-through fs-4">
                      <span>原價</span>
                      <!-- {{typeof $filters.currency(product.origin_price) }} -->
                      <span>{{ (product.origin_price) }}</span>
                    </div>
                    <div class="fs-2 mb-2 fw-bold text-danger">
                      <span class="">特價</span>
                      <span>{{(product.price) }}</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <select class="form-select" name="qty" v-model.number="itemNum">
                      <option :value="num" v-for="num in 5" :key="num + '0'">
                        {{ num }}
                      </option>
                    </select>
                    <button
                      type="button"
                      class="btn btn-primary me-3 me-md-0 text-nowrap"
                      @click="() => addToCart(product.id, itemNum)"
                    >
                      加入購物車
                      <i class="fas fa-spinner fa-pulse" v-if="loadingItem === product.id+'1'"></i>
                    </button>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-md-9">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              商品介紹
            </button>
          </li>
          <!-- <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              商品規格
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              商品特色
            </button>
          </li> -->
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active p-5"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab" v-html="product.content"
          >
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            ...
          </div>
          <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
          >
            ...
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      {{tempProducts}}
      <h2 class="text-center text-primary mb-7 fw-bold">相關商品</h2>
      <div class="col-md-9">
        <swiper class="Swiper3"
      :navigation="true"
    :slidesPerView="3"
    :spaceBetween="24"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      768: {
      slidesPerView: 3,
      spaceBetween: 24
    },
      992: {
        slidesPerView: 3,
        spaceBetween: 24,
      }
    }"
    :modules="modules">
    <swiper-slide v-for="item in tempProducts" :key="item.id">
      {{ item.id }}
              <div class="card d-flex h-100 shadow-sm">
                <div class="bg-cover"
                  style="min-height: 200px;cursor: pointer;background-position: center;"
                    @click.prevent="() =>test(item.id)" :style="{backgroundImage:`url(${item.imageUrl})`} ">
                    <!-- <img class="object-fit mb-3 mb-lg-2 w-100" :src="item.imageUrl" alt="" height="300"> -->
                </div>
                <div class="card-body p-0">
                  <h5 class="card-title fs-4 lh-29 fw-bold">{{item.title}}</h5>
                  <div class="fs-5 lh-30 fw-bold mb-5">
                    <!-- <span class="card-text">NT$</span> -->
                    <span>{{$filters.currency(item.price)}}</span>
                  </div>
                </div>
              </div>
    </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script>

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import { Navigation, Thumbs, Pagination } from 'swiper'
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart' // 匯入store狀態
import productStore from '../../stores/productStore'
// import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      // images: [
      //   'https://swiperjs.com/demos/images/nature-1.jpg',
      //   'https://swiperjs.com/demos/images/nature-2.jpg',
      //   'https://swiperjs.com/demos/images/nature-3.jpg',
      //   'https://swiperjs.com/demos/images/nature-4.jpg',
      //   'https://swiperjs.com/demos/images/nature-5.jpg',
      //   'https://swiperjs.com/demos/images/nature-6.jpg',
      //   'https://swiperjs.com/demos/images/nature-7.jpg',
      //   'https://swiperjs.com/demos/images/nature-8.jpg',
      //   'https://swiperjs.com/demos/images/nature-9.jpg',
      //   'https://swiperjs.com/demos/images/nature-10.jpg'
      // ],
      product: [],
      products: [],
      tempProducts: [],
      thumbsSwiper: null,
      modules: [Navigation, Thumbs, Pagination],
      itemNum: 1,
      id: '',
      fillter: [],
      productsAll: []
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getProductSingle () {
      const { id } = this.$route.params
      const loader = this.$loading.show()
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          const { product } = res.data
          this.product = product
          this.products = this.product
          console.log(this.product)
          console.log(this.products)

          loader.hide()
          // this.getCategory()
        })
        .catch((err) => {
          alert(err)
        })
    },

    // getProducts (page = 1) {
    //   const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products/?page=${page}&category=${this.category}`
    //   this.$http.get(url)
    //     .then((res) => {
    //       this.product = res.data.products
    //       this.pagination = res.data.pagination
    //       console.log(this.product)
    //     }).catch((err) => {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: err.response.data.message,
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     })
    // },
    getCategory () {
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          // this.tempProductsall(this.productsAll)
          // this.createCategories()
          // loader.hide()
          console.log(this.productsAll)
        })
        .catch((err) => {
          console.log(err)
          alert(err.response)
        })
        // const { category, id } = this.productsAll
      // this.fillter = this.tempProducts.filter((item) => { // 過濾
      //   console.log(item.id, item.category, id, category)
      //   return item.id !== id && item.category === category
      // })
      //   const getC = this.filtercategory.map((item) => { // 取出category類別
      //     return item.category
      //   console.log(getC)
      //   const result = getC.filter(function (element, index, arr) { // 過濾重複類別
      //     return arr.indexOf(element) === index
      //   })
      //   console.log(result)
      //   this.filtercategory = result
      // })
    },

    setThumbsSwiper (swiper) {
      this.thumbsSwiper = swiper
    },
    ...mapActions(cartStore, ['addToCart']), // 取用cart store內的狀態資料(方法)
    ...mapActions(productStore, ['tempProductsa11', 'getProductAll', 'addtoFollow', 'getid']),
    test (id) {
      // alert('ff')
      this.$router.push(`/product/${id}`)
      // console.log(id)
      this.id = id
      this.getProductSingle()
    }
    // related () {
    //   const { category, id } = this.productsAll
    //   console.log(category, id)
    //   this.tempProducts = this.products.filter((item) => {
    //     return id !== item.id && item.category === category
    //   })
    // this.x = this.productsAll
    // return this.productsAll.filter((item) =>
    //   id !== item.id && category === item.category
    // // console.log(item.id !== this.productsAll.id && item.category === this.productsAll.category)
    // )
    // }
  },
  computed: {
    ...mapState(productStore, ['followList']),
    ...mapState(cartStore, ['loadingItem'])
  },

  // watch: {
  // },
  mounted () {
    // this.test()
    this.getProductSingle()
    this.getProductAll()
    // this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
// #app {
//   height: 100%;
// }
html,
body {
  // position: relative;
  height: 100%;
}

.mySwiper2 .swiper-slide img,
.mySwiper .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 商品大圖切換外框 */
.mySwiper2 {
  width: 100%;
  height: 400px;
}

.mySwiper2 .swiper-slide {
  background-size: cover;
  background-position: center;
}

/* 商品小圖切換外框 */
// .mySwiper {
//   width: 100%;
//   height: 150px;
//   box-sizing: border-box;
//   padding: 10px 0;
// }
.mySwiper {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.mySwiper .swiper-slide {
  background-size: cover;
  background-position: center;
  height: auto;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
// .Swiper3 .swiper-slide{
//   width: 33.33% !important;
//   height: auto;
// }

.Swiper3 .swiper-pagination {
  position: absolute; /* pagination元件設定為絕對定位 */
  left: 20px; /* 調整左右位置 */
  bottom: 20px; /* 調整上下位置 */
}
</style>
