<template>
  
    <div class="other-wrap">
      <div class="closer" v-show="opened" @click.self="opened = false"></div> 

        <img class="other-btn"  src="./../../assets/other.svg"   alt="other"  @click="opened = !opened">
          <div class="other-down" v-show="opened">

            <div class="other-item" @click="marck">Отметить</div>
            
          </div>
          
    </div>
</template>

<script>
    export default {
        name:'OtherBtn',
        data(){
          return{
            opened: false,
          }
        },
        methods:{
          marck(){
            this.opened = false;
            this.$emit('marckMode')
          }
        }
    }
</script>

<style scoped>
.closer{
  position: fixed;
  height: 100vh;
  width: 100vW;
  top: 0;
  left: 0;
  /* z-index: 0; */
}
.other-wrap{
position: absolute;
}
.other-btn{
  position: relative;
  height: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.other-down{
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(0, 108%);
  background-color: #ffffff;
  color: #2b2b2c;
  box-shadow: -2px 2px 3px #0000005b;
  height: fit-content;
  width: fit-content;
  min-height: 40px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.other-item{
  cursor: pointer;  
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.other-item:active{
  font-size: 15px;
}
</style>