/**
 * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
 * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 依次增大；
 * 限制当为设备宽度大于768(iPad)之后，font-size不再继续增大
 * scale 为meta viewport中的缩放大小
 */
(function (doc, win) {
  var docEl = win.document.documentElement;
  var resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  /**
    * ================================================
    *   设置根元素font-size
    * 当设备宽度为375(iPhone6)时，根元素font-size=16px; 
    × ================================================
    */
  var refreshRem = function () {
    var clientWidth =
      win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;

    if (!clientWidth) return;
    var fz;
    var width = clientWidth;
    fz = (16 * width) / 375;
    docEl.style.fontSize = fz + "px";
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener("DOMContentLoaded", refreshRem, false);
  refreshRem();
})(document, window);
/**
 * 获取指定的URL参数值
 * 参数：paramName URL参数
 * 调用方法: getURLParameters()
 * 返回值:tyler
 */
function getURLParameters(url) {
  // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  // 用来存储我们所有的参数
  var obj = {};
  // 如果没有传参，返回一个空对象
  if (!queryString) {
    return obj;
  }
  // stuff after # is not part of query string, so get rid of it
  queryString = queryString.split('#')[0];
  // 将参数分成数组
  var arr = queryString.split('&');
  for (var i = 0; i < arr.length; i++) {
    // 分离成key:value的形式
    var a = arr[i].split('=');
    // 将undefined标记为true
    var paramName = a[0];
    var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
    // 如果调用对象时要求大小写区分，可删除这两行代码
    paramName = paramName.toLowerCase();
    if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
    // 如果paramName以方括号结束, e.g. colors[] or colors[2]
    if (paramName.match(/\[(\d+)?\]$/)) {
      // 如果paramName不存在，则创建key
      var key = paramName.replace(/\[(\d+)?\]/, '');
      if (!obj[key]) obj[key] = [];
      // 如果是索引数组 e.g. colors[2]
      if (paramName.match(/\[\d+\]$/)) {
        // 获取索引值并在对应的位置添加值
        var index = /\[(\d+)\]/.exec(paramName)[1];
        obj[key][index] = paramValue;
      } else {
        // 如果是其它的类型，也放到数组中
        obj[key].push(paramValue);
      }
    } else {
      // 处理字符串类型
      if (!obj[paramName]) {
        // 如果如果paramName不存在，则创建对象的属性
        obj[paramName] = paramValue;
      } else if (obj[paramName] && typeof obj[paramName] === 'string') {
        // 如果属性存在，并且是个字符串，那么就转换为数组
        obj[paramName] = [obj[paramName]];
        obj[paramName].push(paramValue);
      } else {
        // 如果是其它的类型，还是往数组里丢
        obj[paramName].push(paramValue);
      }
    }
  }
  return obj;
}


/**
 * header
 */
$(function () {
  $("header > img.arrow").on({
    click: function () {
      history.back(-1);
    }
  });
  $("header #toHome").on({
    click: function () {
      window.location.href = "./index.html";
    }
  });
  $("header #toCart").on({
    click: function () {
      window.location.href = "./cart.html";
    }
  });
});
/**
 * main
 */
$(function () {
  var H = window.screen.height;
  var settlement = $(".settlement").height() || 0;
  var hearder_H = $("header").height() || 0;
  var footer_H = $("footer").height() || 0;
  var rem = parseFloat($("html").css("font-size"));

  $("main").css({
    marginTop: (hearder_H + 1) / rem + "rem",
    marginBottom: (footer_H + settlement + 1) / rem + "rem",
    minHeight: (H - (hearder_H + 1 + (footer_H + settlement + 1))) / rem + "rem"
  });
});
/**
 * footer
 */
$(function () {
  $("footer > div").on({
    click: function () {
      var type = $(this).data("type");
      if (type) {
        var url = "./" + type + ".html";
        window.location.href = url;
      }
    }
  });
});
/**
 * 弹窗
 */
$(function () {
  $(".m-layer-close").on({
    click: function () {
      $(this)
        .parents(".m-layer")
        .hide();
    }
  });
});
