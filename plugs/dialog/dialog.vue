<template>
  <div class="dialog" v-show="show">
    <div class="content">
        <p class="text"></p>
        <div>
          <button class="confirm" @click="confirmBtn">确认</button>
          <button class="cancel" @click="cancelBtn">取消</button>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        show:false,//是否显示
        content:'',//传入的内容
        confirm:'',//确认按钮
        cancel:'' //取消按钮
      }
    },
    methods:{
      confirmBtn(){
        console.log('点击确认按钮');
        this.show=false;

      },
      cancelBtn(){
        console.log('点击取消按钮');
        this.show=false;
      }
    }
  }

</script>
<style scoped lang="scss">
  .dialog{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(10, 43, 58, 0.7);
    z-index: 500;
  }

  .content{
    position: absolute;
    width: 3.1rem;
    padding-bottom:0.2rem;
    top: 50%;
    left: 50%;
    color: #555;
    background-color: #FEDD89;
    transform: translate(-50%, -50%) scale(1, 1);
  }


</style>
