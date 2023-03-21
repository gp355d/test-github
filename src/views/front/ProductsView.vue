<template>
  <div class="container py-8">
  <div class="row justify-content-center mb-0">
    <h2 class="text-center text-primary mb-7 fw-bold">茶品介紹</h2>
    <div class="col-lg-3 mb-4 mb-md-0">
      <!-- {{ followList.id }}
      {{ filtercategory}} -->
      <!-- setCategory -->
      <ul class="list-group" >
        <!-- <a href="#" class="btn btn-primary" @click.prevent="() => setCategory('')" :class="{ active: category === '' }">get</a> -->
        <li class="list-unstyled">
          <a
          href="#"
              class="list-group-item list-group-item-action noto-serif-font"
              :class="{ active: category === '' }"
              @click.prevent="setCategory('')"
            >
              全部商品
            </a>
        </li>
        <!-- <button type="button" class="btn btn-primary" @click.prevent="() => getCategory()">getC</button> -->
        <!-- <a href="#" @click.prevent="filtertest(filtercategory[i])">{{filtercategory[i]}}</a> v-for="(item,i) in filtercategory" :key="item.id"-->
        <!-- <li class="list-group-item active" aria-current="true">
          茶包
        </li> -->
        <li class="list-unstyled">
          <template v-for="(item, index) in categories" :key="`${index}-${item}`">
            <a
            href="#"
              class="list-group-item list-group-item-action noto-serif-font"
              :class="{ active: category === item }"
              @click.prevent="setCategory(item)"
            >
              {{ item }}
            </a>
          </template>
        </li>

      </ul>
    </div>
    <div class="col-lg-9 mb-4 mb-md-0">
      <div class="row mb-3">
        <div class="col-md-6 col-lg-4 mb-4 mb-md-3" v-for="product in product" :key="product.id">
          <!-- {{ product.id }} -->
          <div class="card border-0 shadow-sm rounded-3">
            <div class="">
              <!-- <a to ="/Favorite" href="#"  class="btn" @click.prevent="() => addtoFollow(product.id)"> -->
              <!-- </a> -->
              <!-- {{ followList.id.indexOf(product.id)}} -->
              <router-link :to="`/product/${product.id}`" >
                <img :src="product.imageUrl" height="250" class="card-img-top object-fit mb-0" alt="product-img">
              </router-link>
              <div class="card-body fw-bold text-primary p-5">
                <span class="badge rounded-pill bg-primary">{{ product.category }}</span>
                <h5 class="card-title fs-4 lh-29 fw-bold noto-serif-font">{{ product.title }}</h5>
                <!-- <span class="d-inline-block text-truncate" style="max-height: 50px;max-width: 200px;">{{ product.description }}</span> -->
                <div class="fs-5 lh-30 fw-bold mb-5 position-relative">
                  <!-- <span class="card-text">NT</span> -->
                  <a href="#"  @click.prevent="() => addtoFollow(product.id)" >
                    <span class="position-absolute end-0 material-icons fs-1" style="cursor: pointer;" v-if="followList.id.indexOf(product.id) === -1">
                    <!-- 未加入 true -->
                    favorite_border
                    </span>
                    <span class="position-absolute end-0 material-icons fs-1 text-primary" style="cursor: pointer;" v-else>
                      <!-- 已加入 false-->
                      favorite
                    </span>
                  </a>
                  <span>{{ $filters.currency(product.price) }}</span>
                </div>
                <div class="d-grid">
                  <button :disabled="loadingItem === product.id+'1'" type="button" class="btn btn-outline-primary fw-normal" @click="() => addToCart(product.id, 1)" >
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
</div>

<!-- <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">名稱</th>
      <th scope="col">圖片</th>
      <th scope="col">連結</th>
      <th scope="col">功能</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in product" :key="product.id">
      <th scope="row">1</th>
      <td>{{ product.title }}</td>
      <td><img :src="`${product.imageUrl}`" alt="" width="200"></td>
      <td>
        <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">連結</router-link>
      </td>
      <td>
        <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id)" :disabled="loadingItem === product.id+'1'">
          加入購物車
          <i class="fas fa-spinner fa-pulse" v-if="loadingItem === product.id+'1'"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table> -->
<!-- {{ pagination }} -->
<Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '../../stores/productStore'
import cartStore from '../../stores/cart'
import Pagination from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      product: [],
      // loadingItem: '',
      pagination: {}
      // category: '
    }
  },
  methods: {
    ...mapActions(productStore, ['getProductAll', 'getid']),
    ...mapActions(cartStore, ['addToCart']),

    getProducts (page = 1) {
      const loader = this.$loading.show()
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products/?page=${page}&category=${this.category}`
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.products
          this.pagination = res.data.pagination
          loader.hide()
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    // filtertest (str, page = 1) {
    //   // console.log(this.$route.params)
    //   this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products/?page=${page}&category=${str}`).then((res) => {
    //     console.log(res)
    //     this.product = res.data.products
    //     this.pagination = res.data.pagination
    //     if (str) {
    //       this.filtercategory = str
    //     }
    //     // loader.hide()
    //   })
    //   console.log(this.$route.query)
    // },
    // addToCart (id) {
    //   this.loadingItem = id + '1'
    //   const data = {
    //     product_id: id,
    //     qty: 1
    //   }
    //   this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data }).then((res) => {
    //     this.loadingItem = ''
    //     alert('已將商品加入購物車！')
    //   }).catch((err) => {
    //     alert(err.response.data.message)
    //   })
    // },
    ...mapActions(productStore, ['addtoFollow', 'setCategory', 'getProductAll'])

  },
  watch: {
    category () {
      this.getProducts()
    }
  },
  computed: {
    ...mapState(productStore, ['followList', 'productsAll', 'category', 'categories']),
    ...mapState(cartStore, ['loadingItem'])
  },
  // computed: {
  //   filtercategories () {
  //     if (this.filtercategory) {
  //       return this.product.filter((item) => {
  //         const data = item.category.toLowerCase().includes(this.category.toLowerCase())
  //         return data
  //       })
  //     }
  //     return this.product
  //   }
  // },
  components: {
    Pagination
  },
  mounted () {
    // eslint-disable-next-line no-debugger
    // debugger
    this.getProducts()
    this.getProductAll()
    this.getid()
  }
}
</script>
