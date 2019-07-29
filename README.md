# 微信小程序开发实战

## 结构目录
```
|- pages	    页面目录
|- components	组件目录
    -- classic      classic模块的其它组件
        --- movie       模块中间的图示组件
    -- like         like组件目录
|- models	    数据模型目录
    -- classic.js   classic模块相关数据模型
|- util         工具方法
    -- http.js      http请求文件
|- config.js    基础配置文件
```


## app.json
-   window 全局配置
**navigationBar的消失，直接内容内嵌到手机中**
```json
{
    "window":{
        // navigationBar不展示
        navigationBarStyle: "custom",
        // 窗口的背景颜色
        backgroundColor:"#f9f9f9"
    },
    "tabBar":{
        "list":[
            {
                "text":"流行",
                "pagePath":"pages/classic/classic",
                "iconPath":"classic.png",
                "selectedIconPath"
            }
        ]
    }
}
```

## 开发


### 自定义组件
-   组件统一放置于 components 文件下
    +   问题： 
        *   组件使用路径（使用绝对路径 `/` 开头，相对路径）

**like组件示例**
-   组件在page引入 配置page的 .json 文件 修改 usingComponents 对象属性以 `"key(组件名)"="value(组件路径)"` 形式

**组件封装**
-   开放性
-   封装性

**组件数据的开放性**
内部数据，放置 data 属性中，以key=>value形式
开放数据，放置 properties 属性中，以对象的形式
```JAVASCRIPT
Component ({
    // 外部传入组件的数据
    properties: {
        oneAttr: {
            type: String,//  必须
            value: '08',
            //  当组件内部数据被改变时触发 **千万不要在属性的observer内部尝试修改属性本身数据，会导致内存泄漏， observer一直被调用**
            //  解决方案，在 data 中定义一个属性并赋值，视图展示data中的属性
            observer: function (newV,oldV,changePath) {
                this.data._oneAttr = newV
            }
        }
    },
    //  组件内部的数据
    data: {
        _oneAttr: ""
    }
})

//  组件内部 this.data 以上数据都会被打印。
//      properties内数据是根据指定的type之后进行转换处理
//      不要在observer中尝试修改属性本身数据，无线调用->内存泄漏
```

**slot 【插槽】**
*使用演示*
```html
    <v-tag text="标签">
        <text name="before">{{ 'before插槽内容' }}</text>
        <text name="after">{{ 'after插槽内容' }}</text>
    </v-tag>
```
```javascript
    //1.options 配置 multipleSlots:true
    options: {
        multipleSlots: true
    }
```

**externalClasses 【自定义组件使用外部样式类】**
```html
<!-- 
    ext-class在自定义组件内部的externalClasses上绑定，直接将其放置于wxml作样式类使用即可，需要确外部样式的保优先级够高*
    ext-class1 是在使用自定义组件的wxss重定义的样式类
-->
<v-tag ext-class="ext-class1"></v-tag>
```
```JAVASCRIPT
Component({
    externalClasses:['ext-class']
})
```

**修改自定义组件内部样式【hock】**
```CSS
.container v-tag:nth-child(1)>view {
    color: pink;
}
```
*我们编写自定义组件地时候需要给定外部样式的定义，给足使用者多个选择*


#### 高阶组件
**高阶组件示例 --> 搜索面板**
*历史*                     
-   本地存储
-   数组操作
```javascript
class SearchKey {
    key = '_q'
    max_length = 10

    getHistory() {
        return wx.getStorageSync(this.key)
    }

    addToHistory(keyword) {
        const historyArr = this.geiHistory()
        const has = his.includes(keyword)
        if (!has) {
            if (historyArr.length == this.max_length) {
                historyArr.pop()
            }
            historyArr.unshift(keyword)
        }
        wx.setStorageSync(this.key,historyArr)
    }

    clearHistory() {
        wx.setStorageSync(this.key, null)
    }
}
```

*热门*
-   通过接口获取
   
**加载更多的复用设计【封装】**
```JAVASCRIPT
//  小程序中同用的 behavior【加载更多】
const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noResult: false
    },

    methods: {
        setMoreData(dataArray) {
            const tempArray = this.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },

        getCurrentStart() {
            return this.data.dataArray.length
        },

        hasMore() {
            return this.data.dataArray < this.data.total
        },

        setTotal(total) {
            this.data.total = total
            if (this.data.total === 0) {
                this.setData({
                    noResult: true
                })
            }
        },

        initialize() {
            this.data.dataArray = []
            this.data.total = null
        }
    }
})



//  pagination 【加载更多(分页)帮助类】
class PaginationHelper {
    dataArray = []  //  数据数组
    total = null   //  总记录数
    noneResult = false    //  没有数据控制变量

    setMoreData(dataArray) {    //  设置最新的数据集
        const tempArray = this.dataArray.concat(dataArray)
        this.dataArray = tempArray
    }

    getCurrentStart() { //  获取跳过数据长度
        return this.dataArray.length
    }

    hasMore() { //  是否还有数据返回
        return this.dataArray < this.total //  思路 1:total 和 当前长度比较 
    }

    setTotal(total) {   //  设置数据总长度
        this.total = total
        if (total == 0) {
            this.noneResult = true
        }
    }

    initialize() {  //  重新搜索时手动初始化，防止数据重复
        this.dataArray = []
        this.total = null
        this.noneResult = false
    }
}

export {
    PaginationHelper
}

```


                   
                         



### wxs
**基本操作**
独立地 `wxs` 文件
```javascript
    //  /util/filter.wxs
    var format = function (text) {
        return text.replace(text.substring(1), '520')
    }

    module.exports = {
        format: format
    }
```

**wxml 使用 `wxs`**
```HTML
<wxs src="../../util/filter.wxs" model="util"></wxs>
<!-- 最终展示 w520 -->
<text>{{ util.format('wtf') }}</text>
```

**wxs 使用正则 & 一个过滤器**
```javascript
//  /util/filter.wxs
var format = function (text) {
    // @param1 -> 匹配字符  
    // @param2 -> 修饰符 i m g
    var reg = getRegExp('\\\\n', 'g')
    return text.replace(reg, '\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
}

var limit = function (array, length) {
    // @parma1 -> 数组
    // @param2 -> 展示长度
    return arr.slice(0, length)
}

module.exports = {
    format: format,
    limit: limit
}
```

*注意：text标签如果需要解析特殊字符需要给其设置属性 decode 为 true*


**拓展：时间过滤器**
```JAVASCRIPT
var regYear = getRegExp("(y+)", "i");
var dateFormat = function(timestamp, format){
  if (!format) {
    format = "yyyy-MM-dd hh:mm:ss";
  }
  timestamp = parseInt(timestamp);
  var realDate = getDate(timestamp);    //  获取 Date
  function timeFormat(num) {
    return num < 10 ? '0' + num : num;
  }
  var date = [
    ["M+", timeFormat(realDate.getMonth() + 1)],
    ["d+", timeFormat(realDate.getDate())],
    ["h+", timeFormat(realDate.getHours())],
    ["m+", timeFormat(realDate.getMinutes())],
    ["s+", timeFormat(realDate.getSeconds())],
    ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
    ["S+", realDate.getMilliseconds()],
  ];
  var reg1 = regYear.exec(format);
  if (reg1) {
    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
  }
  for (var i=0; i < date.length; i++) {
    var k = date[i][0];
    var v = date[i][1];
 
    var reg2 = getRegExp("(" + k + ")").exec(format);
    if (reg2) {
      format = format.replace(reg2[1], reg2[1].length == 1
        ? v : ("00" + v).substring(("" + v).length));
    }
  }
  return format;
}

```



**组件继承全局样式**
font color 
page页样式都会继承全局样式
#### 自定义组件生命周期
```JS
Component({
    //  组件生命周期
    lifetimes: {
        created: function() {
            //  此生命周期中不能执行 setData()
        },
        attached: function() {
            //  组件实例进入页面节点树时执行
        },
        detached: function() {
            //  组件实例被从页面节点树移除时执行 v-if为false会移除组件
        }//, ...
    },
    //  组件所在页面生命周期
    pageLifetimes: function() {
        show: function() {
            //  页面被展示
        }//,...
    }
})
```

#### 自定义事件
**用于子组件向父组件传递数据（组件通信）**
```JAVASCRIPT
//  子组件内部调用【事件名，事件数据，事件配置（冒泡等）】激活事件
this.triggerEvent('eventName', eventDetail, eventOptions)

//  父组件中通过 bind:eventName = "fatherEvent" 接受
//  函数内部 event.detail 中包含子组件传递的数据  
```

#### behavior 代码共享
**behavior是组件间代码共享的特性，类似于 minXin**
每个behavior包含一组属性，数据，生命周期等。组件引用它时，数据/属性/生命周期会合并到组件内部，可以有多个behavior
```JAVASCRIPT
//  定义一个 behavior
let myBehavior = Behavior({
    behaviors: [],
    properties: {},
    data: {},
    methods: {},
    attached() {},
    //....
})
export { myBehavior }

//  组件内引入并使用
import { myBehavior } from '...-Beh.js'
Component({
    behaviors: [myBehavior]
})
```
**behavior继承关系**
-   本组件优先
-   引入置后优先
-   生命周期函数会全部依次执行


## 小程序
### 基础 
**插值表达式**
插值表达式 {{}}
支持三元运算符

**数据更新**
```JS
wx.setData({ xxx: xxx })
wx.data.xxx = xxx   //  视图数据不会更新
```

**wxml中的 block**
<block /> 并不是一个组件，只是一个包装元素，不会再页面中做出任何渲染。只接受控制属性

**v-if 和 hidden的使用**
-   v-if    控制标签是否渲染/不渲染。使用 v-if 的自定义组件 会经历组件的整个生命周期流程，从创建到移除。
-   hidden  控制标签的显示和隐藏
    +   对于自定义组件不可靠，我们可以给自定义组件中内部增加 hidden 属性，绑定到 container 上
    <!-- 自定义组件WXML和js -->
    ```javascript
       Component({
            properties: {
                hidden: false
            } 
       })
    ```
    ```html
    <view hidden="{{hidden}}" class="container"></view>
    ```
    <!-- 外部组件 -->
    ```html
    <custom-component hidden="{{true}}"></custom-component>
    ```

**wx:for列表渲染**
```HTML
<!-- 使用 wx:for 对数据进行枚举， 使用 wx:for-item 对 item 进行别名设置  -->
<!-- block 可以视作一个 () 包装作用，不会渲染任何组件 -->
<block wx:for="{{ books }}" wx:for-item="itemName" wx:key="index">
    <book-cmp book="{{ itemName }}"></book-cmp>
</block>
```

**自定义事件**
`this.triggerEvent(事件名,传递的属性对象,事件配置)`

**getBackgroundAudioManager**
全局的 `背景音乐管理`
```JAVASCRIPT
const mBgmManager = wx.getBackgroundAudioManager()

//  属性 src(一旦设置即自动播放) title(必须) paused(只读属性，是否暂停)
mBgmManager.src = ``
mBgmManager.title = '小白爱你是吗？'
//  监听背景管理的方法：为小程序和全局背景模块能够统一
//  onPlay(callback) 播放 onPause(callback) 暂停 onEnded(callback) 自然结束 onStop(callback) 停止
//  一个监听全局背景音乐管理动作的执行状态管理的函数，前提音乐组件是需要经历整个组件的生命周期（v-if）
_recoverStatus() {
    if ( mBgmManager.paused ) { //  本来暂停情况，设置状态样式 -> 失败
        mBgmManager.pause()
        this.playing = false
        return
    }
    if (mBgmManager.src == this.properties.src) {   //  全局管理中的 src 和当前音乐组件的src匹配成功，设置状态样式 -> 成功
        this.playing = true
    }
}

// 监听函数, 监听全局管理器的状态 -> 同步设置状态样式
_onMbgmManagerStatus() {
    mBgmManager.onPlay(() => {
        this._recoverStatus()
    })
    mBgmManager.onPause(() => {
        this._recoverStatus()
    })
    mBgmManager.onEnded(() => {
        this._recoverStatus()
    })
    mBgmManager.onStop(() => {
        this._recoverStatus()
    })
}
```

### 生命周期
-   onLoad
    页面加载
-   onReady
    页面初始渲染完成
-   onShow
    页面显示
-   onHide
    页面隐藏
-   onUnLoad
    页面被卸载

## 数据请求
### 请求的封装
**wx.request**
success回调
fail回调触发条件:   网络中断等情况

`wx.request 封装`
```JAVASCRIPT
//  /util/http.js
import { config } from "../config.js"

const tips = {
  '1': '抱歉，出现了未知错误...',
  '1005': 'appKey无效',
  '3000': '刊期不存在'
}

class Http {
  //  请求方法
  request(params) {
    wx.request({
      url: config.API_BASE_URL + params.url,
      method: params.method || 'get',
      data: params.data || {},
      header: {
        'Content-Type': 'application/json',
        'appKey': config.APP_KEY
      },
      success: (res) => {
        let code = res.statusCode + '';
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else (code.startsWith('4')) {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  //  错误提示私有方法
  _show_error(error_code) {;
    (!error_code || !tips[error_code]) && (error_code = 1);
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
```

### **Promise 正确打开方式**
**基础使用**
```JAVASCRIPT
//  解决异步操作: 回调函数
//  纯 callback -> 容易回调地狱，剥夺函数 return
//  Promise     -> 代码风格（解决回调地狱代码可读性） 多个异步等待合并
//  async await 
const promise = new Promise((resolve, reject) => {
    wx.getSystemInfo({
        success:res =>  resolve(res),
        fail:err => reject(err) 
    })
})

promise.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

```
**改写Http&ClassicModel**
```JAVASCRIPT
class Http {
    request({url, data = {}, method = 'get'}) {
        return Promise((resolve,reject) => {
            wx.request({
                url: config.API_BASE_URL + url,
                method,
                data,
                header: {
                    'Content-Type': 'application/json',
                    'appKey': config.APP_KEY
                },
                success: (res) => {
                    let code = res.statusCode + ''
                    if (code.startsWith('2')) {
                        resolve(res.data)
                    } else (code.startsWith('4')) {
                        let error_code = res.data.error_code
                        this._show_error(error_code)
                        reject()
                    }
                },
                fail: (err) => {
                    this._show_error(err.data.error_code)
                    reject()
                }
            })
        })   
    }
}

```

### 各模块数据请求独立出各自的 `类` 并放置 models 文件下
**请求数据独立出来** 利于维护
```JAVASCRIPT
//  1.独立 classic模块的请求类
//  models/classic.js
import {Http} from "../util/http.js"
class Classic extends Http {
    //  获取期刊数据，回调函数返回数据
    getLatest(sCallback) {
        this.request({
            url: 'xxxx',
            success: (res) => {
                sCallback(res)
            },
            fail: (err) => {
                console.log(err)
            }
        })
    }
}
export { Classic }

//  2.模块调用类中请求的示例 /pages/classic/classic.js
import {
  Classic
} from "../../models/classic.js"
let classic = new Classic()
classic.getLatest((res) => {
    //  res
})
```

### 缓存机制的键入

**缓存数据带来的问题**
-   收藏
-   点赞
解决方法： 点赞和收藏两块单独做渲染，数据独立渲染，数据请求独立


**promise正确理解**

-   异步回调函数结果的接收
-   解决多层回调嵌套(回调地狱)

## 细节及适用
**flex 布局**
    inline-flex 自动适应宽度的 flex 模型

**事件**
-   band:tap 冒泡
-   catch:tap 阻止冒泡

## 基础
**自动换行元素设置margin-bottom无效**
解决方案： `给父容器设置 flex 布局`



## 工具
**随机字符串函数**
```javascript
const chars = ['1','2','3','4','5','6','7','8','9','0','a','b','c'];
const randomStr = function generateMixed(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * (chars.length - 1));
        res += chars[id];
    }
    return res;
}
export {
    randomStr
}
```
