<template>
  <div class="article-update">
    <div class="article-update-header">
      <h3>Update Article</h3>
    </div>

    <div class="article-update-block">
      <label for="title" class="article-update-label">Title</label>
      <input 
        v-model="update.title" 
        type="text" 
        class="article-update-input" 
        id="title" >
    </div>
    <div class="article-update-block">
      <label for="rank" class="article-update-label">Rank</label>
      <select v-model="update.rank" class="article-update-input" id="rank">
        <option v-for="num in rankNumber" :key="num">{{num}}</option>
      </select>
    </div>
    <div class="article-update-block">
      <label for="content" class="article-update-label">Content</label>
      <textarea v-model="update.content" class="article-update-text" id="content" ></textarea>
    </div>
    <div class="article-update-block">
      <button @click="updateArticle" class="article-update-button">Submit</button>
    </div>      
  </div>
</template>

<script>
import axios from 'axios'
const baseURL = "https://finprojectapi.herokuapp.com/api/v1/community/articles/"
export default {
  name: "ArticleUpdate",
  data() {
    return {
      rankNumber: [1,2,3,4,5,6,7,8,9,10],
      update: {
          title: this.article.title,
          content: this.article.content,
          rank: this.article.rank,
      }
    }
  },
  props: {
    article: Object,
  },
  methods: {
    updateArticle() {
      const config = {
          headers: { Authorization: `Token ${this.$cookies.get('auth-token')}` }
      }
      axios.put(baseURL+`${this.$route.params.id}/`, this.update, config)
        .then(res => {
          axios.get(baseURL+res.data.id)
            .then(res => {
              this.$router.push({name:"ArticleDetail", params: {id:res.data.id, article:res.data}})
          })
      })
      .catch(() => alert('error'))
    }
  }
}
</script>

<style scoped>
.article-update {
  text-align: center;
}

.article-update-block {
  margin-top: 15px;
  text-align: center;
}

.article-update-label {
  margin-left: 15%;
  display: block;
  text-align: start;
}

.article-update-input,
.article-update-text {
  margin-top: 5px;
  padding: 10px 5%;
  width: 80%;
  border: 0.5px solid gainsboro;
  border-radius: 10px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 1px 1px 1px gainsboro;
}

.article-update-text {
  height: 200px;
}

.article-update-button {
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 20px;
}

@media screen and (min-width: 576px) { 
  .article-update-block {
    margin-top: 30px;
  }
  
  .article-update-label {
    margin-left: 10%;
  }

  .article-update-input,
  .article-update-text {
    margin-top: 15px;
    width: 90%;
  }

  .article-update-text {
    height: 400px;
  }

  .article-update-button {
    margin-top: 15px;
    font-size: 24px;
  }
} 
</style>