// pages/contest/contest.js
const db = wx.cloud.database({});
const cont = db.collection('competition_information');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // comdataList:[
        //     {title:"acm竞赛",time:"2022-4-13至2023-4-13",temp:"/images/competition/acm.jpg",url:"../../pages/competition/acm/acm"},
        //     {title:"服务外包大赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/fwwb.jpg",url:"../../pages/competition/fwwb/fwwb"},
        //     {title:"大学生计算机竞赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/js.jpg",url:"../../pages/competition/jsjds/jsjds"}
        //   ],
        comdataList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 网络数据请求  
    onLoad: function (options) {
        var _this = this;
        //1、引用数据库   
        const db = wx.cloud.database({
          //这个是环境ID不是环境名称,在云开发的设置中你就可以看到你的环境id
          env: 'cloud1-0gnb268w172baecb'
        })
        //2、开始查询数据了  news对应的是集合的名称   
        db.collection('competition_information').get({
          //如果查询成功的话    
          success: res => {
            console.log(res.data)
            //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
            this.setData({
              comdataList: res.data
            })
          }
        })
      }, 
      skipTravelDetails: function(e){
        var oId =e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
        // wx.navigateTo跳转页面的方法
        //URL是传递的是详情页的路径，把id拼接传过去就可以啦
        wx.navigateTo({
            url: '../competition/test2/test2?oidd='+oId,
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