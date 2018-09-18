/**
 * 自定义 提示框( Toast )组件
 */

// import './toast.css'


var Toast = {};
var showToast = false, // 存储toast显示状态
  showLoad = false, // 存储loading显示状态
  toastVM = null, // 存储toast vm
  loadNode = null; // 存储loading节点元素

Toast.install = function (Vue, options) {
  // 参数
  var opt = {
    defaultType: 'bottom',
    duration: '2500',
    wordWrap: false
  };
  for (var property in options) {
    opt[property] = options[property];
  }

  Vue.prototype.$toast = function (tips, type) {

    var curType = type ? type : opt.defaultType;
    var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
    var tmp = '<div v-show="show" :class="type" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}' +
      '<p>您获得的奖励是</p>' +
      '</div>';

    if (showToast) {
      // 如果toast还在，则不再执行
      return;
    }
    if (!toastVM) {
      var toastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      });
      toastVM = new toastTpl()
      var tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }
    toastVM.type = 'lx-toast-' + curType;
    toastVM.tip = tips;
    toastVM.show = showToast = true;

    setTimeout(function () {
      toastVM.show = showToast = false;
    }, opt.duration)
  };

  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tips) {
      return Vue.prototype.$toast(tips, type)
    }
  });

  Vue.prototype.$loading = function (tips, type) {
    if (type == 'close') {
      // let el=document.querySelector('lx-load-mark');
      loadNode.show = showLoad = false;
      // document.body.removeChild(el);
    } else {
      if (showLoad) {
        // 如果loading还在，则不再执行
        return;
      }else{
        var loadTpl = Vue.extend({
          data: function () {
            return {
              show: showLoad
            }
          },
          template: '<div v-show="show" class="lx-load-mark">' +
          '<div class="lx-load-box">' +
          '<div class="lx-loading">' +
          '</div>' +
          '</div>'+
          '</div>'
        });
        loadNode = new loadTpl();
        var tpl = loadNode.$mount().$el;

        document.body.appendChild(tpl);
        loadNode.show = showLoad = true;
      }
    }
  };




  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tips) {
      return Vue.prototype.$loading(tips, type)
    }
  });
}

// 向外暴露接口
module.exports = Toast;
