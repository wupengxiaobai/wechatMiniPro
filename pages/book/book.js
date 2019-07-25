import {
    BookModel
} from '../../models/book'
const bookModel = new BookModel()
Page({
    data: {
        books: []
    },
    onLoad(options) {
        // 地狱回调 promise 优雅写法
        bookModel.getBookList()
            .then(res => {
                // console.log(`getBookList: ${JSON.stringify(res)}`)
                this.setData({
                    books: res
                })
            })
    }
})