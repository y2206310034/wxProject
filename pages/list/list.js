// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeData();
    this.getLikeData();
  },
  getLikeData:function(){
    var listLike = wx.getStorageSync("listLike");
    if(!listLike){
      listLike={};
    }
    this.setData({
      "listLike":listLike
    })
  },
  getHomeData:function(){
    var that =this;
    wx.request({
      url:"https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home",
      success:function(res){
        console.log(res);
        that.setData({
          recommend:res.data.recommend,
          markType:res.data.markType,
          articleList:res.data.articleList
        });
      }
    })
  },
  onLikeTap:function(e){
    var index = e.currentTarget.dataset.index;
    var listLike = this.data.listLike;
    var isLike=listLike[index];
    listLike[index]=!isLike;
    this.setData({
      listLike:listLike
    });
    wx.setStorageSync("listLike", listLike);
  },
  onMoreTap:function(e){
    var type = e.currentTarget.dataset.articletype;
    console.log(e);
    wx.showActionSheet({
      itemList: ["内容过期了","内容和" + type + "不相关","不在显示来自" + type + "的内容"]
    });
  },
  onArticleTypeTap:function(e){
    var typeId = e.currentTarget.dataset.articletypeid;
    wx.navigateTo({
      url:"/pages/type/type?typeId="+typeId
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