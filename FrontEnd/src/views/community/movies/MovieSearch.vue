<template>
  <div class="movie-search">
    <div class="movie-search-header">
      <h3>MovieSearch</h3>
      <input 
        class="movie-search-input"
        v-model="searchInput"
        @keypress.enter="getResult" 
        type="text">
      <button 
        @click="getResult"
        class="movie-search-button">
          Search
      </button>
    </div>
    <div v-if="resultMovies" class="movie-search-body container">
      <router-link
        :to="{ name:'MovieDetail', params: {id:resultMovie.id, movie:resultMovie, currentUser:currentUser} }"
        v-for="resultMovie in resultMovies"
        :key="resultMovie.id">
        <div class="movie-list-item">
          <img 
            :src="'https://image.tmdb.org/t/p/w342' + resultMovie.poster_path" 
            class="movie-list-item-img"
            alt="movie-poster">
          <div class="movie-list-item-rank">
            <p><i class="fas fa-star"></i> {{ resultMovie.vote_average }}</p>
          </div>
            <div class="movie-list-item-info">
              <p>{{ resultMovie.title }}</p>
              <p>{{ resultMovie.release_date }}</p>
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
  name: 'MovieSearch',
  data() {
    return {
      searchInput: '',
      resultMovies: [],
    }
  },

  props: {
    currentUser: Object
  },

  methods: {
    getResult() {
      const options = {
        params: {
          q: this.searchInput,
        }
      }
      axios.get(SERVER_URL + '/api/v1/community/movies/', options)
        .then(res => {
          this.resultMovies = res.data
        })
        .catch(err => console.error(err.response.data))
    },
  },
}
</script>

<style>

.movie-search {
  height: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 1fr;
}

.movie-search-input {
  display: block;
  margin: 15px auto 0;
  padding-left: 5%;
  width: 80%;
  height: 30%;
  border: 0.5px solid gainsboro;
  border-radius: 3px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 3px 3px 3px gainsboro;
}

.movie-search-button {
  display: block;
  margin: 15px auto 0;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 20px;
}

.movie-search-body {
  padding-top: 10px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 280px;
  gap: 10px;
}

.movie-list-item {
  height: 100%;
  background-image: url('https://image.tmdb.org/t/p/w342/37M8j1nwMs8wu2H2tMtDjqhTSnd.jpg'); 
  background-size: cover;
}


/* media */
@media screen and (min-width: 576px) { 
  .movie-search-input {
    font-size: 30px;
    margin: 30px auto 0;
    height: 50%;
  }

  .movie-search-button {
    margin: 20px auto 0;
    font-size: 18px;
    padding: 8px 20px;
  }

  .movie-search-body {
    padding-top: 80px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 350px;
    gap: 20px;
  }
}

@media screen and (min-width: 992px) { 
  .movie-search-body {
    padding-top: 80px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 450px;
    gap: 20px;
  } 
}




</style>