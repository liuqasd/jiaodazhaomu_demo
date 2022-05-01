//index.js
const app = getApp()

Page({
  data: {
    // -----------------------------------------------------------------竞赛信息数据
    comdataList:[
      {title:"acm竞赛",time:"2022-4-13至2023-4-13",temp:"/images/competition/acm.jpg",url:"../../pager/competition/acm/acm"},
      {title:"服务外包大赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/fwwb.jpg",url:"../../pager/competition/fwwb/fwwb"},
      {title:"大学生计算机竞赛",time:"2022-4-13至2023-4-1",temp:"/images/competition/js.jpg",url:"../../pager/competition/jsjds/jsjds"}
    ],
    resData:[],
      thisCompetitionList:[
      {
        imagePath:"/images/competition/fwwb.jpg",
        name:"中国大学生服务外包创新创业大赛"
      },
      {
        imagePath:"/images/competition/jsjsj.jpg",
        name:"中国大学生计算机设计大赛"
      },
      {
        imagePath:"/images/competition/acm.jpg",
        name:"ACM国际大学生程序设计竞赛"
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


    swiperCurrent:"",  //指示点
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
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
})

