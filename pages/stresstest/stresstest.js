var app = getApp();
var util = require("../../utils/util.js");

Page({
  data: {
    questions: [{
        title: "因为发生了某些没有预料的事，你感到心烦。",
        content: [{
            name: '1',
            value: '是'
          },
          {
            name: '0',
            value: '否'
          },
        ]
      },
      {
        title: "请选择你感到你不能控制生活中的重要事情。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你常常感到紧张和压力。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你常常不能成功地应付生活中有威胁性的争吵。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你觉得不能成功应付生活中所发生的重要变化。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
        ]
      },
      {
        title: "你对把握你的个人问题没有信心。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你感到事情不是按你的意愿发展。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你发现你不能应付你必须去做的所有事情。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你不能控制生活中的一切烦恼。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你觉得你所有方面都是失败的。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "因为事情都是发生在你所能控制的范围之外，你会因此而烦恼。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
        ]
      },
      {
        title: "你发现自己常常考虑必须完成的那些事情。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你不能控制消磨时间的方式。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "你感觉积累的大量困难不能克服。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "朋友的生日免不了花钱，你不想在这类场合出现以免花钱。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "若你刚买的新鞋穿了一天就裂口了，你会气愤、痛苦地抱怨。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      },
      {
        title: "由于某件小事跟好朋友生气，大家互不相让，结果你会一个人生闷气，想忘掉这件事却忘不掉。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
        ]
      },
      {
        title: "当领导因为工作责备你时，你不会和他们吵架，一个人压抑情感。",
        content: [{
          name: '1',
          value: '是'
        },
        {
          name: '0',
          value: '否'
        },
      ]
      }
      ],
    checked: [
      -1, -1, -1, -1, -1, -1, -1,-1,-1,-1, -1, -1, -1, -1, -1, -1,-1,-1
    ],
    commitData: {
      cid: '',
      sid: '',
      tid: '',
      score: 0,
      chk: 1,
      comment: '未输入意见'
    },
    selectIndex:"reset"
  },
  onLoad: function (options) {
    var _info = this.data.commitData;
    var that = this;
    _info.tid = options.tid;
    _info.cid = options.cid;
    // _info.sid = app.globalData.cUser.id;
    this.setData({
      // isSTU: app.globalData.cUser.isSTU,
      commitData: _info,
    });
  },

  saveUserInfo: function () {
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    var that = this;
    for (var num in _chk) {
      if (_chk[num] == -1) {
        wx.showModal({
          title: '提示',
          content: '请选择全部评分项！',
        });
        return;
      }
    }
    wx.showModal({
      title: '提示',
      content: '选择完成后不能修改，确定提交吗？',
      success: function (res) {
        that.setData({
          selectIndex:"reset"
        })
        //var that=this
        console.log(res);
        console.log('提交')
        if (res.confirm) {
          console.log('分数');
          console.log(_info.score)
          app.globalData.fanganScore = _info.score;
          wx.redirectTo({
            url: '/pages/result/result',
          })
        } else {
          console.log('失败')

        }
      },
      fail: function (res) {
        console.log('失败');
      },
      complete: function (res) {
        console.log("完成");
      },
    });
  },
  radioChange: function (e) {
    console.log(e);
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    console.log(e.detail.value);
    _chk[parseInt(e.target.dataset.iid)] = util.countScore2(e.detail.value);
    _info.score = 0;
    for (var ss in _chk) {
      if (_chk[ss] == -1)
        _info.score++;
      _info.score += _chk[ss];
    }
    this.setData({
      commitData: _info,
      checked: _chk
    })
    console.log(this);
    console.log(_info);
    console.log(_chk);
  },
  inputComment: function (e) {
    var _info = this.data.commitData;
    if (e.detail.value == '' || e.detail.value == null) {
      return;
    }
    _info.comment = e.detail.value;
    this.setData({
      commitData: _info
    });
  }
})