<template>
    <div class="ModalEdit-wrap" @click.self="closeModal">
        <div class="modal" >
            <p class="question">Изменить никнейм:</p>
            <div class="users">
                {{ user.name||'Noname' }}
                <input class="input-nickname" type="text" v-model="newNickname" placeholder="Новый никнейм">
            </div>
            <div class="answer">
                <div class="apply btn" @click="changeNickname">Ок</div>
                <div class="abort btn" @click="closeModal">Отмена</div>
            </div>
        </div>

        
    </div>
</template>

<script>
    export default {
        name: 'ModalEdit',
        data(){
            return{
                newNickname:''
            }
        },
        props:{
            user:{type:Object},
            
        },
        methods:{
            changeNickname(){
                let target = {
                    newNickname: this.newNickname,
                    id: this.user.id
                }
                this.$emit('changeNickname', target)
            },
            closeModal(){
                this.$emit('closeModelaEdit')
            }
        },
        mounted(){
            this.newNickname = this.user.name
        }
    }
</script>

<style scoped>
.input-nickname {
      display: block;
      width: 70%;
      height: 18px;
      padding: 0.375rem 0.75rem;
      margin: 8px 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #373f47;
      background-color: #fff;
      border: 1px solid #bdbdbd;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .input-nickname::placeholder {
      color: #212529;
      opacity: 0.4;
    }

    .input-nickname:focus {
      color: #212529;
      background-color: #fff;
      border-color: #bdbdbd;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
    }

    .input-nickname:disabled,
    .input-nickname[readonly] {
      background-color: #f5f5f5;
      opacity: 1;
    }


.users{
  list-style-type: none;
  height: max-content;
  max-height: 65vh;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ModalEdit-wrap{
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