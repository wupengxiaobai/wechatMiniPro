Component({
    /**
     * 组件的属性列表
     */
    behaviors: [],
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    attached: function () {

    },

    /**
     * 组件的方法列表
     * 
     */
    methods: {

        onCancel: function (event) {
            this.triggerEvent('cancel', {}, {})
        },

        onDelete: function (event) {
            this.triggerEvent('cancel', {}, {})
        },

        onConfirm: function (event) {
            //  请求
        }
    }
})