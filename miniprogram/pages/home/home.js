const app = getApp()
wx.cloud.database();

Page({
  //页面的初始数据 
  data: {
  userInfo: {
    
  },
  hasUserInfo: false,
  logged: false,
  nickname:'点击登录',
  headpicture:'/images/ID.png',
  takeSession: false,
  requestResult: '',
  //判断小程序的API，回调，参数，组件等是否在当前版本可用
  canIUse: wx.canIUse('button.bindtap.getUserProfile'),
  isHide: false,
  canIUseGetUserProfile: false,
  canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          nickname:res.userInfo.nickName,
          headpicture:res.userInfo.avatarUrl,
          logged: true,
          hasUserInfo: true,
        }),
        //缓存用户信息至手机
        wx.setStorageSync('userinfo', res.userInfo) //缓存名，缓存值
      }
    })
  },
// 生命周期函数--监听页面加载
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
     success: function(res) {
      if (wx.setStorageSync('userinfo')) {  //获取缓存值
        let user=wx.setStorageSync('userinfo')
        that.setData({
          nickname:user.nickName,
          headpicture:user.avatarUrl
        });
      }
     }
    });
/**     bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
     //用户按了允许授权按钮
     var that = this;
     //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
     that.setData({
      isHide: false
     });
    } 
    else {
     //用户按了拒绝按钮
     wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
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
   }
  },

/**   onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   
  onShow: function () {

    },

  /**
   * 生命周期函数--监听页面隐藏
   
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   
  onShareAppMessage: function () {

  }*/
  }
})