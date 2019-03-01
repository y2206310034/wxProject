// pages/articleDetial/articleDetail.js
var request = require("../../utils/request.js");
var audio= wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoPlay:false,
    audioPause:true,
    danmuList:[{
      text:"这是第一个弹幕",
      time:2,
      color:"#ff0f0f"
    },{
      text:"这是第二个弹幕",
      time:3
    },{
      text:"这是第三个弹幕",
      time:4
    }],
    progressWidth:500,
    audioCurTime:0,

    //为了在每次访问的时候只记录 一次播放器圆点的位置  
    audioPlayFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.id);

    
    // 这个api并不会产生一个音乐播放器的控件
    // var audio =  wx.createInnerAudioContext();
    // audio.src="http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46";
    // audio.autoplay=true;




  },
  getData:function(id){
    var that =this;
    request({
      url:"/getArticleDetail/"+id,
      success:function(res){
        that.setData({
          articleDetail:res.data
        })
      }
    })
  },
  onVideoPlay:function(){
    var myVideo=wx.createVideoContext("myVideo")
    myVideo.play();
    this.setData({
      videoPlay:true
    })
  },
  onAudioPlayTap:function(){
    var playing = this.data.audioPause;
    if(playing){
      this.audioPlay();
    }else{
      audio.pause();
    }
    this.setData({
      audioPause:!this.data.audioPause
    })
  },
  onListenerAudio:function(){
    var that =this;
    audio.onEnded(function(){
      that.setData({
        audioPause:true,
      })
    })
    audio.onPause(function(){
      that.setData({
        audioPause:true
      })
    })
    audio.onStop(function(){
      that.setData({
        audioPause:true,
      })
    })
    audio.onPlay(function(){
      that.setData({
        audioPause:false
      })
    })
  },
  updataAudioData:function(){
    var that =this;
    var audioDuration=this.data.articleDetail.audio.duration;
    var audioCurTime,
        percent,
        progressPercent,
        progressCircleLeft;
    audio.onTimeUpdate(function(){
      audioCurTime = audio.currentTime.toFixed();
      percent = audioCurTime / audioDuration;
      progressPercent = percent * 100;
      progressCircleLeft = percent * that.data.progressWidth;

      that.setData({
        audioCurTime:audio.currentTime.toFixed(),
        progressPercent:progressPercent,
        progressCircleLeft:progressCircleLeft
      })
    })
  },
  onAudioCircleStart:function(e){
    this.getPhoneRadio();
    if(this.data.audioPlayFlag){
      var audioCircleOriginPos = e.touches[0].pageX * this.getPhoneRadio();
      this.setData({
        audioCircleOriginPos:audioCircleOriginPos,
        audioPlayFlag:false
      });
    }
  },
  onAudioCircleMove:function(e){
    var  progressCircleLeft = e.touches[0].pageX * this.getPhoneRadio() - this.data.audioCircleOriginPos;
    if(progressCircleLeft <= 0){
      progressCircleLeft = 0;
    }else if(progressCircleLeft >= this.data.progressWidth){
      progressCircleLeft = this.data.progressWidth;
    }
    var progressPercent = progressCircleLeft / this.data.progressWidth * 100;
    var audioCurTime = progressCircleLeft / this.data.progressWidth * this.data.articleDetail.audio.duration;


    this.audioPlay();
    audio.seek(Number( audioCurTime ));
    this.setData({
      progressPercent:progressPercent,
      progressCircleLeft:progressCircleLeft,
      audioCurTime:audioCurTime.toFixed()
    })

  },
  getPhoneRadio:function(){
    var radio = 0;
    wx.getSystemInfo({
      success:function(res){
        var width = res.screenWidth;
        radio = 750 / width;
      }
    })
    return radio;
  },
  audioPlay:function(){
    audio.title=this.data.articleDetail.audio.title;
    audio.src=this.data.articleDetail.audio.src;
    this.onListenerAudio();
    this.updataAudioData();
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