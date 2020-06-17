<template>
  <div class="home">
    <h1 class="home-title">Home</h1>
    <div class="home-label">
      <h1>Best Movies</h1>
    </div>
    <div class="home-movies">
      <router-link 
        :to="{ name:'MovieDetail', params: { id: homeMovie.id, movie: homeMovie } }"
        v-for="homeMovie in homeMovies" 
        :key="homeMovie.id" >
        <div 
          class="home-movie">
          <img 
              :src="'https://image.tmdb.org/t/p/w342' + homeMovie.poster_path" 
              class="home-movie-img"
              alt="movie-poster">
            <div class="home-movie-rank">
              <p><i class="fas fa-star"></i> {{ homeMovie.vote_average }}</p>
            </div>
            <div class="home-movie-info">
              <p>{{ homeMovie.title }}</p>
              <p>{{ homeMovie.release_date }}</p>
            </div>
        </div>
      </router-link>
    </div>
    <div class="home-label">
      <h1>Best Reviews</h1>
    </div>
    <ListView :articles="homeArticles" :pageSize="pageSize" :currentUser="currentUser"/>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import axios from 'axios'

const SERVER_URL = 'https://finprojectapi.herokuapp.com'

export default {
  name: 'Home',
  data() {
    return {
      homeMovies: [],
      homeArticles: [],
      pageSize: parseInt(1)
    }
  },

  props: {
    currentUser: Object
  },

  components: {
    ListView
  },
  
  methods: {
    getHomeMovies() {
      axios.get(SERVER_URL + '/api/v1/community/movies/home/')
        .then(res => {
          this.homeMovies = res.data
        })
    },

    getHomeArticles() {
      axios.get(SERVER_URL + '/api/v1/community/articles/home/')
        .then(res => {
          this.homeArticles = res.data
        })
    },
  },
  
  created() {
    this.getHomeMovies()
    this.getHomeArticles()
  },

}
</script>

<style>
.home-title {
  text-align: center;
}

.home-label,
.home-movies {
  padding: 15px 15px 0;
}

.home-movies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.home-movie {
  position: relative;;
}

.home-movie-img {
  width: 100%;
  height: 100%;
}

.home-movie-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fcfcfc;
  padding: 3px;
  font-size: 12px;
}

.home-movie-rank {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 25%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: #fffa65;
  padding: 3px;
  font-size: 12px;
}

@media screen and (min-width: 576px) { 
  .home-movie-info {
    font-size: 16px;
  }

  .home-movie-rank {
    font-size: 16px;
  }  
}

@media screen and (min-width: 992px) { 
  .home-movie-info {
    font-size: 32px;
  }

  .home-movie-rank {
    font-size: 28px;
  }  
}

</style>