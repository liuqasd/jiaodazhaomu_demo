Page({
    data: {
        contest: {},
        regisStartT: "",
        regisEndT: "",
        contestStartT: "",
        contestEndT: "",
        url: "",
        content: "",
        showBottom: "true",
        judgeCollect: !1,
        isShow: !1,
        start_date: "",
        num: "",
        ID: "",
        imageArr: [],
        docID: "",
        CanIUseInfo: !1
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        this.ContestDetail(a), this.setData({
            ID: a,
            CanIUseInfo: n.globalData.CanIUseInfo
        });
        var o = this, r = n.globalData.openid;
        s.collection("user").where({
            _openid: r
        }).get().then(function(t) {
            (e.data.docID = t.data[0]._id, null != t.data[0]) && (t.data[0].contestC.includes(o.data.ID) && o.setData({
                judgeCollect: !0
            }));
        }), wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    ContestDetail: function(t) {
        wx.showLoading({
            title: "加载中..."
        });
        var e = this;
        wx.cloud.database().collection("contest").where({
            _id: t
        }).get({
            success: function(t) {
                if (wx.hideLoading(), "collection.get:ok" == t.errMsg) if (t.data.length > 0) {
                    var a = t.data[0];
                    e.setDetail(a);
                } else wx.showToast({
                    title: "网络错误,请返回重新打开",
                    mask: !0,
                    icon: "none"
                }), wx.navigateBack({
                    delta: -1
                }); else wx.showToast({
                    title: "网络错误,请返回重新打开",
                    mask: !0,
                    icon: "none"
                }), wx.navigateBack({
                    delta: -1
                });
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "网络错误,请返回重新打开",
                    mask: !0,
                    icon: "none"
                }), wx.navigateBack({
                    delta: -1
                });
            }
        });
    },
    setDetail: function(t) {
        var e = a.formatTime(new Date()), n = new Date(e.replace(/-/g, "/")), s = new Date(t.regisEndT).getTime() - n.getTime(), o = parseInt(s / 864e5) + 1;
        o > 0 && this.setData({
            num: o
        });
        var r = t, i = this._formatTime(t.regisStartT), c = this._formatTime(t.regisEndT), u = t.contestStartT, l = t.contestEndT;
        "" != t.contestStartT && (u = this._formatTime(t.contestStartT)), "" != t.contestEndT && (l = this._formatTime(t.contestEndT)), 
        this.setData({
            contest: r,
            regisStartT: i,
            regisEndT: c,
            contestStartT: u,
            contestEndT: l
        }), wx.hideLoading(), this.data.contest.detail.length <= 138 && this.setData({
            isShow: !this.data.isShow
        });
    },
    _formatTime: function(t) {
        return (t = new Date(t)).getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日";
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset.current;
        this.setData({
            imageArr: this.data.contest.detailImg
        }), wx.previewImage({
            current: e,
            urls: this.data.imageArr
        });
    },
    download: function(t) {
        this.clv();
        var e = t.currentTarget.dataset.url;
        wx.showLoading({
            title: "正在加载...",
            mask: !0
        }), wx.downloadFile({
            url: e,
            success: function(t) {
                if (wx.hideLoading(), 200 === t.statusCode) {
                    var e = t.tempFilePath;
                    wx.showModal({
                        title: "是否离开小程序打开文件？",
                        content: "",
                        success: function(t) {
                            t.confirm && wx.openDocument({
                                filePath: e,
                                showMenu: !0,
                                fileType: 'fdetail.replace(/.+./, "").toLowerCase()'
                            });
                        }
                    });
                }
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "下载失败，请重新尝试",
                    icon: "none",
                    mask: !0
                });
            }
        });
    },
    clv: function() {
        wx.getSavedFileList({
            success: function(t) {
                t.fileList.forEach(function(t, e) {
                    wx.removeSavedFile({
                        filePath: t.filePath
                    });
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return t.from, {
            title: "给你推荐个很棒的竞赛！",
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "转发失败",
                    duration: 2e3
                });
            }
        };
    },
    onShareTimeline: function(t) {
        return {
            title: "我发现一个很棒的竞赛！",
            query: "id=" + this.data.ID
        };
    },
    toast1: function(a) {
        var s = this;
        return e(t.default.mark(function e() {
            var r;
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, wx.getUserProfile({
                        desc: "用于完善用户资料"
                    });

                  case 2:
                    return o = t.sent.userInfo, n.globalData.CanIUseInfo = !0, s.setData({
                        CanIUseInfo: n.globalData.CanIUseInfo
                    }), t.next = 7, wx.cloud.callFunction({
                        name: "login",
                        data: {
                            userInfo: o
                        }
                    });

                  case 7:
                    r = t.sent, o = r.result.userData, n.globalData.userInfo = r.result.userData, wx.setStorageSync("userInfo", r.result.userData), 
                    s.setData({
                        docID: r.result.userData._id
                    }), s.collect_contest(a);

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    },
    toast2: function(a) {
        var s = this;
        return e(t.default.mark(function e() {
            var r;
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, wx.getUserProfile({
                        desc: "用于完善用户资料"
                    });

                  case 2:
                    return o = t.sent.userInfo, n.globalData.CanIUseInfo = !0, s.setData({
                        CanIUseInfo: n.globalData.CanIUseInfo
                    }), t.next = 7, wx.cloud.callFunction({
                        name: "login",
                        data: {
                            userInfo: o
                        }
                    });

                  case 7:
                    r = t.sent, o = r.result.userData, n.globalData.userInfo = r.result.userData, wx.setStorageSync("userInfo", r.result.userData), 
                    s.setData({
                        docID: r.result.userData._id
                    }), s.delete_collect(a);

                  case 13:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    },
    copyText: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.text,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制链接成功！",
                            icon: "success",
                            duration: 3e3
                        });
                    }
                });
            }
        });
    },
    goToMyTeam: function() {
        wx.switchTab({
            url: "../recruit/recruit"
        });
    },
    toggle: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    collect_contest: function() {
        var a = this;
        return e(t.default.mark(function e() {
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return wx.showLoading({
                        title: "正在收藏...",
                        mask: !0
                    }), t.next = 3, n.collect(1, a.data.docID, a.data.ID);

                  case 3:
                    "document.update:ok" == t.sent.errMsg ? (wx.showToast({
                        title: "已收藏",
                        icon: "none"
                    }), a.setData({
                        judgeCollect: !0
                    })) : wx.showToast({
                        title: "收藏失败",
                        icon: "none"
                    });

                  case 5:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    },
    delete_collect: function() {
        var a = this;
        return e(t.default.mark(function e() {
            return t.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, n.collect(2, a.data.docID, a.data.ID);

                  case 2:
                    "document.update:ok" == t.sent.errMsg ? (wx.showToast({
                        title: "取消成功",
                        icon: "none"
                    }), a.setData({
                        judgeCollect: !1
                    })) : wx.showToast({
                        title: "取消失败",
                        icon: "none"
                    });

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, e);
        }))();
    }
});