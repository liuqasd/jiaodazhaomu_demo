const db = wx.cloud.database({});
const cont = db.collection('active_base');
Page({
  // 获取项目列表
  // getlist(){
  //   let that=this
  //   let time=util.formatTime(new Date())
  //   let day=time[3]+time[4]*1
  //   let month=time[0]+time[1]*1
  //   db.collection("active_base").get()
  //   .then(res=>{
  //     for(var i=0;i<res.data.length;i++){
  //       time=res.data[i].active_endtime
  //       let ac_mo=time[5]+time[6]*1
  //       let ac_da=time[8]+time[9]*1
  //       if(ac_mo<month){
  //         res.data[i].active_end=true
  //       }
  //       else if(ac_mo==month){
  //         if(ac_da<day){
  //           res.data[i].active_end=true
  //         }
  //         else{
  //           res.data[i].active_end=false
  //         }
  //       }
  //       else{
  //         res.data[i].active_end=false
  //       }
  //     }
  //     that.setData({
  //       list:res.data
  //     })
  //   })
  // },
   data:{
    list:[]
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let a=options.oidd;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称,在云开发的设置中你就可以看到你的环境id
      env: 'cloud1-0gnb268w172baecb'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('active_base').where({
      _id: a
    }). get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          list: res.data
        })
      }
    })
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