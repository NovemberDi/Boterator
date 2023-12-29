<template>
  <div class="wrap">
    <button @click="auditUsers"> Ревизия </button>
    <ul class="list-users" >
      <li class="user" >
        <div class="number list-head"  >№</div>
        <div class="user-name list-head" >Имя</div>
        <div class="role-block list-head">Роль</div>
      </li>
      <li class="user" v-for="user in result" :key="user.iuserID"> 
         <div class="number">{{ result.indexOf(user)+1 }}) </div>
         <div class="user-name">
            <img class="avatar" :src="user.avatar" alt="">
            {{ user.name }}
        </div>
         <div class="role-block">
          <div class="role" :class="{hasrole: user.hasRole}"></div>
          <div class="check" :class="{hasrole: user.statusChek}"></div>
         </div>        
      </li>
    </ul>

    

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UsersList',
  data(){
    return{
      result: '',
    }
  },
  props: {
    
  },
  methods:{
    async auditUsers(){
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    // console.log(token);
    let data = {
      target: null,
      guild: '1016758118421626902'
    }
    if (!token) return
      try{
        let answer = await axios.post('http://192.168.0.105:53134/auth/auditUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data.answer
      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
    },

   async getData(){
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    console.log(token)
    if (!token) return
      try{
        let answer = await axios.get('http://192.168.0.105:53134/auth/data',{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data.answer.sort((a, b) => a.name.localeCompare(b.name));
        this.result.forEach(item => item.statusChek = false);
      }catch(err){
        console.log(err)
        if (!err.response) return
        if (err.response.status == 403) this.$emit('logout')
      }
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.number{
  width: 30px;
}
.role-block{
display: flex;
justify-content: center;
width: 60px;
align-items: center;
}
.role{
  height: 15px;
  width: 15px;
  background-color: brown;
  border-radius: 50%;
}
.hasrole{
  background-color:#42b983;
}
.user{
  display: flex;
  margin: 0 10px;
  height: 30px;
  width: 350px;
  justify-content: space-between;
  align-items: center;
}
.avatar{
  margin: 10px;
  height:25px;
  width:25px;
  border-radius: 50%;
  object-fit: cover
}
.wrap{
  margin-top: 32px;
}
.list-users{
  background-color: #2b2b2c;
  width: max-content;
  height: max-content;
  border-radius: 8px;
  margin:auto;
}
.user-name{
  width: 250px;
  text-align: left;
  /* margin: 5px; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.list-head{
  border-bottom: #b9a5fd solid 1px;
  display: flex;
  align-items: center;
  justify-content:center;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
