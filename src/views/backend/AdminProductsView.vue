<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="row py-3">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="() => openModal('new')">
        建立新的產品
      </button>
    </div>
    <div class="table-responsive">
      <table class="table mt-4">
        <thead>
          <tr>
            <th class="text-nowrap">分類</th>
            <th class="text-nowrap">產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th class="text-nowrap">是否啟用</th>
            <th class="text-nowrap">操作行為</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="text-nowrap">{{ item.category }}</td>
            <td class="text-nowrap">{{ item.title }}</td>
            <td class="text-right">
              {{ $filters.currency(item.origin_price) }}
            </td>
            <td class="text-right">
              {{ $filters.currency(item.price) }}
            </td>
            <td class="text-nowrap">
              <span v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-nowrap">
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" type="button" @click="() =>openModal('edit',item)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" type="button" @click="() =>openModal('delete',item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ProductsModal ref="productModal" :temp-products="tempProducts" :is-new="isNew" @update-data="updateProduct"></ProductsModal>
    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
    <DelModal ref="productdelModal" :temp-items="tempProducts" @delete-data="deleteProduct" :id=1></DelModal>
  </div>
  </main>
</template>

<script>
import ProductsModal from '../../components/ProductsModal.vue'
import Pagination from '../../components/PaginationView.vue'
import DelModal from '../../components/DelModal.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProducts: {
        imagesUrl: []// 用來儲存多張圖片的陣列
      },
      isNew: false, // 用來判斷modal顯示標題，isNew參數用來判斷資料是否為新的或舊的狀態
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      const loader = this.$loading.show()
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/products/?page=${page}`).then((res) => {
        this.products = res.data.products
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
        loader.hide()
      })
    },
    openModal (status, item) {
      const loader = this.$loading.show()
      if (status === 'new') {
        this.tempProducts = { imagesUrl: [] }
        this.isNew = true
        const productModal = this.$refs.productModal
        loader.hide()
        productModal.openModal()
      } else if (status === 'edit') {
        this.tempProducts = { ...item }
        this.isNew = false
        const productModal = this.$refs.productModal
        loader.hide()
        productModal.openModal()
      } else if (status === 'delete') {
        this.tempProducts = { ...item }
        const productdelComponent = this.$refs.productdelModal
        loader.hide()
        productdelComponent.openModal()
      }
    },
    updateProduct () {
      let url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product`
      let methods = 'post'
      if (!this.isNew) {
        url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product/${this.tempProducts.id}`
        methods = 'put'
      }

      const datas = {
        data: this.tempProducts
      }
      this.$http[methods](url, datas)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          const productComponent = this.$refs.productModal
          productComponent.hideModal()// modal關閉
          this.getProducts()// 更新資料後再重新讀取資料
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    deleteProduct () {
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/product/${this.tempProducts.id}`
      this.$http.delete(url)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          const productdelComponent = this.$refs.productdelModal
          productdelComponent.hide()
          this.getProducts()
        })
        .catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  },
  components: {
    ProductsModal,
    Pagination,
    DelModal
  },
  mounted () {
    this.getProducts()
    document.title = this.$route.meta.title
  }
}
</script>
