// components/classic/movie/index.js
import {
    classicBeh
} from "../classicBeh.js"

Component({
    behaviors: [classicBeh],
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        defaultImg: 'images/movie@eating.png',
        tagImg: 'images/movie@tag.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})