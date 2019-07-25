import {
    ClassicModel
} from "../../models/classic.js"

import { LikeModel } from "../../models/like.js"

let classModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
    data: {
        // 最新周刊数据
        latest: [],
        // 是否最新or是否第一个, 来判断加载按钮的状态
        last: true,
        first: false,
        // 解决缓存问题，部分独立出的数据
        likeNum: 0,
        liked: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求最新刊期数据
        classModel.getLatest((res) => {
            //  mock最新期刊数据
            this.setData({
                latest: res,
                likeNum: res.fav_nums,
                liked: res.like_status
            })
        })
    },

    //  自定义的like事件
    likeOpera(event) {
        let behavior = event.detail.behavior
        // 设置like组件的状态（本地化）
        likeModel.setClassicLikeStatus(behavior, this.data.latest.id, this.data.latest.type)
    },

    //  自定义的 left 事件 -> 加载下一期
    onNext(event) {
        this._getClassic('next')
    },

    //  加载上一期
    onPrevious(event) {
        this._getClassic('previous')
    },

    /**
     * 获取期刊
     * @param { String } nextOrPrevious 下一期或上一期
     */
    _getClassic(nextOrPrevious) {
        let currentIndex = this.data.latest.index;
        classModel.getClassic(currentIndex, nextOrPrevious, (res) => {
            this.setData({
                latest: res,
                last: classModel.isLast(res.index),
                first: classModel.isFirst(res.index)
            })
        })

        // 根据moke数据而定需要如此处理
        let likeCurr = currentIndex
        if (nextOrPrevious == 'next') {
            likeCurr++
            if (likeCurr == 2) {
                likeCurr = 6
            }
        } else {
            likeCurr--
            if (likeCurr == 5) {
                likeCurr = 1
            }
        }
        likeModel.getClassicLikeStatus(likeCurr, (res) => {
            // console.log('getClassicLikeStatus:', res)
            this.setData({
                likeNum: res.fav_nums,
                liked: !!res.like_status
            })
        })
    }
})