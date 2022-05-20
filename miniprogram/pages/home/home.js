const app = getApp()
wx.cloud.database();

Page({
  //页面的初始数据 
  data: {
  userInfo: {},
  hasUserInfo: false,
  logged: false,
  takeSession: false,
  requestResult: '',
  //判断小程序的API，回调，参数，组件等是否在当前版本可用
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  isHide: false,
  canIUseGetUserProfile: false,
  canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
},
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../login/login',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
     success: function(res) {
      if (res.authSetting['scope.userInfo']) {
       wx.getUserInfo({
        success: function(res) {
         // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
         // 根据自己的需求有其他操作再补充
         // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
         wx.login({
          success: res => {
           // 获取到用户的 code 之后：res.code
           console.log("用户的code:" + res.code);
           // 可以传给后台，再经过解析获取用户的 openid
           // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
           // wx.request({
           //  // 自行补上自己的 APPID 和 SECRET
           //  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
           //  success: res => {
           //   // 获取到用户的 openid
           //   console.log("用户的openid:" + res.data.openid);
           //  }
           // });
          }
         });
        }
       });
      } else {
       // 用户没有授权
       // 改变 isHide 的值，显示授权页面
       that.setData({
        isHide: true
       });
      }
     }
    });
    bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
     //用户按了允许授权按钮
     var that = this;
     // 获取到用户的信息了，打印到控制台上看下
     console.log("用户的信息如下：");
     console.log(e.detail.userInfo);
     //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
     that.setData({
      isHide: false
     });
    } 
    else {
     //用户按了拒绝按钮
     wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      showCancel: false,
      confirmText: '返回授权',
      success: function(res) {
       // 用户没有授权成功，不需要改变 isHide 的值
       if (res.confirm) {
        console.log('用户点击了“返回授权”');
       }
      }
     });
    }
   },
  },*/

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