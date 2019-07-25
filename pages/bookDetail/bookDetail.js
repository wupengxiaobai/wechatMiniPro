Page({
    data: {
        text: '我的天\\n测试wxs的中的替换函数, 差不多姑娘差不多姑娘差不多姑娘差不多姑娘\\n差不多姑差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差\\n不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘差不多姑娘\\n娘差不多姑娘差不多姑娘',
        dayOne: [{
            pos: 'after',
            text: 'examine',
            desc: '调查、检验'
        }, {
            pos: 'after',
            text: 'beyond',
            desc: '超出'
        }, {
            pos: "after",
            text: 'belief',
            desc: "信仰 believe 相信"
        }, {
            pos: 'after',
            text: 'instruct',
            desc: '命令、指示、教导'
        }, {
            pos: 'before',
            text: 'thirsty',
            desc: '渴望'
        }, {
            pos: 'before',
            text: 'implication',
            desc: '暗示、含义 application应用、申请'
        }, {
            pos: 'before',
            text: 'counterpart',
            desc: '职务相当的人、对应'
        }, {
            pos: 'after',
            text: 'invest',
            desc: '投资、投入 invest in/with 寄希望于'
        }]
    },
    onLoad(options) {

        // 请求 并行和串行
        // 并行 2 2.5 2.2
        // 串行 2 4.5 6.7

        // Promise.all([Promise实例1, Promise实例2, Promise实例3])  //  【返回新的promise】
        // 成功打印实例返回数据组成的数据 [{res1}, {res2}, {res3}]
        // 一个失败 reject
        // 2.5 以最久请求时间来衡量 Promise.all 请求时间

        //  Promise.race()  //  竞争  任意 promise实例执行完毕后返回数据。res 即最先成功的数据

    }
})