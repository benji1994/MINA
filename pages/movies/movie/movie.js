// pages/movies/movie/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
  },

  methods: {
    onMovieTap: function () {
      wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail?id=' + this.data.movie.movieId,
      })
    }
  }
})
