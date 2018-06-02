// pages/movies/stars/stars.js
var util = require('../../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    average: Number,
    stars: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    starsArr: Array
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  ready: function () {
    var stars = util.convertToStarsArray(this.data.stars)
    this.setData({starsArr: stars})
  }
})
