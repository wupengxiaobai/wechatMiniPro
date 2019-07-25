// components/book/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: Object
    },

    methods: {
        onTap(){
            const id = this.data.book.id;
            wx.navigator({
                url:``
            })
        }
    }
})