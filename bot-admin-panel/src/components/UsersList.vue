<template>
  <div class="wrap">

    <ul class="list-users">
      <div class="top-list">
        <div class="tools-panel">
          <img class="reload btn" v-show="!marckMode" :class="{rotateBtn: waitData}" src="./../assets/reload.svg"  @click="auditUsers" alt="check">
          <img v-show="warning" class="warn" src="./../assets/warning.svg" alt="WARN">
          <OtherBtn class="other"
          @marckMode="marckMode = true"
          ></OtherBtn>
          <MarkTools v-if="marckMode"
          @abortMark="abortMark"
          @fixCheckedUsers="fixCheckedUsers"
          @checkAll="checkAll($event)"
          :checkedCount="checkedCount"
          ></MarkTools>
        </div>
        <li class="user" >
          <div class="number list-head"  >№</div>
          <div class="user-name list-head" >Имя</div>
          <div class="role-block list-head">Роль</div>
        </li>
      </div>
      
      <li class="user"  v-for="user in result" :key="user.iuserID" :class="{loading: waitData}"> 
         <div class="number" > 
          <div v-show="!(marckMode && user.auditResult == false)">{{ result.indexOf(user)+1 }})</div>
          <CheckBox
              v-show="marckMode && user.auditResult == false"
              v-model="user.checked"
              @update:modelValue="newValue => searchText = newValue"
              @change="countCheck"
          ></CheckBox>
         </div>
         <div class="user-name">
          <div>
            <img class="avatar" :src="user.avatar" alt="">
            {{ user.name }}
          </div>  
            <img class="edit" src="./../assets/pencil.svg" @click="showModalEdit(user)" alt="EDIT">
        </div>
         <div class="role-block">
          <div class="role" :class="{hasrole: user.hasRole}"></div>
          <div class="check" >
            <img v-if="user.auditResult == true" src="./../assets/ok.svg" alt="ОК">
            <img v-if="user.auditResult == false" src="./../assets/false.svg" alt="BAD" @click="showModalFix([user])" class="badCheck"> 
            <img v-if="user.auditResult == null" src="./../assets/not.svg" alt="NOT" >          
          </div>
         </div>
        
      </li>
    </ul>

    <ModalFix
    v-show="modalFix.show" 
    :users="modalFix.users"
    @click.self="modalFix.show = false"
    @closeModelaFix="modalFix.show = false"
    @fixUsers="fixUsers"
    ></ModalFix>
    <modalEdit
    v-if="modalEdit.show"
    :user="modalEdit.user"
    @closeModelaEdit="closeModelaEdit"
    @changeNickname="changeNickname"
    ></modalEdit>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UsersList',
  data(){
    return{
      result: [],
      waitData:false,
      marckMode: false,
      warning: false,
      checkedCount: 0,
      modalFix:{
        show: false,
        users:[],
      },
      modalEdit:{
        show: false,
        user:{},
      }
      // guild: '1016758118421626902'
    }
  },
  props: {
    guild: {type: String, default: ''},
    domen: {type: String}
  },
  methods:{
    async changeNickname(event){
    this.waitData = true;
    this.closeModelaEdit();

    let token = sessionStorage.getItem('token');
    
    let data = {
      target: event,
      guild: this.guild
    }

    console.log(data.target)
    if (!token) return
      try{
        let answer = await axios.post(this.domen+'/auth/changeNickname',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        
        this.result.forEach((user) => {
          if (answer.data.userId == user.id){
            user.name = answer.data.nickname
          }
        });
        this.warning = true;
      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
      this.waitData = false;
    },

    closeModelaEdit(){
      this.modalEdit.show = false;
      this.modalEdit.user = {};
    },
    fixCheckedUsers(){
      if (this.checkedCount == 0) return
      let checkedUsers = this.result.filter(user => user.checked);
      this.showModalFix(checkedUsers)

    },
    countCheck(){
      this.checkedCount =
      this.result.reduce((count, user) => {
        if(user.checked) return count+=1;
        return count
      }, 0)
    },
    abortMark(){
      this.result.forEach(user => {
        if (user.checked == true) user.checked = false;
      });
      this.marckMode = false;
      this.countCheck();
    },
    checkAll(checked){
      this.result.forEach(user => {
        if (user.auditResult == false) user.checked = checked;
        this.countCheck()
      })
    },
    showModalEdit(user){
      if (this.waitData == true) return;
      this.modalEdit.show = true;
      this.modalEdit.user = user;
    },
    showModalFix(users){
      if (this.waitData == true) return;
      this.modalFix.show = true;
      this.modalFix.users = users;
    },


    async auditUsers(){
    this.warning = false;
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
        let answer = await axios.post(this.domen+'/auth/auditUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data.sort((a, b) => a.auditResult - b.auditResult); //сортируем по результату проверки

      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
    this.waitData = false;
    },

    async fixUsers(users){
    this.waitData = true;
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    this.modalFix.show = false;
    this.abortMark();
    let data = {
      target: [],
      guild: this.guild
    }
    users.forEach((item) => {
      if (item.auditResult) return;
      let {id, hasRole} = item;
      let user = {id, hasRole}
      data.target.push(user) 
    });
    console.log(data.target)
    if (!token) return
      try{
        let answer = await axios.post(this.domen+'/auth/fixUsers',data,{
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log(answer.data);
        this.result = answer.data.sort((a, b) => a.auditResult - b.auditResult); //сортируем по результату проверки
      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
      this.waitData = false;
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
        let answer = await axios.post(this.domen+'/auth/getUsers',data,{
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
      // this.getUsers();
      this.auditUsers();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit{
  height: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  justify-self: flex-end;
}
.edit:active{
height: 16px;
}
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
  z-index: 1;
}
/* Кнопки */
.tools-panel{
  height: 30px;
  display: flex;
  position: relative;
}
.btn{
  height: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  top:8px
}
.reload{
  left:18px;
}
.warn{
  height: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  top:8px;
  left:36px;
}
.other{
  position: absolute;
  top:8px;
  right: 0;
}
.rotateBtn{
  position: absolute;
  animation: linear rotate 2s infinite;
}
.btn:active {
  height: 16px;
}
.loading{
  opacity: 0.6;
}
.check{
  height: 15px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.badCheck{
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.badCheck:active{
height: 17px;
width: 17px;
}
.number{
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: space-between;
}
.user-name div{
  display: flex;
  align-items: center;
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
