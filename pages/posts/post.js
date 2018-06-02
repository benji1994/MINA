var postsData = require('../../data/posts-data.js')
Page({
  data: {
    postList: postsData.postList
  },
  onLoad: function () {
  },

  onCustomTap: function (e) {
    var postId = e.detail.id
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap: function (e) {
    var postId = e.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })    
  }
})