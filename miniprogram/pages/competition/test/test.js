//index.js
//云数据库初始化
const db = wx.cloud.database({});
const cont = db.collection('competition_information');
Page({
   data:{
        ne:[],  //这是一个空的数组，等下获取到云数据库的数据将存放在其中
    },
  /**
   * 生命周期函数--监听页面加载
   */
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
          ne: res.data
        })
      }
    })
  }, 
  skipTravelDetails:function(e){
    let id=e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
    // wx.navigateTo跳转页面的方法
    //URL是传递的是详情页的路径，把id拼接传过去就可以啦
    wx.navigateTo({
        url: "../test2/test2?id="+id,
    })
}

})
