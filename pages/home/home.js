
// 获取应用实例

Page({
  data: {
    sciencelist:[],
   /* sciencelist:[
      {
        id:1,
        imgpath:"/images/science_1.jpg",
        scititle:"斑秃为什么找上你？",
        scicontent:"AA的病因尚不完全清楚，目前认为AA是由遗传因素与环境因素共同作用所致的毛囊特异性自身免疫性疾病...",
       },
       {
         id:2,
        imgpath:"/images/science_1.jpg",
        scititle:"你真正认识斑秃吗？",
        scicontent:"斑秃(AA)是一种常见的炎症性非瘢痕性脱发。本病临床表现为头皮突然发生的边界清晰的圆形斑状脱发，轻症患者...",
       },
       {
         id:3,
        imgpath:"/images/science_1.jpg",
        scititle:"斑秃是如何发现的？",
        scicontent:"拉发试验:嘱患者3d内不洗发，以拇指和食指拉起一束毛发，大约五六十根，轻轻向外拉，计数拉下的毛发数...",
       }
  ],*/
  },
  todetail:function(e){
    console.log("ccccccc"),
    console.log(e);
    var that = this
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index
    console.log(that.data.sciencelist[index]);
    //将对象转为string
    getApp().globalData.article=that.data.sciencelist[index];

    wx.navigateTo({
      url: '/pages/science/science',
    })
  },

  wenzhen:function(){
    wx.navigateTo({
      url: '../inquriy/inquriy',
    })
  },

  onLoad:function(){
    var that=this;
    wx.request({
      url: 'http://47.108.215.55:8080/getTodayArticle',
      method:"GET",
      success: function (result){
        console.log(result);
        that.setData({
          sciencelist:result.data.data.todayArticle
        })
        if(result.data.status=="success"){
         
        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '获取每日科普失败',
          })
        }
      
      }
      
     
      

    })

  }

  


  

})
