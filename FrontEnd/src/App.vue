<template>
  <div id="app" class="app">
    <div v-if="isSideBar" class="sidebar">
      <div class="sidebar-items">
        <div class="sidebar-item-label">Accounts</div>
        <router-link 
          v-if="!isLoggedIn"
          :to="{ name: 'Login' }" 
          class="router-link"><div @click="togleSidebar" class="sidebar-item">Login</div></router-link>
        <router-link 
          v-if="isLoggedIn"
          :to="{ name: 'Logout' }" 
          class="router-link"><div @click="togleSidebar" class="sidebar-item">Logout</div></router-link>
        <router-link 
          v-if="!isLoggedIn"
          :to="{ name: 'Signup' }" 
          class="router-link"><div @click="togleSidebar" class="sidebar-item">Signup</div></router-link>
        <!-- Profile view 로 variable routing 필요 -->
        <!-- pk, url 하드코딩한 부분 바꿔야 함 -->
        <router-link 
          v-if="isLoggedIn"
          :to="{ name:'Profile', params: { id: currentUser.id, currentUser: currentUser } }"
          class="router-link"><div @click="togleSidebar" class="sidebar-item">My Page</div></router-link>
      </div>
      <div class="sidebar-infos">
        <div class="sidebar-info-label">Made by</div>
        <a href="https://github.com/unani92"><div class="sidebar-info router-link" ><i class="fab fa-github"></i> Unani92</div></a>
        <a href="https://github.com/YeongbuCha"><div class="sidebar-info router-link"><i class="fab fa-github"></i> YeongbuCha</div></a>
      </div>
    </div>
    <div v-if="isSideBar" @click="togleSidebar" class="main-overlay"></div>
    <div class="main">
      <a href="https://www.youtube.com/watch?v=1JsvqaWd_2U">
        <div class="hero">
          <span class="hero-button">watch trailer</span>
        </div>
      </a>
      <div class="header">
        <div class="header-title">
          <div @click="togleSidebar" class="togle-sidebar" ><i class="fas fa-bars"></i></div>
          <router-link :to="{ name: 'Home', params: { currentUser: currentUser } }" class="router-link"><div class="header-title-logo">MOVIELE</div></router-link>
          <div></div>
        </div>
        <div class="header-navbar">
          <router-link :to="{ name: 'MovieList', params: { currentUser: currentUser } }" class="router-link">Movies</router-link>
          <router-link :to="{ name: 'MovieSearch', params: { currentUser: currentUser } }" class="router-link">Search</router-link>
          <router-link :to="{ name: 'MovieRecommend', params: { currentUser: currentUser } }" class="router-link">For you</router-link>
          <router-link :to="{ name: 'ArticleList', params: { currentUser: currentUser } }" class="router-link">Community</router-link>
        </div>
      </div>
      <router-view 
        @submit-login-data="login"
        @submit-signup-data="signup"
        @logout="logout"
        class="router-view" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = "https://finprojectapi.herokuapp.com"

export default {
  name: 'App',
  data() {
    return {
      isSideBar: false,
      isLoggedIn: false,
      currentUser: {},
    }
  },
  methods: {
    setCookie(token) {
      this.$cookies.set('auth-token', token)
      this.$isLoggedIn = true
      this.getCurrentUser()
    },

    signup(signupData) {
      axios.post(SERVER_URL + '/rest-auth/signup/', signupData)
        .then(res => {
          this.setCookie(res.data.key)
          this.$router.push({ name: 'Home', params: { currentUser: this.currentUser } })
          this.isLoggedIn = true
        })
        .catch(() => alert("아이디, 비밀번호를 다시 확인하세요"))
    },

    login(loginData) {
      axios.post(SERVER_URL + '/rest-auth/login/', loginData)
        .then(res => {
          this.setCookie(res.data.key)
          this.$router.push({ name: 'Home', params: { currentUser: this.currentUser } })
          this.isLoggedIn = true
        })
        .catch(() => alert("로그인에 실패했습니다. 아이디/비밀번호를 확인하세요"))
    },
    logout() {
      const config = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
      axios.post(SERVER_URL + '/rest-auth/logout/', null, config)
        .then(() => {
          this.$cookies.remove('auth-token')
          this.isLoggedIn = false
          this.currentUser = {}
          this.$router.push({ name: 'Home', params: { currentUser: this.currentUser } })
        })
        .catch(err => console.error(err.response.data))
    },

    getCurrentUser() {
      const config = {
        headers: {
          'Authorization': `Token ${this.$cookies.get('auth-token')}`
        }
      }
      axios.get(SERVER_URL + '/api/v1/accounts/', config)
      .then(res => {
        this.currentUser = res.data
      })
      .catch(err => console.error(err.response.data))
    },

    togleSidebar() {
      this.isSideBar = !this.isSideBar
    },
  },
  mounted() {
    this.isLoggedIn = this.$cookies.isKey('auth-token')
    if (this.isLoggedIn===true) {
      this.getCurrentUser()
    }
  },
}
</script>


<style>
/* reset css */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

/* custom */
* {
  box-sizing: border-box;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}

.sidebar {
  position: absolute;
  z-index: 3;
  width: 40%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fcfcfc;
  padding-left: 3px;
  padding-right: 3px;
}

.main-overlay {
  width: 60%;
  height: 100%;
  background-color: rgba(ff, ff, ff, 0);
  position: absolute;
  top: 0;
  left: 40%;
  z-index: 2;
}

.sidebar-item-label {
  margin: 10px 10px;
}

.sidebar-info-label {
  margin-bottom: 15px;
}

.sidebar-items {
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid gainsboro;
}

.sidebar-item {
  border: 1px solid black;
  margin: 5px 10px;
  padding: 5px 10px;
}

.sidebar-infos {
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  border-bottom: 1px solid gainsboro;
}

.sidebar-info {
  padding-bottom: 3px;
}

.header-title {
  width: 100vw;
  text-align: center;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 8fr 1fr;
  padding-top: 15px;
}

.header-title-logo {
  font-size: 1.8rem;
  font-weight: 700;
}

.header-navbar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid black;

}

.togle-sidebar {
  text-align: center;
  padding-left: 25%;
  z-index: 1;
}

.router-link {
  color: black;
  font-size: 0.8rem;
  text-decoration: none;
}


.sidebar-items > a,
.sidebar-infos > a,
.header-title > a,
.header-navbar > a {
  text-decoration: none;
  color: black;
}

.hero {
  height: 90px;
  background-image: url(https://res.cloudinary.com/kennycld/image/upload/v1591927860/final%20projects/hero_image_sgfuyd.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-button {
  font-size: 8px;
  font-family: 'Overpass';
  color: #fcfcfc;
  border: none;
  border-radius: 3px;
  padding: 2px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.router-view {
  padding-top: 15px;
}


/* media */

@media screen and (min-width: 576px) { 
  .app {
    font-size: 40px
  }
  
  .hero {
  height: 180px;
  background-image: url(https://res.cloudinary.com/kennycld/image/upload/v1591928123/final%20projects/hero_large_image_ldgi6g.png);
  background-size: cover ;
  }

  .hero-button {
    font-size: 30px;
    right: 30px;
  }

  .sidebar {
  width: 50%;
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  }

  .main-overlay {
    width: 50%;
    left: 50%;
  }

  .sidebar-item-label {
    margin-bottom: 30px;
  }

  .sidebar-item {
    font-size: 25px;
    margin-top: 15px;
    padding: 15px 20px;
  }

  .sidebar-info-label {
    margin-bottom: 30px;
  }

  .sidebar-info {
    font-size: 25px;
    padding-bottom: 3px;
  }

  
  .header-title {
    padding-top: 30px;
  }

  .header-title-logo {
    font-size: 4rem;
  }

  .header-navbar {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .router-link {
    color: black;
    font-size: 2rem;
    text-decoration: none;
  }

  .router-view {
    margin: 0 10%;
    padding-top: 30px;
  }
}


</style>
