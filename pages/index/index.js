//index.js
//获取应用实例
const app = getApp()

let store = app.store


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  

  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  doLogin :function(e){
    var that=this;
    var app = getApp();
      wx.getUserProfile({
        desc: '申请使用你的微信头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.globalData.userInfo= res.userInfo
          console.log(app.globalData);

          wx.login({
            success: function(res){
                console.log(res)
                //获取登录临时凭证
                var code = res.code;
                console.log(code);
                //调用后端接口 获取微信的session_key 和 openID
                wx.request({
                  url: 'http://47.108.215.55:8080/wxLogin',
                  data: {
                    "code":code,
                    "nickName": getApp().globalData.userInfo.nickName,
                    "avatar": getApp().globalData.userInfo.avatarUrl,
                  },
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method:"POST",
                  success: function (result){
                    console.log(result);
                    app.globalData.token=result.data.data.openId;
                    app.globalData.accid=result.data.data.accid;
                    app.globalData.imToken=result.data.data.imToken;
                    if(result.data.status=="success"){
                      wx.switchTab({
                        url: '../home/home',
                      })
                    }else{
                      wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '登录失败',
                      })
                    }
                  
                  }
                  
                 
                  
      
                })
            }
          })  

        }
      })
   
     
   
    },

 

    doctorLogin:function(){
      wx.navigateTo({
        url: '../login/login',
      })
    }

    
  
})
