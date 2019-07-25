// components/navi/index.js
Component({
    properties: {
        title: String,
        first: Boolean,
        last: Boolean
    },
    data: {
        disLeftSrc: './images/triangle.dis@left.png',
        disRightSrc: './images/triangle.dis@right.png',
        leftSrc: './images/triangle@left.png',
        rightSrc: './images/triangle@right.png'
    },
    methods: {
        // 下一个（新）
        handleClickLeft() {
            if (this.data.last) return;
            // console.log('加载新周刊')
            this.triggerEvent('left', {})
        },

        //  上一个(旧)
        handleClickRight() {
            if (this.data.first) return;
            // console.log('加载上一周刊')
            this.triggerEvent('right', {})
        }
    }
})