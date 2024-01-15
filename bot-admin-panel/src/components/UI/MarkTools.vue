<template>
          <div class="markTools" >
            <div class="all-check markTools-item">
                <CheckBox @change="$emit('checkAll', $event.target.checked)"></CheckBox>
          </div>
          <div class="fix-count markTools-item">
            {{ checkedCount }}
          </div>
          <div class="fix-all markTools-item" @click="$emit('fixCheckedUsers')">
            <img  src="./../../assets/fix.svg"   alt="fix" >
            Исправить</div>
          <div class="checked-abort markTools-item" @click="$emit('abortMark')" >
            <img  src="./../../assets/abort.svg"   alt="abort" >
            Отмена</div>
          </div>
</template>

<script>
    export default {
        name: 'MarkTools',
        props:{
            checkedCount:Number
        }
    }
</script>

<style scoped>
.markTools{
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 85%;
  top:8px;
  left: 18px;
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
</style>