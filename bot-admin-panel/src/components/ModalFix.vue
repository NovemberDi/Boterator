<template>
    <div class="ModalFix-wrap" @click.self="closeModal">
        <div class="modal" >
            <p class="question">Исправить пользователей: ({{ users.length }})</p>
            <div class="users">
                <div  v-for="user in users" :key="user.iuserID">{{ user.name||'Noname' }}</div>
            </div>
            <div class="answer">
                <div class="apply btn" @click="fixUsers">Ок</div>
                <div class="abort btn" @click="closeModal">Отмена</div>
            </div>
        </div>

        
    </div>
</template>

<script>
    export default {
        name: 'ModalFix',
        props:{
            users:{type:Object},
            
        },
        methods:{
            fixUsers(){
                this.$emit('fixUsers', [...this.users])
            },
            closeModal(){
                this.$emit('closeModelaFix')
            }
        }
    }
</script>

<style scoped>
.users{
  list-style-type: none;
  height: max-content;
  max-height: 65vh;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  padding: 8px 0;
}
.users::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.users::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color:#9d9d9d;
}

.users::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 8px;
  background-color: #20202000;
}



.ModalFix-wrap{
    background-color:#b9a5fd1e;
    color: #2b2b2c;
    position:absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10;
}
.modal{
    height: fit-content;
    width: 350px;
    background-color: white;
    border-radius: 8px;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);   
}
.question{
    margin-top: 20px;
}
.answer{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.btn{
    margin: 8px;
    height: 28px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}
.apply{
    background-color:#58b942;
}
.apply:active{
    background-color:#418431;
    color: #d5d5d5;
}
.abort{
    background-color: rgb(224, 50, 50);
}
.abort:active{
    background-color: rgb(181, 48, 48);
    color: #d5d5d5;
}
</style>