// pages/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   content:"",
   location:"四川成都温江",
   sourcess:[],
   image1:"",
   image2:"",
   image3:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  uploadImage:function(e){
     
    var that = this;
 
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {

        wx.showToast({
          title: '正在上传中',
          icon: 'loading',
          duration: 1500
        })

        var tempFilePaths = res.tempFilePaths
        wx.setStorageSync('tempFilePaths', res.tempFilePaths)
          that.setData({
            image1:"",
            image2:"",
            image3:"",
            sourcess: res.tempFilePaths  //这个用于展示添加的图片，并非服务器图片地址
          })
          
          
          var tempFilePaths = wx.getStorageSync('tempFilePaths')
            
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image1:'data:image/png;base64,' + res.data,
              })
            }
          })

          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[1], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image2:'data:image/png;base64,' + res.data,
              })

            }
          })

          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[2], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              that.setData({
                image3:'data:image/png;base64,' + res.data,
              })

            }
          })


     
        }

  })
   


  },

  contentInput: function (e) {
    this.data.content = e.detail.value;
  },

  send:function(e){
    var that=this;
    wx.request({
      url:'http://47.108.215.55:8080/sendIssue', 
      data: {
        token: getApp().globalData.token,
        content: that.data.content,
        location: that.data.location,
        nickName: getApp().globalData.userInfo.nickName,
        avatarUrl: getApp().globalData.userInfo.avatarUrl,
        image1: that.data.image1,
        image2: that.data.image2,
        image3: that.data.image3,

      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success:function (result) {
        console.log(result);
       if(result.data.status=="success"){
        wx.showModal({
          title: '提示',
          showCancel: true,
          content: "发送成功",
          success: function(res) {
            if (res.cancel) {
              //点击取消
              console.log("您点击了取消")
              wx.reLaunch({
                url: '/pages/circle/circle',
              })
            } else if(res.confirm){
              //点击确定
              console.log("您点击了确定")
              
              wx.reLaunch({
                url: '/pages/circle/circle',
              })
            }

          }


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
})