<template>
  <div class="log-in">
    <div class="log-in-header">
      <h3>Login</h3>
    </div>
    <div class="log-in-block">
      <label for="username" class="log-in-label">username</label>
      <input v-model="loginData.username" type="text" id="username" class="log-in-input">
    </div>
    <div class="log-in-block">
      <label for="password" class="log-in-label">password</label>
      <input v-model="loginData.password" type="password" id="password" class="log-in-input">
    </div>
    <div class="log-in-block">
      <button @click="login" class="log-in-button">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        username: null,
        password: null
      }
    }
  },
  
  methods: {
    login() {
      this.$emit('submit-login-data', this.loginData)
    }
  },
}
</script>

<style>
.log-in {
  text-align: center;
}

.log-in-block {
  margin-top: 15px;
  text-align: center;
}

.log-in-label {
  margin-left: 15%;
  display: block;
  text-align: start;
}

.log-in-input {
  margin-top: 5px;
  padding: 10px 5%;
  width: 80%;
  border: 0.5px solid gainsboro;
  border-radius: 10px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 1px 1px 1px gainsboro;
}

.log-in-button {
  margin-top: 15px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  background-color: #535c68;
  box-shadow: 1px 1px 1px gainsboro;
  color: #fcfcfc;
  padding: 8px 20px;
}

@media screen and (min-width: 576px) { 
  .log-in-block {
    margin-top: 30px;
  }

  .log-in-label {
    margin-left: 10%;
  }

  .log-in-input {
    margin-top: 15px;
    width: 90%;
  }

  .log-in-button {
    margin-top: 15px;
    font-size: 24px;
  }
}

</style>