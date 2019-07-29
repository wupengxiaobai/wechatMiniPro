import {
    Http
} from "../util/http-p.js"

class BookModel extends Http {
    // 获取书籍列表20条
    getBookList({
        page = 1,
        limit = 20,
    }) {
        return this.request({
            url: `book/limit?page=${page}&limit=${limit}`
        })
    }

    //  获取关键词解锁的20条数据
    getSearchBookList({
        page = 1,
        limit = 20,
        q = ''
    }) {
        return this.request({
            url: `book/search/all?page=${page}&limit=${limit}&q=${q}`
        })
    }

}

export {
    BookModel
}