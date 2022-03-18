// pages/enroll/enroll.js


let app = getApp()
let store = app.store




Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },
  login: function (e) {
    var that = this;
    if (that.data.username == "") {
      wx.showModal({
        title: '提示',
        showCancel: true,
        content: '请输入用户名',
        success(res) {}
      })
    } 
     else if (that.data.password == "") {
      wx.showModal({
        title: '提示',
        showCancel: true,
        content: '请输入密码',
        success(res) {}
      })
    }  else {
      wx.request({
        url:'http://47.108.215.55:8080/doctorLogin', 
        data: {
          username: that.data.username,
          password: that.data.password,
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success:function (result) {
             
          console.log(result);

         if(result.data.status=="success"){

          getApp().globalData.doctorInfo=result.data.data;
          getApp().globalData.accid=result.data.data.accid;
          getApp().globalData.imToken=result.data.data.imToken;
          wx.reLaunch({
            url: '../doctorRecentChat/doctorRecentChat',
           
          })
        }
        else{
          wx.showModal({
            title: '提示',
            showCancel: true,
            content: result.data.data.errorMsg,
            
          })
        }

          
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '网络不在状态',
            success(res) {}
          })
        }
      })
    }
  },



  usernameInput: function (e) {
    this.data.username = e.detail.value;
  },



  passwordInput: function (e) {
    this.data.password = e.detail.value;

  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.nim.destroy({
      done: function () {
        console.log('destroy nim done !!!')
        wx.clearStorage()
       
      
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

  }
})