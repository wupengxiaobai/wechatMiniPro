import {
    Http
} from "../util/http-p.js"

class BookModel extends Http {
    getBookList() {
        return this.request({
            url: 'book/'
        })
    }

    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }
}

export {
    BookModel
}