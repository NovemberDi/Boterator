<template>
    <div class="ModalFix-wrap">
        <div class="modal" >
            <p class="question">Исправить пользователей:</p>
            <div>
                <div>{{ user.name||'Noname' }}</div>
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
            user:{type:Object, default: {name:'Пользователь'}},
            
        },
        methods:{
            fixUsers(){
                this.$emit('fixUsers', [this.user])
            },
            closeModal(){
                this.$emit('closeModelaFix')
            }
        }
    }
</script>

<style scoped>
.ModalFix-wrap{
    background-color:#b9a5fd1e;
    color: #2b2b2c;
    position:absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
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
    margin-bottom: 20px;
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