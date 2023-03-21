<template>
<div class="container py-8">
  <h2 class="text-center text-primary mb-7 fw-bold">{{article.title}}</h2>
  <!-- <h4>{{$filters.date(article.create_at)}}</h4> -->
  <loading v-model:active="isLoading"></loading>
  {{ create_at[0] }}
  <p>{{ article.description }}</p>
  <span class="badge bg-primary mb-2 me-2" v-for="tag in article.tag" :key="tag.id">{{tag}}</span>
  <div class="row d-flex justify-content-center">
    <router-link href="#" to="/products">繼續購物</router-link>
      <div class="col-md-9">
        <div class="row">
          <div class="col-12 d-flex justify-content-center mb-5">
            <img class="img-fluid object-fit" :src="article.imgurl" alt="">
          </div>
          <div class="col-12 d-flex justify-content-center mb-5">
            <img class="img-fluid object-fit" :src="article.imgurl" alt="">
          </div>
          <div class="col-12 d-flex flex-column justify-content-center align-items-start">
           <div v-html="article.content"></div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'pinia'
import statusStore from '../../stores/statusStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      article: {},
      create_at: 0
    }
  },
  methods: {
    getArticle () {
      const { id } = this.$route.params
      const loader = this.$loading.show()
      this.$http
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/article/${id}`)
        .then((res) => {
          console.log(res)
          this.article = res.data.article
          this.article.content = res.data.article.content.replace(/\n/g, '<br>')
          console.log(this.article.content)
          // console.log(res.data.article.create_at)
          this.create_at = new Date(this.article.create_at * 1000)
            .toISOString()
            .split('T')
          loader.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  },
  mounted () {
    this.getArticle()
  }
}
</script>
