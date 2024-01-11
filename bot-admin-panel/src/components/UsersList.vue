<template>
  <div class="wrap">

    <ul class="list-users">
      <div class="top-list">
        <div class="tools-panel">
          <img class="reload btn" v-show="!marckMode" :class="{rotateBtn: waitData}" src="./../assets/reload.svg"  @click="auditUsers" alt="check" >
          <OtherBtn class="other"
          @marckMode="marckMode = true"
          ></OtherBtn>
          <div class="markTools" v-show="marckMode">
            <div class="all-check markTools-item">
                <div class="check-box">
                <input type="checkbox" @change="checkAll($event.target.checked)">
                <span>✔</span>
              </div>
          </div>
          <div class="fix-count markTools-item">
            {{ checkedCount }}
          </div>
          <div class="fix-all markTools-item">
            <img  src="./../assets/fix.svg"   alt="fix" >
            Исправить</div>
          <div class="checked-abort markTools-item" @click="abortMark">
            <img  src="./../assets/abort.svg"   alt="abort" >
            Отмена</div>
          </div>
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
          <div class="check-box" v-show="marckMode && user.auditResult == false">
              <input type="checkbox" v-model="user.checked" @change="countCheck">
              <span>✔</span>
          </div>
         </div>
         <div class="user-name">

            <img class="avatar" :src="user.avatar" alt="">
            {{ user.name }}
        </div>
         <div class="role-block">
          <div class="role" :class="{hasrole: user.hasRole}"></div>
          <div class="check" >
            <img v-if="user.auditResult == true" src="./../assets/ok.svg" alt="ОК">
            <img v-if="user.auditResult == false" src="./../assets/false.svg" alt="BAD" @click="showModalFix(user)" class="badCheck"> 
            <img v-if="user.auditResult == null" src="./../assets/not.svg" alt="NOT" >          
          </div>
         </div>
        
      </li>
    </ul>

    <ModalFix
    v-show="modalFix.show" 
    :user="modalFix.user"
    @click.self="modalFix.show = false"
    @closeModelaFix="modalFix.show = false"
    @fixUsers="fixUsers"
    ></ModalFix>

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
      checkedCount: 0,
      modalFix:{
        show: false,
        user:{},
      },
      // guild: '1016758118421626902'
    }
  },
  props: {
    guild: {type: String, default: ''},
    domen: {type: String}
  },
  methods:{
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
    showModalFix(user){
      if (this.waitData == true) return;
      this.modalFix.show = true;
      this.modalFix.user = user;
    },

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
      this.getUsers();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markTools{
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 85%;
  top:8px;
  left: 18px;;
}
.markTools-item{
  margin-right: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.all-check{

}
.checked-abort img{
  height: 18px;
  transform: translate(-5px, 0px);
}
.fix-all img{
  height: 18px;
  transform: translate(0px, -3px);
}
.check-box{
  color: rgb(255, 255, 255);
  position: relative;
  /* top:8px;
  left: 18px; */
  border: #c1c1c1 2px solid;
  border-radius: 4px;
  height: 12px;
  width: 12px;
  overflow: hidden;
}
.check-box input{
  position: relative;
  opacity: 0;
  z-index: 102;
}
.check-box span {
  width: 100%;
  position: absolute;
  top:-4px;
  left: 0;
  font-size: 14px;
  background-color: #b9a5fd;
  display: none;
}
.check-box input:checked ~ span{
  display: block;
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
