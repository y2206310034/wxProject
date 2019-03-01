// pages/type/type.js
var request = require("../../utils/request.js");
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
    // var that =this;
    var typeId = options.typeId;
    this.getData(typeId);
    // wx.request({
    //   url:"https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/"+typeId,
    //   success:function(res){
    //     console.log(res);
    //     that.setData({
    //       "articleTypeTitleInfo":res.data.data
    //     })
    //   }
    // })
  },
  getData:function(typeId){
    var that =this;
    request({
      url:"/getArticleTypeTitleInfo/"+typeId,
      success:function(res){
        that.setData({
          "articleTypeTitleInfo":res.data
        })
      }
    });
    request({
      url:"/getArticleTypeList/"+typeId,
      success:function(res){
        that.setData({
          "articleTypeList":res.data
        })
      }
    });
  },
  onArticleDetailTap:function(e){
    var id = e.currentTarget.dataset.articledetailid;
    wx.navigateTo({
      url:"../articleDetail/articleDetail?id="+id
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