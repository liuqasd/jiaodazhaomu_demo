//index.js
const app = getApp();
const db = wx.cloud.database({});
const cont = db.collection('competition_information');
Page({
  data: {
    // 竞赛信息数据
    // comdataList:[
    //   {id:"1",title:"acm竞赛",time:"2022-4-13至2023-4-13",temp:"/images/competition/acm.jpg",url:"../../pages/competition/acm/acm"},
    //   {id:"2",title:"服务外包大赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/fwwb.jpg",url:"../../pages/competition/fwwb/fwwb"},
    //   {id:"3",title:"大学生计算机竞赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/js.jpg",url:"../../pages/competition/jsjds/jsjds"}
    // ],
    comdataList:[],
    resData:[],
      thisCompetitionList:[
      {
        imagePath:"/images/competition/fwwb.jpg"
      },
      {
        imagePath:"/images/competition/jsjsj.jpg"
      },
      {
        imagePath:"/images/competition/acm.jpg"
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
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
  swiperChange: function (e) {  //指示图标
    this.setData({
      swiperCurrent:e.detail.current
    })
  },
  skipTravelDetails: function(e){
    var oId =e.currentTarget.dataset.id //获取点击产品时拿到的id，就是data-id传过来的值
    // wx.navigateTo跳转页面的方法
    //URL是传递的是详情页的路径，把id拼接传过去就可以啦
    wx.navigateTo({
        url: '../competition/test2/test2?oidd='+oId,
    })
}
})

