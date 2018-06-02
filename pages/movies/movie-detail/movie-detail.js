var app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: Number,
    movie: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId : options.id
    })
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + this.data.movieId
    util.http(url, this.processDoubanData)
  },

  processDoubanData: function (data) {
    if (!data) return

    var director = {
      avator: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avator = data.directors[0].avatars.large
      }
      director.name = data.directors[0].name
      director.id = data.directors[0].id
    }
    var movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,  
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary,
    }

    this.setData({movie})
  },

  viewMoviePostImg: function (e) {
    var src = e.target.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})