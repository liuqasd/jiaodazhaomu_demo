// pager/competition/acm/acm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis:true,//默认收起
    rule: '<p>各学院20、21级本科生：</p><p>西南交通大学ACM新秀杯是我校为提高同学们对程序设计的兴趣而设置的一项重要赛事。该赛事旨在激发大学生程序设计兴趣，发现程序设计人才。现将赛事有关事项通知如下：</p><p>一、竞赛意义</p><p>ICPC</p><p>国际大学生程序设计竞赛是由国际计算机学会ACM（Association for Computing Machinery）于1970年发起组织，是一项通过在压力下编写程序，展示大学生创新能力、团队精神和分析与解决问题能力的年度竞赛。经过近50年的发展，ICPC国际大学生程序设计竞赛已经发展成为全球范围内最具影响力的大学生计算机竞赛，被誉为计算机领域的奥林匹克竞赛。</p><p>二、比赛规则</p><p>1、参赛对象</p><p>比赛类型为个人赛，竞赛面向大一大二且对编程感兴趣的同学。</p><p>2、比赛形式</p><p>比赛期间，每位选手需要在5个小时内使用C/C++、Java和Python中的一种编写程序解决7到13个问题。程序完成之后提交裁判运行，运行的结果会判定是否正确。在决赛期间，每位参赛选手在正确完成一题后，组织者将在其位置上升起一只代表该题颜色的气球。</p><p>三、比赛安排</p><p>宣讲会：11月17日19：30 地点：线上腾讯会议(加入QQ群:671974794)</p><p>预赛：11月21日13：00—18：00 地点：寝室等有网络的地方。（预赛网址：oj.swjtu.edu.cn）</p><p>决赛: 11月27日 9：00—14：00 地点：另行通知。</p><p>四、报名方式</p><p>请于11月21日 12:00前填写下方收集表进行报名</p><p>链接：https://docs.qq.com/form/page/DRmJoT3dBeUJsUW9B?_w_tencentdocx_form=1</p>'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('#text').boundingClientRect();
    query.exec((res) => {
      res[0].height;
      this.setData({
        height: res[0].height
      })
    })
  },
  // ----------------------点击展开
  ellbtn: function () {
    this.setData({
      ellipsis: !this.data.ellipsis
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