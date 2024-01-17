<template>
          <div class="check-box" id="check-box">
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
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  justify-self: flex-end;

}
.check-box input{
  cursor: pointer;
  position: absolute;
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
  display: none;
}
.check-box:has(input:checked)  {
  background-color: #b9a5fd;
  
}
.check-box input:checked ~ span{
  display: block;
}

</style>