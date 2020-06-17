<template>
  <div class="article-detail container">
    <div class="article-detail-header">
      <div>
        <span class="article-detail-movie-title"># {{ article.movie.title }}</span>
      </div>
      <p>title</p>
      <div class="article-detail-title">
        {{ article.title }}
      </div>
    </div>
    <div class="article-detail-body">
      <p>Content</p>
      <div class="article-detail-content">
        {{ article.content }}
      </div>
      <div class="article-detail-footer">
        <div v-if="articleLiked" class="article-detail-like">
          <i @click="toggleLike" style="color: crimson" class="fas fa-heart article-detail-like-button"></i> {{ likeUser.length }}
        </div>
        <div v-else class="article-detail-like">
          <i @click="toggleLike" class="fas fa-heart article-detail-like-button"></i> {{ likeUser.length }}
        </div>
        <div v-if="currentUser !== null">
          <div v-if="currentUser.id === article.user.id" class="article-detail-buttons">
            <div @click="updateArticle" class="article-detail-button">Edit</div>
            <div @click="deleteArticle" class="delete article-detail-button">Delete</div>
          </div>
        </div>
      </div>
      <p class="article-detail-comment-label">Comments</p>
      <div class="article-detail-comments-inputs">
        <input v-model="comment.content" class="article-detail-comments-input">
        <button @click="createComment" class="article-detail-comments-button">Submit</button>
      </div>
      <div v-if="comments.length" class="article-detail-comments">
        <div v-for="comment in comments" :key="comment.id" class="article-detail-comment">
          <div v-if="currentUser !== null">
            <i class="far fa-comment-dots"></i> {{ comment.user.username }}: {{ comment.content }}  <i v-if="currentUser.id === comment.user.id" @click="deleteComment" :id="comment.id" class="far fa-trash-alt"></i>
          </div>
          <div v-else>
            <i class="far fa-comment-dots"></i> {{ comment.user.username }}: {{ comment.content }}
          </div>
        </div>
      </div>
      <div v-else class="article-detail-comments">
        <p>Make the first comment!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const baseURL = "https://finprojectapi.herokuapp.com/api/v1/community/articles/"
export default {
  name: "ArticleDetail",
  props: {
    // article: Object,
    // currentUser: Object
  },
  data() {
    return {
      article: null,
      comment: { content: null },
      comments: null,
      currentUser: null,
      likeUser: null,
      articleLiked: null,
    }
  },
  methods: {
    deleteArticle() {
      const config = {
        headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }
      }
      axios.delete(baseURL+`${this.$route.params.id}/`,config)
        .then(() => this.$router.push({ name:"ArticleList" }))
        .catch(err => console.log(err))
    },
    updateArticle() {
      this.$router.push({ name:'ArticleUpdate', params:{ id:this.$route.params.id, article:this.article } })
    },
    createComment() {
      if (this.$cookies.isKey("auth-token")) {
        const config = {
          headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }
        }
        axios.post(baseURL+`${this.$route.params.id}`+'/comments/', this.comment, config)
          .then(res => {
              this.comments.push(res.data)
              this.comment.content = null
          })
      } else {this.$router.push({name: 'Login'})}
    },
    deleteComment(event) {
      const id = event.target.id
      const config = {
      headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }
      }
      axios.delete(baseURL+`${id}`+'/comments/', null, config)
        .then(() => {
          this.comments = this.comments.filter(comment => {
            return comment.id !== Number(id)
          })
        })
      },
    toggleLike() {
      const likeBtn = document.querySelector(".article-detail-like-button")
      const config = {
        headers: { Authorization: `Token ${this.$cookies.get("auth-token")}` }
      }
      if (this.$cookies.isKey('auth-token')) {
        axios.get(baseURL + `${this.$route.params.id}` + '/likes/',config)
          .then(res => {
            if (res.data.liked) {
                likeBtn.style.color = "crimson"
                this.likeUser.push(this.currentUser)
            } else {
                likeBtn.style.color = "black"
                this.likeUser = this.likeUser.filter(user => {
                    return this.currentUser.username !== user.username
                })
            }
          })
          .catch(err=>console.log(err))
      } else {this.$router.push({name:'Login'})}
    },
    getArticle() {
      axios.get(baseURL+`${this.$route.params.id}/`)
        .then(res => {
          this.article = res.data
          this.comments = this.article.comments
          this.likeUser = this.article.like_users
        })
    },
    getCurrentUser() {
      const SERVER_URL = "https://finprojectapi.herokuapp.com"
      const config = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
      axios.get(SERVER_URL + '/api/v1/accounts/', config)
      .then(res => {
        this.currentUser = res.data
        this.articleLiked = !!this.likeUser.some(user => user.username === this.currentUser.username)
      })
      .catch(() => this.currentUser = null)
    },
    likedColor() {
      const likeBtn = document.querySelector(".article-detail-like-button")
      console.log(this.articleLiked)
      if (this.articleLiked) {
          likeBtn.style.color = 'crimson'
      } else {likeBtn.style.color = 'black'}
    }
  },
  mounted() {
    this.getArticle();
    this.getCurrentUser();
  },

}
</script>

<style>

.article-detail {
  margin-top: 15px;
}

.article-detail-header {
  position: relative;
}

.article-detail-movie-title {
  position: absolute;
  right: 0;
  top: 1px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: black;
}

.article-detail-body {
  position: relative;
}

.article-detail-title {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #F8EFBA;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 14px;
  font-weight: 700;
}

.article-detail-content {
  margin-top: 10px;
  padding: 20px;
  white-space: pre;
  border-radius: 10px;
  background-color: #F8EFBA;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5
}

.article-detail-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 15px;
  font-size: 18px;
}

.article-detail-like {
  font-size: 22px;
  margin-top: 3px;
}

.article-detail-buttons {
  display: flex;
  justify-self: end;
  justify-content: flex-end;
}

.article-detail-button {
  border: none;
  border-radius: 15px;
  margin-left: 10px;
  padding: 5px 15px;
  background-color: #535c68;
  color: #fcfcfc;
  font-size: 16px;
  font-family: 'Overpass';
}

.article-detail-comment-label {
  margin-top: 20px;
}

.article-detail-comments-inputs {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.article-detail-comments-input {
  display: block;
  width: 100%;
  border: 0.5px solid gainsboro;
  border-radius: 3px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 3px 3px 3px gainsboro;
}

.article-detail-comments-button {
  display: block;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 10px;
  margin-left: 10px;
}

.article-detail-comments {
  margin-top: 10px;
  padding: 20px;
  background-color: #F8EFBA;
  line-height: 1.5;
}

.delete {
  cursor: pointer;
}

@media screen and (min-width: 576px) { 
  .article-detail {
    margin: 30px auto;
  }

  .article-detail-movie-title {
    font-size: 24px;
  }

  .article-detail-title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px 30px;
    font-size: 24px;
  }

  .article-detail-content {
    margin-top: 20px;
    padding: 20px 30px;
    font-size: 24px;
    font-weight: 400;
  }

  .article-detail-footer {
    margin-top: 30px;
  }

  .article-detail-like {
    font-size: 32px;
    margin-top: 3px;
  }

  .article-detail-button {
    margin-left: 20px;
    padding: 10px 20px;
    font-size: 24px;
  }

  .article-detail-comment-label {
    margin-top: 40px;
  }

  .article-detail-comments-inputs {
    margin-top: 20px;
  }

  .article-detail-comments-input {
    padding: 10px 20px;
    font-size: 30px;
  }

  .article-detail-comments-button {
    display: block;
    font-size: 24px;
    border: none;
    border-radius: 5px;
    background-color: #535c68;
    box-shadow: 1px 1px 1px gainsboro;
    color: #fcfcfc;
    padding: 8px 10px;
    margin-left: 10px;
  }

  .article-detail-comments {
    margin-top: 20px;
    padding: 20px;
    font-size: 28px;
  }

}

</style>