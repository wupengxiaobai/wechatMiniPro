import {
    Http
} from "../util/http.js"

// mock 数据
import classicData from "./classic-data"

class ClassicModel extends Http {
    //  请求周刊数据方法
    getLatest(sCallback) {
        let latest = classicData[0]
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
            },
            fail: (err) => {
                if (wx.getStorageSync(this._getKey(latest['index']))) {
                    sCallback(wx.getStorageSync(this._getKey(latest['index'])))
                } else {
                    sCallback(latest)
                    // 添加到缓存
                    wx.setStorageSync(this._getKey(latest.index), latest)
                }
                //  设置最新期刊的 index，方便 箭头状态样式的正常渲染
                this._setLastIndex(latest.index)
            }
        })

    }

    //  请求上一周刊数据的方法
    /*  getPrevious(index, sCallback) {
         this.request({
             url: 'classic/' + index + '/previous',
             success: (res) => {
                 sCallback(res)
             },
             fail: (err) => {
                 sCallback(err)
             }
         })
     } */

    //  请求下一周刊数据的方法
    /* getNext(index, sCallback) {
        this.request({
            url: 'classic/' + index + '/next',
            success: (res) => {
                sCallback(res)
            },
            fail: (err) => {
                sCallback(err)
            }
        })
    } */

    /**
     * 合并请求周刊的模型方法 
     * @param {*} index   当前周刊所有
     * @param {*} nextOrPrevious    请求新的一条或前一条
     * @param {*} sCallback     回调
     */
    getClassic(index, nextOrPrevious, sCallback) {
        // 确定记录
        let resData;
        if (nextOrPrevious == 'previous') {
            resData = classicData.filter(item => {
                return item.index < index
            })[0]
        } else if (nextOrPrevious == 'next') {
            let res = classicData.filter(item => {
                return item.index > index
            })
            resData = res[res.length - 1]
        }
        // 从缓存中读取数据
        let classic = wx.getStorageSync(this._getKey(resData.index));
        if (!classic) { //  缓存机制中没有当前数据
            this.request({
                url: 'classic/' + index + '/' + nextOrPrevious,
                success: (res) => {
                    sCallback(res)
                },
                fail: (err) => {
                    sCallback(resData)
                    // 请求的新数据加入缓存机制中
                    wx.setStorageSync(this._getKey(resData.index), resData)
                }
            })
        } else { //  缓存中已有当前数据
            sCallback(classic)
        }
    }

    //  是否是最后一期
    isLast(index) {
        // console.log(this._getLastIndex())
        return (index == this._getLastIndex() ? true : false)
    }

    //  是否是第一期
    isFirst(index) {
        return (index == 1 ? true : false)
    }

    // 设置最新期刊所有保存到本地，便于后期箭头状态判断
    _setLastIndex(index) {
        wx.setStorageSync('__last__', index)
    }

    _getLastIndex() {
        let lastIndex = wx.getStorageSync('__last__')
        return lastIndex
    }

    // key -> 缓存中定义的期刊的 key 
    _getKey(index) {
        return ('classic-' + index)
    }
}

export {
    ClassicModel
}