// pages/movies/movie-list/movie-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieCategory: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap: function () {
      wx.navigateTo({
        url: 'more-movie/more-movie?category=' + this.data.movieCategory.categoryTitle,
      })
    }
  }
})
