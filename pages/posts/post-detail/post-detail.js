var postsData = require('../../../data/posts-data.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: Number,
    postData: Object,
    collected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id
    this.setData({postId})
    var postData = postsData.postList[postId]
    this.setData({postData})

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      let postCollected = postsCollected[postId] ? true : false
      this.setData({
        collected: postCollected
      })
    } else {
      let postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }

    // 同步总控开关
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({isPlayingMusic: true})
    }
    this.setMusicMonitor()

  },

  setMusicMonitor: function () {
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = this.data.postId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected= postsCollected[this.data.postId]
    postCollected = !postCollected
    postsCollected[this.data.postId] = postCollected
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: 'success',
    })
  },

  onShareTap: function () {
    wx.showActionSheet({
      itemList: [
        '分享到微信好友',
        '分享到朋友圈',
        '分享到 QQ'
      ]
    })
  },

  onMusicTap: function () {
    var isPlayingMusic = this.data.isPlayingMusic
    var postData = this.data.postData
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      isPlayingMusic = false
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        couveImgUrl: postData.music.coverImg
      })
      isPlayingMusic = true
    }
    this.setData({ isPlayingMusic })
  }
})