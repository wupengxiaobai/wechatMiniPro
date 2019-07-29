import {
    BookModel
} from '../../models/book'
const bookModel = new BookModel()
Page({
    data: {
        books: [],
        page: 1,
        limit: 100,
        total: null,
    },

    onLoad(options) {
        this.getBookData({
            page: this.data.page,
            limit: this.data.limit
        })

        //  模拟搜索
        /* bookModel.getSearchBookList({
            q: "偶买噶"
        }).then(res => {
            console.log(res)
        }) */
    },

    // 监听滚动触底
    onReachBottom() {
        this._loadMore()
    },

    /**
     * 获取book数据
     * @param {Number} page  页码
     * @param {Number} limit 限制条数 
     */
    getBookData({
        page = 1,
        limit = 20
    }) {
        // 地狱回调 promise 优雅写法
        const bookResult = bookModel.getBookList({
            page,
            limit
        })

        bookResult
            .then(res => {
                console.log(res)
                var resData = this.data.books.concat(res.books)
                this.setData({
                    books: resData,
                    total: res.total
                })
            })
    },

    hasMore() {
        return this.data.books.length < this.data.total
    },

    _loadMore() {
        if (this.hasMore()) {
            this.data.page++;
            this.getBookData({
                page: this.data.page,
                limit: this.data.limit
            })
        } else {
            console.log('没有更多了！！！')
        }
    }

})