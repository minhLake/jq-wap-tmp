$(function() {
  // 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
  var miniRefresh = new MiniRefresh({
    container: "#minirefresh",
    down: {
      callback: function() {
        // 下拉事件
        downData();
      }
    },
    up: {
      callback: function() {
        // 上拉事件
        upData();
      }
    }
  });
  function upData() {
    $.ajax({
      type: "GET",
      url: "json/cart.json",
      dataType: "json",
      success: function(data) {
        console.log(data);
        
        // 结束上拉加载
        // 参数为true代表没有更多数据，否则接下来可以继续加载
        miniRefresh.endUpLoading(true);
      },
      error: function(xhr, type) {
        console.log("Ajax error!");
        // 结束上拉加载
        // 参数为true代表没有更多数据，否则接下来可以继续加载
        miniRefresh.endUpLoading(true);
      }
    });
  }
  function downData() {
    $.ajax({
      type: "GET",
      url: "json/cart.json",
      dataType: "json",
      success: function(data) {
        console.log(data);
        
        // 结束下拉刷新
        miniRefresh.endDownLoading();
      },
      error: function(xhr, type) {
        console.log("Ajax error!");
        // 结束下拉刷新
        miniRefresh.endDownLoading();
      }
    });
  }
});
