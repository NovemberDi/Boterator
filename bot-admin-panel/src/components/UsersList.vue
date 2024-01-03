<template>
  <div class="wrap">

    <ul class="list-users" >
      <div class="top-list">
        <div class="tools-panel">
          <img class="reload btn animated" :class="{rotateBtn: waitData}" src="./../assets/reload.svg"  @click="auditUsers" alt="check" >
        </div>
        <li class="user" >
          <div class="number list-head"  >№</div>
          <div class="user-name list-head" >Имя</div>
          <div class="role-block list-head">Роль</div>
        </li>
      </div>
      
      <li class="user" v-for="user in result" :key="user.iuserID"> 
         <div class="number">{{ result.indexOf(user)+1 }}) </div>
         <div class="user-name">
            <img class="avatar" :src="user.avatar" alt="">
            {{ user.name }}
        </div>
         <div class="role-block">
          <div class="role" :class="{hasrole: user.hasRole}"></div>
          <div class="check" >
            <img v-if="user.auditResult == true" src="./../assets/ok.svg" alt="ОК">
            <img v-if="user.auditResult == false" src="./../assets/false.svg" alt="BAD">
            <img v-if="user.auditResult == null" src="./../assets/not.svg" alt="NOT">
          
          </div>
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
      waitData:false,
      // guild: '1016758118421626902'
    }
  },
  props: {
    guild: {type: String, default: ''}
  },
  methods:{
    async auditUsers(){
    this.waitData = true;
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    // console.log(token);
    let data = {
      target: null,
      guild: this.guild
    }
    if (!token) return
      try{
        let answer = await axios.post('http://192.168.0.105:53134/auth/auditUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data.sort((a, b) => a.auditResult - b.auditResult); //сортируем по имени

      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
    this.waitData = false;
    },
    async fixUsers(){
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    // console.log(token);
    let data = {
      target: [],
      guild: this.guild
    }
    this.result.forEach((item) => {
      if (item.auditResult) return;
      let {id, hasRole} = item;
      let user = {id, hasRole}
      data.target.push(user) 
    });
    console.log(data.target)
    if (!token) return
      try{
        let answer = await axios.post('http://192.168.0.105:53134/auth/fixUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data
      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
    },
   async getUsers(){
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    let data = {
      guild: this.guild
    }
    // console.log(token)
    if (!token) return
      try{
        let answer = await axios.post('http://192.168.0.105:53134/auth/getUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        
        // answer.data.forEach(item => item.statusChek = false); 
        // this.result = answer.data.sort((a, b) => a.name.localeCompare(b.name)); //сортируем по имени
        this.result = answer.data.sort((a, b) => a.name - b.name); //сортируем по имени


      }catch(err){
        console.log(err)
        if (!err.response) return
        if (err.response.status == 403) this.$emit('logout')
      }
    }
  },
  mounted(){
   
  },
  watch:{
    guild(){
      this.getUsers();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(-360deg)
  }
}
.top-list{
  position: sticky;
  top: 0px;
  background-color: #2b2b2c;
}
.tools-panel{
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  height: 18px;
  cursor: pointer;
}
.rotateBtn{
  animation: linear rotate 2s infinite;
}
.reload:active {
  height: 16px;
}
.check{
  height: 15px;
  width: 15px;
}
.number{
  width: 30px;
}
.role-block{
display: flex;
justify-content: space-around;
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
  /* margin: 10px; */
  height: 30px;
  justify-content: space-between;
  align-items: center;
}
.avatar{
  margin: 10px;
  height:25px;
  width:25px;
  border-radius: 50%;
  object-fit: cover;
}
.wrap{
  width:350px;
  margin: 20px auto 0px auto ;
  background-color: aquamarine;
  border-radius: 8px;
  background-color: #2b2b2c;
  overflow: hidden;
  /* border: #42b983 2px solid; */
}
.list-users{
  list-style-type: none;
  padding: 0;
  /* background-color: #2b2b2c; */
  /* width: max-content; */
  height: max-content;
  max-height: 85vh;
  /* width: 100%; */
  overflow-y: scroll;
    overflow-x: hidden;
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
  margin: 0 4px;
}



.list-users::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.list-users::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color:#b9a5fd74;
}

.list-users::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #20202000;
}
</style>
