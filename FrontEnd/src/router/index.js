import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/accounts/Login.vue'
import Logout from '@/views/accounts/Logout.vue'
import Signup from '@/views/accounts/Signup.vue'
import Profile from '@/views/accounts/Profile.vue'

import ArticleList from '@/views/community/articles/ArticleList.vue'
import ArticleDetail from '@/views/community/articles/ArticleDetail.vue'

import MovieList from '@/views/community/movies/MovieList.vue'
import MovieDetail from '@/views/community/movies/MovieDetail.vue'
import MovieSearch from '@/views/community/movies/MovieSearch.vue'
import MovieRecommend from '@/views/community/movies/MovieRecommend.vue'
import ArticleCreate from "../views/community/articles/ArticleCreate";
import ArticleUpdate from "../views/community/articles/ArticleUpdate";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/accounts/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/community/articles',
    name: 'ArticleList',
    component: ArticleList,
    props: true
  },
  {
    path: '/community/articles/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  },
  {
    path: '/community/articles/update/:id',
    name: 'ArticleUpdate',
    component: ArticleUpdate,
    props: true
  },
  {
    path: '/community/movies',
    name: 'MovieList',
    component: MovieList,
    props: true
  },
  {
    path: '/community/movies/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
  },
  {
    path: '/community/movies/:id/create',
    name: 'ArticleCreate',
    component: ArticleCreate,
    props: true
  },
  {
    path: '/community/moviesearch',
    name: 'MovieSearch',
    component: MovieSearch,
    props: true
  },
  {
    path: '/community/movierecommend',
    name: 'MovieRecommend',
    component: MovieRecommend,
    props: true
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['Home', 'Login', 'Signup', 'ArticleList', 'ArticleDetail', 'MovieList', 'MovieDetail', 'MovieSearch']
  const authPages = ['Login', 'Signup']

  const authRequired = !publicPages.includes(to.name)
  const unauthRequired = authPages.includes(to.name)
  const isLoggedIn = !!Vue.$cookies.isKey('auth-token')

  if (unauthRequired && isLoggedIn) {
    next('/')
  }

  if (authRequired && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }

})


export default router
