// pages/inquriy/inquriy.js
const app = getApp()

let store = app.store
import IMController from '../../controller/im.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
     showdata:[
      /*{
        id:"",
       name:"",
       department:"",
       title:"",
       hospital:"",
       skill:"",
       face_url:"",
       like:"0",
       account:"",
      },*/
     
  ],
  ask_id:"",
  money:"50",
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

  /*监听单选框的函数*/
  listenCheckboxChange:function(e){
    console.log(e.detail.value);
    this.setData({
     account:e.detail.value
    })
  },

  /*按钮绑定的提问函数 */
  ask:function(){
    var ask=this.data.account;

    var that=this;
    if(ask==""||ask==null){
      console.log("未选中医生");
      wx.showModal({
        title: '提示',
        content: '必须选择一个医生或者使用系统指派医生才能提问哦',
        success (res) {
            
        }
      })
      return;
    }
    //随机指派医生
    else if(ask==-1){

    }
     else{
      wx.showModal({
        title: '提示',
        content: '提问将花费2元，是否确认提问',
        success (res) {
        
          if (res.confirm) {
         that.zixun(ask);
          } else if (res.cancel) {
           
          }
        }
      })
     }

   
    
  },
  //关注函数
  like:function(e){
    //医生id
     var likeId=e.currentTarget.id;
     //数组下标
     const index=e.currentTarget.dataset.index;
      var str="showdata["+index+"].like";
       if(this.data.showdata[index].like=="0"){
       this.setData({
        [str]:"1"
       })
      
      }
      else{
        this.setData({
          [str]:"0"
         })
      }

       //发送http请求请求后端 修改关注
  },
  onLoad: function () {
   
    var that=this;
    wx.request({
      url: 'http://47.108.215.55:8080/inquriy',
      method:"GET",
      success: function (result){
        wx.request({
          url: 'http://47.108.215.55:8080/inquriy',
         
          method:"GET",
          success: function (result){
       
             var datas= result.data.data;
             var showdatas=that.data.showdata;
             that.setData({
               'showdata':datas
             })
         

          }
        })
      }
    })

    // 当前账号登陆，调用IMController这个实例
    new IMController({
      
    

      // 真正开发的时候要注意 账号密码是对应申请的appkey下
      // 当前demo的账号密码仅可在云信测试的appkey下使用
      // 如果没有云信测试账号密码，到官方小程序demo上注册 （搜索云信IM）

      // 你的密码 注意实际请求的时候用的md5加密
      //doctor2
      // token: '3ff0e6cfeac96684c8f9ccdd78674742',
      //doctor4","token":"7d104468af4aa84e258956635c112221"
     // token:'7d104468af4aa84e258956635c112221',
    //doctor1 //token: '4ad2963e2cf6f7706cfc9190814ec885',
      // 你的账号
     token: app.globalData.imToken,
   account: app.globalData.accid,
       
 // token:"3ff0e6cfeac96684c8f9ccdd78674742",
  //  account:"doctor2"
     

    })

 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

   


  },
  zixun: function (e) {
    // 当前登陆人要聊天的对象账号
    let account = this.data.account;


    //为了显示头像和姓名 双方必须互相加为好友
    wx.request({
      url: 'http://47.108.215.55:8080/addFriend',
      data:{
        "accid":getApp().globalData.accid,
        "faccid":account,
      },
      headers: {
        'Content-Type': 'application/json'
      },
      method:"POST",
      success :function (result) {
        console.log(result);
      }
      
    })
    
    // 点对点聊天格式是  `p2p-${你的聊天对象账号}`
    let session = 'p2p-'+account;
    // 这里写死点对点，群聊的不一样
    let chatType = 'p2p'
    // 更新会话对象
    store.dispatch({
      type: 'CurrentChatTo_Change',
      payload: session
    })
    // 告知服务器，标记会话已读
    app.globalData.nim.resetSessionUnread(session)
    // 跳转 主逻辑被云信im接管
    setTimeout(() => {
      wx.navigateTo({
        
        url: '../chating/chating?chatTo='+account+'&type='+chatType
      })
    }, 3000)    
  }


})

