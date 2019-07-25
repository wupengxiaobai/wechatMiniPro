Component({
    properties: {
        index: {
            type: Number,
            // 组件数据被改变时触发
            observer(newV, oldV, changePath) {
                // console.log(newV, oldV, changePath)
                let val = newV > 10 ? newV : '0' + newV
                this.setData({
                    _index: val
                })
            }
        },
        pubdate: {
            type: String,
            observer(newV) {
                let date = new Date(newV);
                let month = this.data.months[date.getMonth()],
                    year = date.getFullYear();
                this.setData({
                    month: month,
                    year: year
                })
            }
        }
    },
    data: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        month: 0,
        year: '',
        _index: ''
    },
    // 生命周期
    lifetimes: {
        attached() {
            // console.log(this.properties.index, this.data.month, this.data.year)
            // console.log(this.data)
        }
    }
})