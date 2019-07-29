/**
 * 搜索模型 -> search 面板高阶组件
 */
class searchKey {
    key = '_q'
    max_length = 10

    /**
     * 获取搜索历史
     */
    getHistory() {
        return wx.getStorageSync(this.key)
    }

    /**
     * 添加搜索关键在到搜索历史中
     * @param { String } keyword   关键字 
     */
    addToHistory(keyword) {
        const historyArr = this.getHistory()
        const has = his.includes(keyword)
        if (!has) {
            if (historyArr.length >= this.max_length) {
                historyArr.pop()
            }
            historyArr.unshift(keyword)
        }
        wx.setStorageSync(this.key, historyArr)
    }

}

export {
    searchKey
}
