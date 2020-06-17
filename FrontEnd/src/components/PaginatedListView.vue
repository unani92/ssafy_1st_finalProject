<template>
  <div class="article-list">
    <div class="article-list-wrapper container">
      <router-link 
        v-for="article in paginatedData"
        :key="article.id"
        :to="{ name: 'ArticleDetail', params: { id: article.id, article: article, currentUser: currentUser } }">
        <div 
          class="article-list-item">
          <div class="article-list-item-title">{{ article.title }}</div>
          <router-link 
            class="article-list-item-username-link"
            :to="{ name: 'Profile', params: { id: article.user.id, currentUser: currentUser } }">
            <div class="article-list-item-username"># {{ article.user.username }}</div>
          </router-link>
          <div class="article-list-item-movie-title">{{ article.movie.title }}</div>
          <div class="article-list-item-created-at">{{ article.created_at | formatDate }}</div>
        </div>  
      </router-link>
      <div class="button-wrapper">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-button">
          Prev
        </button>
        <div class="page-count">{{ pageNum + 1 }} / {{ pageCount }} page</div>
        <button 
          :disabled="pageNum >= pageCount - 1" 
          @click="nextPage" 
          class="page-button">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginatedListView',
  data () {
    return {
      pageNum: 0
    }
  },
  props: {
    articles: {
      type: Array,
    },
    pageSize: {
      type: Number,
      default: 5
    },
    currentUser: {
      type: Object
    },
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    }
  },
  computed: {
    pageCount () {
      let listLeng = this.articles.length,
          listSize = this.pageSize,
          page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      return this.articles.slice(start, end);
    }
  }
}
</script>

<style>
.button-wrapper {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}

.page-button {
  border: none;
  border-radius: 15px;
  background-color: #535c68;
  color: #fcfcfc;
  padding: 8px 20px;
  margin: 5px;
  font-size: 14px;
  font-family: 'Overpass';
}

.page-count {
  height: 100%;
  font-size: 18px;
  margin: 12px 0;
}

.article-list-wrapper {
  padding-top: 15px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 80px;
  gap: 10px;
}

.article-list-item { 
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  text-align: start;
  background-color: #535c68;
  border-radius: 10px;
  padding: 5%;
  color: #fcfcfc;
  font-size: 14px;
  box-shadow: 3px 3px 3px gainsboro;
  white-space: pre;
  position: relative;
}

.article-list-item-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.article-list-item-username-link {
  text-decoration: none;
  color: #fcfcfc;
}

.article-list-item-username {
  position: absolute;
  padding: 10px 20px;
  right: 0;
  top: 0;
}

.article-list-item-created-at {
  font-size: 10px;
  text-align: end;
}

@media screen and (min-width: 576px) { 
  .page-button {
    font-size: 16px;
  }

  .page-count {
    font-size: 18px;
  }

  .article-list-wrapper {
    padding-top: 30px;
    grid-auto-rows: 120px;
    gap: 20px;
  }

  .article-list-item { 
    padding: 5%;
    color: #fcfcfc;
    font-size: 20px;
  }

  .article-list-item-title {
    font-size: 24px;
  }

  .article-list-item-username {
    position: absolute;
    padding: 20px 30px;
    right: 0;
    top: 0;
  }

  .article-list-item-created-at {
    font-size: 14px;
    text-align: end;
  }
}

@media screen and (min-width: 992px) { 
  .page-button {
    font-size: 20px;
  }

  .page-count {
    font-size: 24px;
    margin-top: 10px;
  }

  .article-list-wrapper {
    grid-auto-rows: 150px;
    gap: 20px;
  }

  .article-list-item { 
    padding: 5%;
    color: #fcfcfc;
    font-size: 26px;
  }

  .article-list-item-title {
    font-size: 32px;
  }

  .article-list-item-username {
    position: absolute;
    padding: 30px 50px;
    right: 0;
    top: 0;
  }

  .article-list-item-created-at {
    font-size: 20px;
    text-align: end;
    padding-right: 10px;
  }
}
</style>