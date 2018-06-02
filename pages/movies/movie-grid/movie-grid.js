// pages/movies/movie-grid/movie-grid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movies: Array,
  },

  methods: {
    onScrollLower: function (event) {
      this.triggerEvent('customScrollLower')
    }
  }
})
