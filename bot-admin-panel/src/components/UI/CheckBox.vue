<template>
          <div class="check-box" >
              <input type="checkbox" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)" >
              <!-- @change="$emit('change', $event.target.checked)" -->
              <span>✔</span>
          </div>
</template>

<script>
    export default {
        name: "CheckBox",
        props: ['modelValue'],
        emits: ['update:modelValue']
}
    
</script>

<style scoped>
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
  cursor: pointer;
}
.check-box input{
  cursor: pointer;
  position: absolute;
  background-color: aquamarine;
  top: -5px;
  left:-5px;
  opacity: 0;
  height: 22px;
  width: 22px;
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