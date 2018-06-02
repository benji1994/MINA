var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    category: String,
    requestUrl: String,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category
    this.setData({category})
    var requestUrl = ''
    if (category === '正在热映')
      requestUrl = app.globalData.doubanBase + '/v2/movie/in_theaters'
    else if (category === '即将上映')
      requestUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'
    else if(category === '豆瓣电影Top250')
      requestUrl = app.globalData.doubanBase + '/v2/movie/top250'
    this.setData({requestUrl})

    util.http(requestUrl, this.processDoubanData)
  },

  onCustomScrollLower: function (evet) {
    var nextRequestUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&conut=20'
    util.http(nextRequestUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?star=0&count=20"
    this.setData({
      movies: [],
      totalCount: 0
    })
    util.http(refreshUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  processDoubanData: function (moviesDouban) {
    var movies = this.data.movies
    var totalCount = this.data.totalCount
    for (let subject of Object.values(moviesDouban.subjects)) {
      let temp = {
        title: subject.title,
        average: subject.rating.average,
        stars: subject.rating.stars,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
      totalCount++
    }

    this.setData({
      movies,
      totalCount
    })
    wx.hideNavigationBarLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  }
})