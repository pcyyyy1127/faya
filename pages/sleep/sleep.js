// pages/sleep.js
var util = require('../../utils/util.js');
var playclick = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isiamge:true,
   hour:12,
   remindyaya:"lalala",
   playsrcpath:"/image/play.png",
   sleepcontents:"不管这一天有多难过，记得认真卸妆、洗脸、冲澡，吹干头发，安安稳稳钻进被窝；床就像一个胶囊，时光‘咻’一下，就带你到一个明亮的早晨了。",
  },
  playmusic:function(){
      if(playclick == 0){
        playclick = 1,
        this.setData({
          playsrcpath:"/image/played.png",
        })
      }else if(playclick == 1){
        playclick = 0,
        this.setData({
          playsrcpath:"/image/play.png",
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hour = util.formatTime2(new Date());
    var str = "";
      if(hour>=23||hour<=5){
        str = "夜深了，该对芽芽说晚安咯！";
      }else{
         str = "又是活力满满的一天哟，今天要开心呀!";
      }
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      hour: hour,
      remindyaya:str,
    });
   console.log(hour);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})