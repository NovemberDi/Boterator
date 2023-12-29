<template>
  <div v-if="isAutorizate">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view
    @logout="isAutorizate=false"
    />
</div>
<div class="auth" v-if="!isAutorizate" >Авторизуйтесь
  <p>
    <a :href="`${authLink} `"
      >Авторизация</a>
  </p>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AutorizatePage',
  data(){
      return {
        isAutorizate: true,
        authLink: 'https://discord.com/api/oauth2/authorize?client_id=1025864212066611270&redirect_uri=http%3A%2F%2F192.168.0.105%3A53134&response_type=code&scope=identify',
      }
  },
  props: {
    msg: String
  },
  methods:{
    async makeLink(){     //Делаем ссылку и сохраняем параметр state в sessionStorege
      let randomString;
      if (sessionStorage.getItem('oauth-state')) {
        randomString = sessionStorage.getItem('oauth-state');
        this.authLink += `&state=${encodeURIComponent(btoa(randomString))}`;
      } else {
        randomString = generateRandomString();
        sessionStorage.setItem('oauth-state', randomString);
        this.authLink += `&state=${encodeURIComponent(btoa(randomString))}`;
      }
      function generateRandomString() {
			let randomString = '';
			const randomNumber = Math.floor(Math.random() * 10);

			for (let i = 0; i < 20 + randomNumber; i++) {
				randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
			}

			return randomString;
		}

    },
    checkCSRF(){
      let code = new URLSearchParams(window.location.search).get('code');
      if (!code) return
      let state = new URLSearchParams(window.location.search).get('state');
      console.log(state)
      if (sessionStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
				return console.log('You may have been click-jacked!');
			}
      // this.isAutorizate = true;
        this.getToken(code);
        return console.log('Успех');
        
    },
    async getToken(code){
      try{
      let data = await (await axios.post('http://192.168.0.105:53134/auth/login', {code})).data
      // console.log(data)
      if (data.token) {
        console.log(data.token)
        sessionStorage.setItem('token', data.token)
        this.isAutorizate = true;
      } else{
        console.log(data.message)
        this.isAutorizate = false;
      }
      
      } catch(e) { 
        console.log(e)
        this.isAutorizate = false;
      }
    }
  },

  mounted(){
    this.makeLink(),
    this.checkCSRF()
  }

}
</script>
<style>
* {
margin: 0;
padding: 0;
}
a {
  color: #42b983;
}
.auth{
  color: #e5ebf2;
  font-size: 28px;
  height: 600px;
  width: 300px;
  background: #616161;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
