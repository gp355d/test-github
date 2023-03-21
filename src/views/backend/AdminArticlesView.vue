<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="py-3">
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="() => openModal(true)">
          建立新的文章
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mt-4">
          <thead>
            <tr>
              <th class="text-nowrap">標題</th>
              <th>作者</th>
              <th>描述</th>
              <th>建立時間</th>
              <th class="text-nowrap">是否公開</th>
              <th class="text-nowrap">操作行為</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id">
              <td class="text-nowrap">{{ article.title }}</td>
              <td class="text-nowrap">{{ article.author }}</td>
              <td><span class="text-truncate d-inline-block" style="width:100px">{{ article.description }}</span></td>
              <td class="text-nowrap">{{ $filters.date(article.create_at) }}</td>
              <td>
                <span v-if="article.isPublic">已上架</span>
                <span v-else>未上架</span>
              </td>
              <td class="text-nowrap">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    type="button"
                    @click="() => getArticle(article.id)"
                  >
                    編輯
                  </button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click="() => openDelArticleModal(article)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ArticlesModal ref="articleModal" :article="tempArticle" :is-new="isNew" @update-article="updateArticle"></ArticlesModal>
      <DelModal ref="articledelModal" :temp-items="tempArticle" @delete-data="delArticle" :id=4></DelModal>
      <Pagination :pages="pagination" @emitPages="getArticles"></Pagination>
    </div>
  </main>
</template>

<script>
import ArticlesModal from '../../components/ArticlesModal.vue'
import DelModal from '../../components/DelModal.vue'
import Pagination from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      articles: [],
      tempArticle: {},
      isNew: false,
      pagination: {}
    }
  },
  methods: {
    getArticles (page = 1) {
      const loader = this.$loading.show()
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/articles/?page=${page}`).then((res) => {
        this.articles = res.data.articles
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
    getArticle (id) {
      const loader = this.$loading.show()
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/article/${id}`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.openModal(false, res.data.article)
          this.isNew = false
          loader.hide()
        }
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
    openModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: []
        }
        this.isNew = true
      } else {
        this.tempArticle = { ...item }
        this.isNew = false
      }

      this.$refs.articleModal.openModal()
    },
    updateArticle (item) {
      this.tempArticle = item
      let url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      if (!this.isNew) {
        url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/article/${this.tempArticle.id}`
        httpMethod = 'put'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](url, { data: this.tempArticle }).then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        articleComponent.hideModal()
        this.getArticles()
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
    openDelArticleModal (item) {
      this.tempArticle = { ...item }
      const articledelComponent = this.$refs.articledelModal
      articledelComponent.openModal()
    },
    delArticle () {
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/article/${this.tempArticle.id}`
      this.$http.delete(url).then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        const articledelComponent = this.$refs.articledelModal
        articledelComponent.hideModal()
        this.getArticles()
      }).catch((err) => {
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
    ArticlesModal,
    DelModal,
    Pagination
  },
  mounted () {
    this.getArticles()
    document.title = this.$route.meta.title
  }
}
</script>
