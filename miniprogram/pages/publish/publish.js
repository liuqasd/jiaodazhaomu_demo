// pages/publish/publish.js
let db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "请选择时间",
    username: '支持doc，docx，pdf，jpg，png',
    usernameUrl: '',
    image: '',
    file: ''
  },
  //图片上传
  upimages() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log(res.tempFilePaths)
        let time=Date.now()
        let src=res.tempFilePaths[0]
        wx.cloud.uploadFile({
          cloudPath:"friends",
          filePath:src,
        })
        .then(res=>{
          that.setData({
            image:res.fileID
          })
        })
        //publish.js? [sm]:31 cloud://cloud1-6g4ohasv60752e78.636c-cloud1-6g4ohasv60752e78-1305962677/friends/1652536761327
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     console.log(res.tempFilePaths[0])
    //     let time = Date.now()
    //     that.setData({
    //       image:res.tempFilePaths[0]
    //     })
    //     wx.cloud.uploadFile({
    //       cloudPath:"friends.images/"+time,//文件名
    //       filePath:res.tempFilePaths[0] //文件
    //     })
    //     .then(res=>{


    //       wx.showToast({
    //         title: '上传成功',
    //         icon:'none'
    //       })
    //     })

    //   }
    // })
  },
  // 项目时间
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //查看图片
  lookimages(e) {
    let image = []
    image[0] = e.currentTarget.dataset.src
    wx.previewImage({
      urls: image,
    })
  },
  // 文件上传
  uploadbutton() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file: res.tempFiles,
          username: res.tempFiles[0].name
        })
        wx.showToast({
          title: '上传成功',
        })
      }
    })
  },
  // 删除文件
  deletebutton() {
    this.setData({
      files: [],
      username: '支持doc，docx，pdf，jpg，png',
      usernameUrl: []
    })
  },
  //发布提示
  submitform(e) {
    var that = this
    let dd = e.detail.value
    if (dd.active_name == '') {
      wx.showToast({
        title: '请填写所有内容',
      })
    } else {
      wx.showModal({
        title: "确定上传",
        success(res) {
          if (res.confirm == true) {
            db.collection("active_base").add({
                data: {
                  active_name: dd.active_name,
                  active_name2: dd.active_name2,
                  active_intro: dd.active_intro,
                  active_leader: dd.active_leader,
                  active_detail: dd.active_detail,
                  active_file: that.data.file,
                  active_image: that.data.image,
                  active_number: dd.active_number,
                  active_phone: dd.active_phone,
                  active_endtime: dd.active_endtime,
                  active_end: false,
                }
              })
              .then(res => {
                wx.showToast({
                  title: '上传成功',
                })
              })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("active_base").get()
    .then(res=>{
      console.log(res.data)
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