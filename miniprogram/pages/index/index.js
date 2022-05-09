//index.js
const app = getApp()

Page({
  data: {
    // 竞赛信息数据
    comdataList:[
      {title:"acm竞赛",time:"2022-4-13至2023-4-13",temp:"/images/competition/acm.jpg",url:"../../pager/competition/acm/acm"},
      {title:"服务外包大赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/fwwb.jpg",url:"../../pager/competition/fwwb/fwwb"},
      {title:"大学生计算机竞赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/js.jpg",url:"../../pager/competition/jsjds/jsjds"}
    ],
    
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

    // 网络数据请求  
    onLoad: function (options) {
      wx.request({
        // 接口网址
        url: '',
        data:{},
        success:res=>{
          this.setData({
            resData:res.data
          })
        }
      })
    },

    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  
  swiperChange: function (e) {  //指示图标
    this.setData({
      swiperCurrent:e.detail.current
    })
  }
})

