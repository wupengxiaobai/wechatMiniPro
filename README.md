# 微信小程序开发实战

## 结构目录
```
|- pages
|- components


```


## app.json
-   window 全局配置
**navigationBar的消失，直接内容内嵌到手机中**
```json
{
    "window":{
        // navigationBar不展示
        navigationBarStyle: "custom",
        // 窗口颜色
        backgroundColor:"#f9f9f9"
    }
}
```


## 开发模式

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
properties: {
    oneAttr: {
        type: Number,//  必须
        value: true,
        observer: function () {}
    }
}

**自定义组件生命周期**
```JS
Component({
    //  组件生命周期
    lifetimes: {
        attached: function() {
            //  组件实例进入页面节点树时执行
        },
        detached: function() {
            //  组件实例被从页面节点树移除时执行
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

**组件继承全局样式**
font color 
page页样式都会继承全局样式

## 小程序
**基础**
插值表达式 {{}}
支持三元运算符

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

### 请求
**wx.request**
success回调
fail回调触发条件:   网络中断等情况

`wx.request 二次封装`


**promise正确理解**
-   异步回调函数结果的接收
-   解决多层回调嵌套(回调地狱)

## 细节及适用
**flex 布局**
    inline-flex 自动适应宽度的 flex 模型


**事件**
-   band:tap 冒泡
-   catch:tap 阻止冒泡

