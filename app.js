import WeAppRedux from './redux/index.js';
import createStore from './redux/createStore.js';
import reducer from './store/reducer.js';

import ENVIRONMENT_CONFIG from './config/envConfig.js'
import PAGE_CONFIG from './config/pageConfig.js'

const {Provider} = WeAppRedux;
const store = createStore(reducer) // redux store

App(

  

    

  Provider(store)(
    {
      globalData: {
        emitter: null,
        netcallController: null,
        ENVIRONMENT_CONFIG,
        PAGE_CONFIG
      },
      onShow: function(e) {
        if (e.scene == 1007 || e.scene == 1008) {
          try{
            this.globalData.netcall && this.globalData.netcall.destroy()
            this.globalData.nim && this.globalData.nim.destroy({
              done: function () {
              }
            })
          }catch(e) {
          }
        }
      },
      onLaunch: function (e) {
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
          this.globalData.userInfo = userInfo
        }
        let systemInfo = wx.getSystemInfoSync()
        this.globalData.videoContainerSize = {
          width: systemInfo.windowWidth,
          height: systemInfo.windowHeight
        }
        this.globalData.isPushBeCallPage = false
      }
    }
  ),

  {
    globalData: {
      user:{},//后台返回用户的全部信息
      userInfo: {},//微信获取用户信息
      token:{},
      accid:{},
      imToken:{},
      doctorInfo:{},
      article:{},
      score: 0,
      account: '',
      fanganScore: 0
    }
  },
)
