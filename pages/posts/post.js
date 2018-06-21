const post_content=require('../../data/posts_data')


Page({

  /**
   * 页面的初始数据
   */
  data: {},
  imgPath:"/images/...",
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.setData(post_content)
       console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onPostTap:function(event){
    // currentTarget 找到目标集
    // dataset 所有自定义的属性集合
    //  postId 要传输的id
    let postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  // onSwiperItemTap:function(event){
  //   console.log("123")
  //   let postId=event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id='+postId,
  //   })
  // },
  onSwiperTap:function(event){
    // currentTarget 指的是事件捕获的组件
    //  target 指的是当前点击的组件
    let postId=event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
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