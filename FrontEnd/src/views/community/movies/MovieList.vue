<template>
  <div class="movie-list">
    <h3>MovieList</h3>
    <div class="movie-list-wrapper container">
      <!-- pk, url 하드코딩한 부분 바꿔야 함 -->
      <router-link 
        :to="{ name:'MovieDetail', params: { id: movie.id, movie: movie, currentUser: currentUser } }"
        v-for="movie in movies"
        :key="movie.id">
        <div class="movie-list-item">
          <img 
            :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" 
            class="movie-list-item-img"
            alt="movie-poster">
          <div class="movie-list-item-rank">
            <p><i class="fas fa-star"></i> {{ movie.vote_average }}</p>
          </div>
          <div class="movie-list-item-info">
            <p>{{ movie.title }}</p>
            <p>{{ movie.release_date }}</p>
          </div>
        </div>
      </router-link>
      <div id="movieListBottomSensor"></div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/scrollmonitor/1.2.0/scrollMonitor.js"></script>
<script>
import axios from 'axios'

const SERVER_URL = 'https://finprojectapi.herokuapp.com'

export default {
  name: 'MovieList',
  data() {
    return {
      orderBy: 'pk',
      movies: [],
      page: 1,
    }
  },

  props: {
    currentUser: Object
  },

  methods: {
    getMovies() {
      const options = {
        params: {
          page: this.page++, 
          orderBy: this.orderBy
        }
      }
      axios.get(SERVER_URL + '/api/v1/community/movies/', options)
        .then(res => {
          this.movies = [...this.movies, ...res.data]
        })
        .catch(err => console.error(err.response.data))
    },

    addScrollWatcher() {
      const bottomSensor = document.querySelector('#movieListBottomSensor')
      const watcher = scrollMonitor.create(bottomSensor)
      watcher.enterViewport(() => {
        setTimeout(() => {
          this.getMovies()
        }, 500)
      })
    },

    loadUntilViewportIsFull() {
      const bottomSensor = document.querySelector('#movieListBottomSensor')
      const watcher = scrollMonitor.create(bottomSensor)
      if (watcher.isFullyInViewport) {
        this.getMovies()
      }
    }
  },

  created() {
    this.getMovies()
  },

  mounted() {
    this.addScrollWatcher()
  },

  updated() {
    this.loadUntilViewportIsFull()
  },
}
</script>

<style>

.movie-list {
  text-align: center;
}

.movie-list-wrapper {
  padding-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 280px;
  gap: 10px;
}

.movie-list-item { 
  position: relative;;
}

.movie-list-item-img {
  width: 100%;
  height: 100%;
}

.movie-list-item-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fcfcfc;
  padding: 3px;
  font-size: 12px;
}

.movie-list-item-rank {
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


/* media */

@media screen and (min-width: 576px) { 
  .movie-list-wrapper {
    padding-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 350px;
    gap: 20px;
  }

  .movie-list-item-info {
    font-size: 16px;
  }

  .movie-list-item-rank {
    font-size: 16px;
  }  
}

@media screen and (min-width: 992px) { 
  .movie-list-wrapper {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 450px;
  }

  .movie-list-item-info {
    font-size: 18px;
  }

  .movie-list-item-rank {
    font-size: 18px;
  }  
}


</style>