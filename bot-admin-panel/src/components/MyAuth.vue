<template>
<div class="auth-wrap">
    <div class="logo">
        Boterator
    </div>
    <div class="title">
        Авторизация
    </div>
    <img class="user-img" src="./../assets/Boter.png" alt="User">
    <a class="btn" @click="getData"  :href="`${authLink} `">Войти с Discord</a>

</div>
</template>
<script>
    export default {
        name: 'MyAuth',
        data(){
            return {
            
                }
        },
        props: {
            authLink: {Type: String},
        },
        methods:{
        
        },

        mounted(){
        
        }

}
</script>
<style scoped>
.user-img{
  margin-top: 90px;
  height: 90px;

  object-fit:contain;
  
}

.btn {
  appearance: none;
  text-decoration: none;
  border: 0;
  border-radius: 5px;
  background: #5865f2;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  width: 180px;
  margin-top: 100px;
  transition: 0.2s ease;
}
.btn:hover {
  background: rgb(57, 69, 159);
  color: #e2e2e2;
}

.btn:focus {
  outline: none;
  background: rgb(42, 50, 111);
  color: #c4c4c4;
}
.logo{
  font-size: 32px;
  color: #b9a5fd;
  margin-top: 32px;
}
.title{
  font-size: 18px;
  color: #ffffff;
  margin-top: 32px;
}
.auth-wrap{
    height: 500px;
    width: 300px;
    background-color: #1E1E23;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    box-shadow: 3px 3px 10px #000000;
}

</style>