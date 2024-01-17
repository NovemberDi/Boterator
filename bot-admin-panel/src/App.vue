<template>
  <MyAuth  v-if="!isAutorizate"
  :authLink="authLink"
  :authLoading="authLoading"
  ></MyAuth>

  <div v-if="isAutorizate">
    <MyHeader 
      :domen="domen"
      @setGuild="curentGuild = $event" 
      @logout="logout">
    </MyHeader>
    <UsersList 
      :domen="domen"
      :guild="curentGuild"
      @logout="logout">
     </UsersList>
  </div>
  <div class="footer"></div>


</template>
<script>
import axios from 'axios'
export default {
  name: 'AutorizatePage',
  data(){
      return {
        isAutorizate: false,
        authLink: null,
        authLoading: false,
        curentGuild: '',
        domen:'',
        // domen:'http://192.168.0.105:53134',

             }
  },
  props: {

  },
  methods:{
    async makeLink(){
           //Делаем ссылку и сохраняем параметр state в sessionStorege
      let link = await (await axios.get(this.domen+'/auth/link')).data;
      let randomString;
      if (sessionStorage.getItem('oauth-state')) {
        randomString = sessionStorage.getItem('oauth-state');
        this.authLink = link+`&state=${encodeURIComponent(btoa(randomString))}`;
      } else {
        randomString = generateRandomString();
        sessionStorage.setItem('oauth-state', randomString);
        this.authLink = link+`&state=${encodeURIComponent(btoa(randomString))}`;
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
        this.getToken(code);
        return console.log('Успех');
        
    },
    async getToken(code){
      this.authLoading = true;
      try{
      let data = await (await axios.post(this.domen+'/auth/login', {code})).data
      // console.log(data)
      if (data.token) {
        console.log(data.token)
        sessionStorage.setItem('token', data.token)
        this.isAutorizate = true;
      } else{
        console.log(data.message)
        this.logout();
      }
      
      } catch(e) { 
        console.log(e)
        this.logout();

      }
      this.authLoading = false;
    },
    logout(){
      sessionStorage.clear();
      window.location.href = window.location.origin;
    },
    checkLogin(){
      if (sessionStorage.getItem('token')){
        this.isAutorizate = true;
      } else {
        this.makeLink();
        this.checkCSRF();
      }
    },
    makeDomen(){
      if(!this.domen)
      this.domen = window.location.origin;
    }
  },

  mounted(){
    this.makeDomen();
    this.checkLogin();

  }

}
</script>
<style>
* {
margin: 0;
padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #313338;
  height: 100%;
  min-height: 100vh;
  color: #ffffff ;
}
.footer{
  height: 30px;
}
</style>