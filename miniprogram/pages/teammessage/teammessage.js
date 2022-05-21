let db=wx.cloud.database()
const util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]

  },
  // 获取项目列表的
  getlist(){
    let that=this
    let time=util.formatTime(new Date())
    let day=time[3]+time[4]*1
    let month=time[0]+time[1]*1
    db.collection("active_base").get()
    .then(res=>{
      for(var i=0;i<res.data.length;i++){
        time=res.data[i].active_endtime
        let ac_mo=time[5]+time[6]*1
        let ac_da=time[8]+time[9]*1
        if(ac_mo<month){
          res.data[i].active_end=true
        }
        else if(ac_mo==month){
          if(ac_da<day){
            res.data[i].active_end=true
          }
          else{
            res.data[i].active_end=false
          }
        }
        else{
          res.data[i].active_end=false
        }
        
      }
      that.setData({
        list:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
     this.getlist()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})