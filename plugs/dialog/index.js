import myDialog from './dialog.vue'
// import Loading from './loading.vue'

export default {
  /**
   * 每个插件都有的install方法，用于安装插件
   * @param {Object} Vue - Vue类
   * @param {Object} [pluginOptions] - 插件安装配置
   */

  install(Vue, pluginOptions = {}){
    // 创建"子类"方便挂载
    const VueDialog=Vue.extend(myDialog);
    let dialog=null;
    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    if(!dialog){
      dialog=new VueDialog();
      // 手动创建一个未挂载的实例
      dialog.$mount();
      // 挂载
      document.body.appendChild(dialog.$el)
    }

    Object.assign(dialog.$data, pluginOptions);

    function $dialog() {
      return new Promise((resolve, reject)=>{
        dialog.show = true;
        //下面就有一些技巧了，这里替换了两个按钮点击的方法，并且保存，当执行的时候其实是执行之前的方法，并且加了一些方法进去
        let confirmBtn = dialog.confirmBtn;
        let cancelBtn = dialog.cancelBtn;
        dialog.confirmBtn = () => {
          resolve();
          confirmBtn();
        }
        dialog.cancelBtn = () => {
          reject();
          cancelBtn();
        }
      });

    }

    Vue.$dialog = Vue.prototype.$dialog = $dialog;

  }
}
