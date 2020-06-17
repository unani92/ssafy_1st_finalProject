<template>
  <div class="movie-detail">
    <div v-if="video" class="movie-detail-video">
      <VideoDetail :video="video"/>
    </div>
    <div class="movie-detail-title">
      <h3>{{ movie.title }} </h3>
    </div>
    <div class="movie-detail-infos">
      <div class="movie-detail-info">장르 : <span class="movie-detail-info-genre" v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</span></div>
      <div class="movie-detail-info">평점 : <i class="fas fa-star movie-detail-info-icon"></i> {{ movie.vote_average }}</div>
      <div class="movie-detail-info">개봉일 : {{ movie.release_date }}</div>
    </div>
    <div class="movie-detail-overview">
      {{ movie.overview }}
    </div>
    <div class="movie-detail-articles">
      <div class="movie-detail-articles-header">
        <div class="movie-detail-articles-header-title">영화 게시판</div>
        <button class="movie-detail-articles-header-button" @click="goCreateArticle">새글쓰기</button>
      </div>
      <div v-if="isLoggedIn">
        <ListView :articles="articles" :pageSize="pageSize" :currentUser="currentUser" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VideoDetail from "@/components/VideoDetail";
import ListView from "@/components/ListView.vue"
const API_URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY

export default {
  name: 'MovieDetail',
  components: {
      VideoDetail,
      ListView
  },
  data() {
    return {
        video: null,
        articles: this.movie.articles,
        pageSize: parseInt(3),
        isLoggedIn: this.$cookies.isKey('auth-token')
    }
  },
  props: {
    movie: Object,
    currentUser: Object
  },
  methods: {
      getVideo() {
          axios.get(API_URL,{
              params: {
                  key: API_KEY,
                  part: "snippet",
                  maxResults: 1,
                  type: "video",
                  q: this.movie.title + " 예고편"
              }
          })
            .then(
                res => {
                    this.video = res.data.items[0]
                }
            )
            .catch(err => console.log(err.data))
      },
      goCreateArticle() {
          if (this.$cookies.isKey("auth-token")) {
            this.$router.push({name:'ArticleCreate', params:{id:this.movie.id}})
          } else {this.$router.push({name:'Login'})}
      }

  },
  mounted() {
      this.getVideo();
  }
}
</script>

<style>
.movie-detail {
  margin-top: 15px;
}

.movie-detail-articles {
  border-top: 1px solid #030303;
}

.movie-detail-video, 
.movie-detail-title, 
.movie-detail-infos, 
.movie-detail-overview,
.movie-detail-articles-header {
  margin: 15px;
}

.movie-detail-articles-header {
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
}

.movie-detail-title {
  font-size: 24px;
}

.movie-detail-infos {
  line-height: 1.2;
}

.movie-detail-info-genre {
  margin-right: 5px;
}

.movie-detail-overview {
  line-height: 1.1;
}

.movie-detail-info-icon {
  color: #f1c40f;
}

.movie-detail-articles-header-button {
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 20px;
}

@media screen and (min-width: 576px) { 
  .movie-detail {
    margin-top: 30px;
  }

  .movie-detail-video, 
  .movie-detail-title, 
  .movie-detail-infos, 
  .movie-detail-overview,
  .movie-detail-articles-header {
    font-size: 32px;
    margin: 30px;
  }

  .movie-detail-title {
    font-size: 40px;
  }

  .movie-detail-infos {
    line-height: 1.4;
  }

  .movie-detail-info-genre {
    margin-right: 15px;
  }

  .movie-detail-overview {
    line-height: 1.2;
  }

  .movie-detail-articles-header-button {
    font-size: 24px;

    padding: 12px 30px;
  }
}


</style>