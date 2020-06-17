<template>
  <div class="sign-up">
    <div class="sign-up-header">
      <h3>Signup</h3>
    </div>
    <div class="sign-up-block">
      <label for="username" class="sign-up-label">username</label>
      <input v-model="signupData.username" type="text" id="username" class="sign-up-input">
    </div>
    <div class="sign-up-block">
      <label for="password1" class="sign-up-label">password</label>
      <input v-model="signupData.password1" type="password" id="password1" class="sign-up-input">
    </div>
    <div class="sign-up-block">
      <label for="password2" class="sign-up-label">password confirm</label>
      <input v-model="signupData.password2" type="password" id="password2" class="sign-up-input">
    </div>
    <div class="sign-up-block">
      <label for="age" class="sign-up-label">age</label>
      <input v-model="signupData.age" type="text" id="age" class="sign-up-input">
    </div>
    <div class="sign-up-block">
      <button @click="signup" class="sign-up-button">Signup</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null,
        age: null
      }
    }
  },
  
  methods: {
    signup() {
      this.$emit('submit-signup-data', this.signupData)
    }
  },
}
</script>

<style>
.sign-up {
  text-align: center;
}

.sign-up-block {
  margin-top: 15px;
}

.sign-up-label {
  margin-top: 15px;
  margin-left: 15%;
  display: block;
  text-align: start;
}

.sign-up-input {
  margin-top: 5px;
  padding: 10px 5%;
  width: 80%;
  border: 0.5px solid gainsboro;
  border-radius: 10px;
  border-right: 1px solid #535c68;
  border-bottom: 1px solid #535c68;
  box-shadow: 1px 1px 1px gainsboro;
}

.sign-up-button {
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
  .sign-up-block {
    margin-top: 30px;
  }

  .sign-up-label {
    margin-left: 10%;
  }
  
  .sign-up-input {
    margin-top: 20px;
    width: 90%;
  }

  .sign-up-button {
    margin-top: 15px;
    font-size: 24px;
  }
}


</style>