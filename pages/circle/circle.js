// pages/dp/dp.js
var likeclick = 0;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    inputBoxShow: false,
    isScroll: true,

    circleList:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://47.108.215.55:8080/getCircle',
      method:"GET",
      success: function (result){
        wx.request({
          url: 'http://47.108.215.55:8080/getCircle',  
          method:"GET",
          success: function (result){
       
             var datas= result.data.data;
            
             console.log(datas);
            
             that.setData({
              circleList:result.data.data
             })

          }
        })
      }
    })
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

  }, 
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  changeinputBoxShow:function(){
    this.setData({inputBoxShow:true});
  },
  showInputBox: function () {
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
    },
    invisible: function(){
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
    },
    issue:function(){
      wx.navigateTo({
        url: '/pages/issue/issue',
      })
    },
    clicklike:function(){
      if(likeclick == 0){
        likeclick = 1,
        this.setData({
          likepath:"/image/liked.png",
        })
      }else if(likeclick == 1){
        likeclick = 0,
        this.setData({
         likepath:"/image/like.png",
        })
      }
    }
})