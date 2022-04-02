// pages/user/user.js
var e, a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/regenerator")), t = require("../../@babel/runtime/helpers/asyncToGenerator"), n = getApp(), s = wx.cloud.database().collection("user");

wx.cloud.init({
    env: "cloud1-6g4ohasv60752e78"
});

wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CanIUseInfo: "",
    avatarUrl: "./user-unlogin.png",
    userInfo: {},
    userDetail: "",
    hasUserInfo: !1,
    logged: !1,
    takeSession: !1,
    requestResult: "",
    canIUseGetUserProfile: !1,
    getCVFromDataBase: !1,
    userCV: [],
    canIUseOpenData: wx.canIUse("open-data.type.userAvatarUrl")
  },
  myTeam: function() {
    wx.navigateTo({
        url: "../myTeam/myTeam"
    }), n.globalData.currentData = 0;
  },
  myPost: function() {
    wx.navigateTo({
        url: "../myTeam/myTeam"
    }), n.globalData.currentData = 1;
    },
  myCollect: function() {
    wx.navigateTo({
        url: "../myCollect/myCollect"
    }), n.globalData.currentData = 3;
  },
  feedback: function() {
    wx.navigateTo({
        url: "../feedback/feedback"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var a = this;
        this.setData({
            CanIUseInfo: n.globalData.CanIUseInfo
        }), 0 != n.globalData.messageNumber ? wx.setTabBarBadge({
            index: 3,
            text: n.globalData.messageNumber.toString()
        }) : wx.removeTabBarBadge({
            index: 3
        }), 1 == this.data.CanIUseInfo && s.where({
            _openid: n.globalData.openid
        }).get({
            success: function(e) {
                a.setData({
                    userCV: e.data[0],
                    getCVFromDataBase: !0
                }), a.getOpenid();
            },
            fail: function(e) {}
        });
    },
    QueryMyTeam: function() {
        wx.cloud.callFunction({
            name: "team",
            data: {
                type: "MyTeam"
            },
            success: function(e) {
                for (var a = [], t = 0; t < e.result.list.length; t++) a.push(e.result.list[t].myTeamList);
                n.globalData.myTeamList = a;
            },
            fail: function(e) {
                wx.hideLoading();
            }
        }), wx.cloud.callFunction({
            name: "team",
            data: {
                type: "myContestC"
            },
            success: function(e) {
                for (var a = [], t = 0; t < e.result.list.length; t++) a.push(e.result.list[t].myCollectList);
                n.globalData.myCollectList = a;
            },
            fail: function(e) {
                wx.hideLoading();
            }
        }), wx.cloud.callFunction({
            name: "team",
            data: {
                type: "myApply"
            },
            success: function(e) {
                for (var a = [], t = 0; t < e.result.list[0].myApplyList.length; t++) a.push(e.result.list[0].myApplyList[t]);
                n.globalData.myApplyList = a;
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    toast: function() {
        var s = this;
        return t(a.default.mark(function t() {
            var o;
            return a.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return s, a.next = 3, wx.getUserProfile({
                        desc: "用于完善用户资料"
                    });

                  case 3:
                    return e = a.sent.userInfo, n.globalData.CanIUseInfo = !0, s.setData({
                        CanIUseInfo: n.globalData.CanIUseInfo
                    }), a.next = 8, wx.cloud.callFunction({
                        name: "login",
                        data: {
                            userInfo: e
                        }
                    });

                  case 8:
                    o = a.sent, wx.setStorageSync("userInfo", o.result.userData), e = o.result.userData, 
                    n.globalData.userInfo = o.result.userData, s.setData({
                        userCV: o.result.userData,
                        getCVFromDataBase: !0
                    }), o.result.toChooseIdentity && n.chooseIdentity(o.result.docID);

                  case 14:
                  case "end":
                    return a.stop();
                }
            }, t);
        }))();
    },
    editCV: function() {
        wx.navigateTo({
            url: "../cv/cv?id=" + n.globalData.openid
        });
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