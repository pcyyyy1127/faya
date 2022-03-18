Page({
  data: {
  inputBoxShow: true,
  isScroll: true,
  },
  showInputBox: function () {
  this.setData({ inputBoxShow: true });
  this.setData({ isScroll: false });
  },
  invisible: function(){
  this.setData({ inputBoxShow: false });
  this.setData({ isScroll: true });
  }
  })