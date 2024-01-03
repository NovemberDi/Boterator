<template>
      <header >
        <div class="logo">Boterator</div>
          <nav class="nav-mobile" role="navigation" >
            <div id="menuToggle">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <div id="menu">
              <ul >
                <li><a class="a-mobile" href="#">Главная</a></li>
                <li><a class="a-mobile" href="#">Участники</a></li>
                <li><a class="a-mobile" href="#">Команды</a></li>
              </ul>
            </div>
           </div>
          </nav>
          <nav class="nav-desktop" >
              <ul class="menu-desktop">
                <li><a class="a-desktop" href="#">Главная</a></li>
                <li><a class="a-desktop" href="#">Участники</a></li>
                <li><a class="a-desktop" href="#">Команды</a></li>
              </ul>
          </nav>
          <div class="user dropdown" >
            <p class="arrow">‹</p>
            <p>{{adminData.username ||'user'}}</p>
            <img class="user-img" :src=" adminData.avatar || defaultImg" alt="User">
            <div class="dropdown-content" @click="this.$emit('logout')">
             Выйти
            </div>
          
          </div> 
      </header>
</template>
<script> 
import axios from 'axios';
export default {
  name: 'MyHeader',
  data(){
      return {
        mobile: true,
        adminData: '',
        defaultImg: require('@/assets/user.jpg'),
             }
  },
  props: {
    username: {Type: String},
    domen: {type: String}
  },
  methods:{
    // async getImage(){
    // console.log('ждем')
    // let token = sessionStorage.getItem('token');
    // console.log(token)
    // if (!token) return
    //   try{
    //     let answer = await axios.get('http://85.193.80.63:53134//auth/adminImage',{
    //       headers: {
    //         Authorization: 'Bearer ' + token
    //       },
    //       responseType: 'blob'
    //     });
    //     // console.log(typeof( answer.data));
    //     let url = window.URL.createObjectURL(answer.data);
    //     this.imageUrl = url;
    //   }catch(err){
    //     console.log(err.response.status)
    //     if (err.response.status == 403) this.$emit('logout')
    //   }
    // },
    async getData(){
    console.log('ждем')
    let token = sessionStorage.getItem('token');
    console.log(token)
    if (!token) return
      try{
        let answer = await axios.get(this.domen+'/auth/adminData',{
          headers: {
            Authorization: 'Bearer ' + token
          }});
        console.log(answer.data);
        
        this.adminData = answer.data
        this.$emit('setGuild', answer.data.guilds[0].guildID)
      }catch(err){
        console.log(err.response.status)
        if (err.response.status == 403) this.$emit('logout')
      }
    },

  },
 

  mounted(){
    this.getData();
  }

}
</script>
<style scoped>
.arrow{
  transform: rotate(-90deg);
  margin-right: 10px;
  transition: cubic-bezier(0.215, 0.610, 0.355, 1) 200ms;
  color: #b9a5fd;
  font-size: 18px;
}
  .dropdown-content {
    display: none;
    position: absolute;
    color: #b9a5fd;
    background-color: #1E1E23;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    bottom: 0;
    right: 0;
    z-index: 1;
    transform: translate(0,100%);
    padding: 8px;
  }
  .dropdown-content:hover {
color:#F5F6FA;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown:hover .arrow {
    transform: rotate(90deg);
  }





header{
  display: flex;
  background-color: #1E1E23;
  height: 65px;
  width: 100%;
  position: relative;
  justify-content: left;
  align-items:flex-end;
}
.logo{
  font-size: 24px;
  margin-left: 80px;
  color: #b9a5fd;
  margin-bottom:18px;
  cursor: default;
}
.user{
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;  

  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.user-img{
  margin: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover
}


a {
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  transition: 200ms;
}
a:hover {
  opacity:0.5;
}
.a-mobile{
  color: #1E1E23;
}
.a-desktop{
  color: #ffffff;
}
ul {
  padding: 0;
  list-style-type: none;
}
.menu-desktop{
  display: flex;
}
.nav-desktop{
    margin-bottom:18px;
}
.menu-desktop li{
  margin-left: 28px;
} 
.nav-mobile{
  position: absolute;
  top:0
}


#menuToggle {

  display: flex;
  flex-direction: column;
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 1;
  width: 0;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  
}

#menuToggle input
{
  display: flex;
  width: 40px;
  height: 32px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

#menuToggle span
{
  display: flex;
  width: 29px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  background: #ffffff;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 5px 0px;
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-3px, -1px);
  background: #36383F;
}
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

#menu
{
  position: absolute;
  width: 250px;
  height: 100vh;
  box-shadow: 0 0 10px #85888C;
  top:-25px;
  left: -25px;
  background-color: #F5F6FA;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu ul li
{
  padding: 10px 0;
  transition-delay: 2s;
}
#menu ul
{
margin-top: 60px;
}
#menuToggle input:checked ~ #menu
{
  transform: none;
}

@media screen and (max-width: 801px){
.nav-desktop{
  display: none;
}
}
@media screen and (min-width: 801px){
.nav-mobile{
  display: none;
}

}

</style>