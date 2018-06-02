var app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: Object,
    comingSoon: Object,
    top250: Object,
    searchResult: Object,
    containerShow: true,
    searchPanelShow: false,
    inputValue: String,
    placeHolder: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3"

    util.http(inTheatersUrl, this.processDoubanData, 'inTheaters', '正在热映')
    util.http(comingSoonUrl, this.processDoubanData, 'comingSoon', '即将上映')
    util.http(top250Url, this.processDoubanData, 'top250', '豆瓣电影Top250')
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
    var movies = []
    for (let subject of Object.values(moviesDouban.subjects)) {
      let temp = {
        title: subject.title,
        average: subject.rating.average,
        stars: subject.rating.stars,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      categoryTitle,
      movies
    }
    this.setData(readyData)

    // 设置 input 的 placeholder
    if (settedKey === 'inTheaters') {
      var placeHolder = this.data.inTheaters.movies.reduce((arr, obj) => {
        arr.push(obj.title)
        return arr
      }, []).join('、')
      this.setData({placeHolder})
    }
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindInput: function (event) {
    console.log('on input')
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + textoubanBase + "/v2/movie/search?q=" + text
    util.http(searchUrl, this.processDoubanData, "searchResult", "搜索结果")
  },

  onBindConfirm: function (event) {
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text
    util.http(searchUrl, this.processDoubanData, "searchResult", "搜索结果")
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      inputValue: ''
    })
  }
})