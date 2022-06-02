// pages/competition/test2/test2.js
const db = wx.cloud.database({});
const cont = db.collection('competiton_detail');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis:true,//默认收起
    imgList: [{
        id: 1,
        images: ["../../../images/competition/acm.jpg"]
      }, {
        id: 2,
        images: ["../../../images/competition/fwwb.jpg"]
      }, {
        id: 3,
        images: ["../../../images/competition/js.jpg"]
      } ] , // 本地数据
      com_detail:[], //
      comlist:[]
  },
  ellipsis: function () {
    var value =!this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  onLoad: function (options) {
    console.log(options);
    let a=options.oidd;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称,在云开发的设置中你就可以看到你的环境id
      env: 'cloud1-0gnb268w172baecb'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('competiton_detail').where({
      id:a
    }).get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          com_detail:res.data
        })
      }
    })
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

  }
})