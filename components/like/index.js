// components/like/index.js
Component({
  /**
   * 组件的属性列表(开发)
   */
  properties: {
    likeNum: {
      value: 0,
      type: Number
    },
    liked: {
      value: false,
      type: Boolean
    }
  },
  data: {
    yesSrc: './like.png',
    noSrc: './like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加喜欢
    addLike(event) {
      let liked = this.properties.liked,
        likeNum = this.properties.likeNum;
      // 设置喜欢数量的三元操作
      likeNum = liked ? --likeNum : ++likeNum;
      //  修改数据 -> 视图
      this.setData({
        likeNum: likeNum,
        liked: !liked
      })

      let behavior = this.properties.liked ? 'like' : 'cancel'
      //  激活自定义事件，向父组件传递必要数据
      this.triggerEvent('likeOpera', {
        behavior: behavior
      }, {})

    }
  }
})