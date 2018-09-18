<template>
    <div class="loadings" v-show="isShow">
      <img class="img" src="./loading.svg" alt="">
    </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        isShow: false,
        hasAnimate: true,
      }
    },
    computed: {
      /**
       * 动画效果样式，没有返回空
       * @return {String} 样式
       */
      animateName() {
        return this.hasAnimate ? 'opacity' : ''
      },
    },
    methods: {
      /**
       * 开启动画效果
       */
      opemAnimate() {
        this.hasAnimate = true
      },
      /**
       * 去除动画效果
       * @return {Promise} 返回promise
       */
      removeAnimate() {
        return new Promise((resolve) => {
          this.hasAnimate = false
          resolve()
        })
      },
      /**
       * 显示动画loading
       */
      show() {
        this.isShow = true
      },
      /**
       * 隐藏动画loading
       */
      hide() {
        this.isShow = false
      },
    },
  }
</script>

<style lang="scss"  scope>

  .loadings{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: red;*/
    .img{
      position: absolute;
      width: 100px;
      height: 100px;
      top: 50%;
      left: 50%;
      margin-top:-50px;
      margin-left:-50px;
    }
  }
</style>
