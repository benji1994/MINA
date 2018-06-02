// pages/posts/post-item/post-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
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
    ontap: function () {
      var eventDetail = {id: this.data.item.postId}
      this.triggerEvent('customTap', eventDetail)
    }
  }
})
