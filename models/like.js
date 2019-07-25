import {
    Http
} from "../util/http.js"
import classicData from "./classic-data"
import {
    ClassicModel
} from "./classic"
let classicModel = new ClassicModel()

class LikeModel extends Http {

    //  获取某一个classic的like状态
    getClassicLikeStatus(index, callback) {
        // 先从本地查找- 存在，使用本地的。不存在使用 mock 数据中的
        if (wx.getStorageSync(classicModel._getKey(index))) {
            let {
                like_status,
                fav_nums
            } = wx.getStorageSync(classicModel._getKey(index))
            callback({
                like_status,
                fav_nums
            })
        } else {
            let {
                like_status,
                fav_nums
            } = classicData.find(item => item.index === index)
            callback({
                like_status,
                fav_nums
            })
        }

    }


    //  为某个classic 设置/取消喜欢 
    setClassicLikeStatus(behavior, id, type) {
        let url = behavior === 'like' ? 'like' : 'like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                art_id: id,
                type: type
            },
            fail: (err) => {
                // console.log(err)
                let classic = classicData.find(item => item.id == id)
                let storageRes = wx.getStorageSync(classicModel._getKey(classic.index))
                storageRes.like_status = behavior == 'like' ? 1 : 0
                let fav_nums = storageRes.fav_nums;
                storageRes.fav_nums = behavior == 'like' ? ++fav_nums : --fav_nums
                wx.setStorageSync(classicModel._getKey(classic.index), storageRes)
            }
        })
    }
}

export {
    LikeModel
}