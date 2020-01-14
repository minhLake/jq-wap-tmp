var EventUtil = {

  // 添加事件监听
  add: function (element, type, callback, extend) {
    extend = !!extend ? extend : false;
    if (element.addEventListener) {
      element.addEventListener(type, callback, extend);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, callback);
    } else {
      element['on' + type] = callback;
    }
  },

  // 移除事件监听
  remove: function (element, type, callback, extend) {
    extend = !!extend ? extend : false;
    if (element.removeEventListener) {
      element.removeEventListener(type, callback, extend);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, callback);
    } else {
      element['on' + type] = null;
    }
  },

  // 跨浏览器获取 event 对象
  getEvent: function (event) {
    return event ? event : window.event;
  },

  // 跨浏览器获取 target 属性
  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  //  阻止事件的默认行为
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  // 阻止事件流或使用 cancelBubble
  stopPropagation: function () {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

};