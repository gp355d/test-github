<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="row py-3">
      <div class="table-responsive">
        <table class="table mt-4">
          <thead>
            <tr>
              <th>購買時間</th>
              <th class="text-nowrap">Email</th>
              <th class="text-nowrap">購買款項</th>
              <th class="text-nowrap">應付金額</th>
              <th class="text-nowrap">是否付款</th>
              <th class="text-nowrap">操作行為</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item,i) in orders" :key="i">
              <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
                <td>{{ $filters.date(item.create_at) }}</td>
                <td class="text-nowrap"><span v-if="item.user" v-text="item.user.email"></span></td>
                <td class="text-nowrap">
                  <ul class="list-unstyled" v-for="(product, i) in item.products" :key="i">
                    <li>
                      {{ product.product?.title }} 數量：{{ product.qty }}
                      {{ product.product?.unit }}
                    </li>
                  </ul>
                </td>
                <td class="text-right text-nowrap">{{ $filters.currency(item.total) }}</td>
                <td class="text-nowrap">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`" v-model="item.is_paid" @change="() => updatePaid(item)"/>
                    <label class="form-check-label" :for="`paidSwitch${item.id}`">
                      <span v-if="item.is_paid">已付款</span>
                      <span v-else>未付款</span>
                    </label>
                  </div>
                </td>
                <td class="text-nowrap">
                  <div class="btn-group">
                    <button class="btn btn-outline-primary btn-sm" type="button" @click="() => openModal('look',item)">
                      檢視
                    </button>
                    <button class="btn btn-outline-danger btn-sm" type="button" @click="() => openModal('delete', item)">
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <OrderModal ref="orderModal" :order="tempOrder" @change-status="updatePaid"></OrderModal>
        <DelModal ref="orderdelModal" :temp-items="tempOrder" @delete-data="deleteOrder" :id=2></DelModal>
        <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import OrderModal from '../../components/OrdersModal.vue'
import DelModal from '../../components/DelModal.vue'
import Pagination from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      tempOrder: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const loader = this.$loading.show()
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/orders/?page=${page}`).then((res) => {
        this.orders = res.data.orders
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
      if (status === 'look') {
        this.tempOrder = { ...item }
        this.isNew = false
        const orderComponent = this.$refs.orderModal
        orderComponent.openModal()
      } else if (status === 'delete') {
        this.tempOrder = { ...item }
        const orderdelComponent = this.$refs.orderdelModal
        orderdelComponent.openModal()
      }
    },
    updatePaid (item) {
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/order/${item.id}`
      const data = {
        is_paid: item.is_paid
      }
      this.$http.put(url, { data }).then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        const orderComponent = this.$refs.orderModal
        orderComponent.hideModal()
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
    deleteOrder () {
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/order1/${this.tempOrder.id}`
      this.$http.delete(url)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          const orderdelComponent = this.$refs.orderdelModal
          orderdelComponent.hide()
          this.getOrders()
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
    OrderModal,
    DelModal,
    Pagination
  },
  mounted () {
    this.getOrders()
    document.title = this.$route.meta.title
  }
}
</script>
