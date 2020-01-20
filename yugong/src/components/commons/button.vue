<template>
  <div class="btn" :class="[size==1?'large':size==2?'middle':'small']" @click="ck">{{text}}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "提交"
    },
    size: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {};
  },
  methods:{
      ck(){
          this.$emit("click")
      }
  }
};
</script>

<style scoped>
.btn{
  color: #fff;  
  height: 1.07rem;
  border-radius:20px;
  background: #157FCA;
  font-size: 16px;
  text-align: center;
  line-height: 1.07rem;
  cursor: pointer;
}
.large{
  margin: 30px auto; 
  width: 9.07rem;
}
.small{
  margin: 10px auto 30px; 
  width: 5.6rem;
}
</style>