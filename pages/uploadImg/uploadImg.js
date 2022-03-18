// pages/uploadImg/uploadImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   sourcess:[],
  },

  uploadimg: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 3, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，批量添加的话，就是一个图片地址数组
        var tempFilePaths = res.tempFilePaths
        wx.setStorageSync('tempFilePaths', res.tempFilePaths)
          that.setData({
            sourcess: res.tempFilePaths  //这个用于展示添加的图片，并非服务器图片地址
          })

 
//添加图片后，会弹窗提示，确认是否上传

        wx.showModal({
          title: '提示',
          content: '确认上传这些吗',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              var tempFilePaths = wx.getStorageSync('tempFilePaths')
              var sources = [];

//循环将添加的图片上传到服务器
              for (var i = 0; i < tempFilePaths.length; i++) {
                wx.showToast({
                  title: '正在上传中',
                  icon: 'loading',
                  duration: 15000
                })

                wx.uploadFile({
                  url: 'https://你的服务器地址/imgupload.php?imgpath=userimg',
                  filePath: tempFilePaths[i],
                  name: 'file',
                  success: function (res) {
                    wx.hideToast();
                    console.log(res.data)
                    if (res.data !== "上传错误") {
                      sources.push(res.data)
                      //前台显示
                      that.setData({
                        sources: sources
                      })
                      console.log(sources)
                    }
                  }
                })

              }

            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                sourcess: "",
              })
            }
          }
        })
      }
    })
  },
})