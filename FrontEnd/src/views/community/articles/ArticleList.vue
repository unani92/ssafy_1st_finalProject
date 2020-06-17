<template>
  <div class="article-list">
    <h1>All Reviews</h1>
    <ListView :articles="articles" :currentUser="currentUser" />
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/scrollmonitor/1.2.0/scrollMonitor.js"></script>
<script>
import ListView from '@/components/ListView.vue'
import axios from 'axios'

const SERVER_URL = 'https://finprojectapi.herokuapp.com'

export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
    }
  },

  props: {
    currentUser: Object
  },

  components: {
    ListView,
  },

  methods: {
    getArticles() {
      axios.get(SERVER_URL + '/api/v1/community/articles/')
        .then(res => {
          this.articles = res.data
        })
        .catch(err => console.error(err.response.data))
    },
  },

  created() {
    this.getArticles()
  },
}
</script>

<style>
.article-list {
  text-align: center;
}
</style>