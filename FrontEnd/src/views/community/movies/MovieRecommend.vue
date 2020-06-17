<template>
  <div class="movie-recommend">
    <h3>MovieRecommend</h3>
    <div class="movie-recommend-wrapper container">
      <router-link 
        :to="{ name:'MovieDetail', params: { id: movie.id, movie: movie, currentUser: currentUser } }">
        <div class="movie-recommend-item">
          <img 
            :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" 
            class="movie-recommend-item-img"
            alt="movie-poster">
          <div class="movie-recommend-item-rank">
            <p><i class="fas fa-star"></i> {{ movie.vote_average }}</p>
          </div>
          <div class="movie-recommend-item-info">
            <p class="movie-recommend-item-info-title">{{ movie.title }}</p>
            <p class="movie-recommend-item-info-overview">{{ movie.overview }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = 'https://finprojectapi.herokuapp.com'

export default {
  name: 'MovieRecommend',
  data() {
    return {
      movie: {}
    }
  },

  props: {
    currentUser: Object
  },

  methods: {
    getMovie() {
      const config = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
      axios.get(SERVER_URL + '/api/v1/community/movies/recommend/', config)
        .then(res => this.movie = res.data)
        .catch(err => console.error(err.response.data))
    }
  },
  created() {
    this.getMovie()
  }
}
</script>

<style>

.movie-recommend {
  text-align: center;
}

.movie-recommend-wrapper {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.movie-recommend-item {
  position: relative;
  width: 100%;
  height: auto;
}

.movie-recommend-item-img {
  width: 100%;
  height: auto;
}

.movie-recommend-item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  text-align: start;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fcfcfc;
  padding: 30px;
  font-size: 14px;
  line-height: 1.2;
}

.movie-recommend-item-info-title {
  font-size: 24px;
}

.movie-recommend-item-rank {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 25%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: #fffa65;
  padding: 3px;
  font-size: 16px;
}


/* media */

@media screen and (min-width: 576px) { 
  .movie-recommend-item-info {
    font-size: 22px;
  }

  .movie-recommend-item-info-title {
    font-size: 32px;
  }

  .movie-recommend-item-rank {
    font-size: 20px;
  }  
}

@media screen and (min-width: 992px) { 
  .movie-recommend-item-info {
    font-size: 28px;
  }

  .movie-recommend-item-info-title {
    font-size: 40px;
  }

  .movie-recommend-item-rank {
    font-size: 28px;
  }  
}


</style>