<template>
  <div class="article-create">
    <div class="article-create-header">
      <h3>Create Article</h3>
    </div>

    <div class="article-create-block">
      <label for="title" class="article-create-label">Title</label>
      <input 
        v-model="article.title" 
        type="text" 
        class="article-create-input" 
        id="title" >
    </div>
    <div class="article-create-block">
      <label for="rank" class="article-create-label">Rank</label>
      <select v-model="article.rank" class="article-create-input" id="rank">
        <option v-for="num in rankNumber" :key="num">{{num}}</option>
      </select>
    </div>
    <div class="article-create-block">
      <label for="content" class="article-create-label">Content</label>
      <textarea v-model="article.content" class="article-create-text" id="content" ></textarea>
    </div>
    <div class="article-create-block">
      <button @click="submitArticle" class="article-create-button">Submit</button>
    </div>      
  </div>
</template>

<script>
import axios from 'axios'
const baseURL = "https://finprojectapi.herokuapp.com/api/v1/community/articles/"
  export default {
    name: "ArticleCreate",
    data() {
      return {
      rankNumber: [1,2,3,4,5,6,7,8,9,10],
      article: {
        title: null,
        content: null,
        rank: null
      }
    }
  },
  props: {
    currentUser: Object
  },
  methods: {
    submitArticle() {
      const config = {
        headers: {
            Authorization: `Token ${this.$cookies.get('auth-token')}`
          }
        }
      axios.post(baseURL+`${this.$route.params.id}/`,this.article,config)
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

<style>
.article-create {
  text-align: center;
}

.article-create-block {
  margin-top: 15px;
  text-align: center;
}

.article-create-label {
  margin-left: 15%;
  display: block;
  text-align: start;
}

.article-create-input,
.article-create-text {
  margin-top: 5px;
  padding: 10px 5%;
  width: 80%;
  border: 0.5px solid gainsboro;
  border-radius: 10px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 1px 1px 1px gainsboro;
}

.article-create-text {
  height: 200px;
}

.article-create-button {
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 20px;
}

@media screen and (min-width: 576px) { 
  .article-create-block {
    margin-top: 30px;
  }
  
  .article-create-label {
    margin-left: 10%;
  }

  .article-create-input,
  .article-create-text {
    margin-top: 15px;
    width: 90%;
  }

  .article-create-text {
    height: 400px;
  }

  .article-create-button {
    margin-top: 15px;
    font-size: 24px;
  }
} 
</style>