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
  inputNum: function (e) {
    let Number = e.detail.value
    let checkedNum = this.checkNum(Number)
    },
    checkNum: function (Number) {
      let str =/^[0-9]*$/
    if (str.test(Number)) {
      return true
    } else {
      wx.showToast({
        title: '请填写数字',
    })
    return false
    }
    },
  inputemail: function (e) {
    let active_phone = e.detail.value
    let checkedNum = this.checkEmail(active_phone)
    },
    checkEmail: function (email) {     
      let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      wx.showToast({
        title: '请填写正确邮箱',
      })
      return false
    }
    },
    //图片上传
  upimages() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res.tempFilePaths)
        let time = Date.now()
        wx.cloud.uploadFile({
          cloudPath:"friends.images/"+time+".jpg",//文件名
          filePath:res.tempFilePaths[0] //文件
        })
        .then(res=>{
          that.setData({
            image:res.fileID
          })
          wx.showToast({
            title: '上传成功',
            icon:'none'
          })
        })
      }
    })
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