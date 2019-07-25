// components/classic/music/index.js
import {
    classicBeh
} from "../classicBeh.js"

// 全局背景音乐管理器
let bgmManager = wx.getBackgroundAudioManager()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classicBeh],
    properties: {
        title: String,
        musicUrl: {
            type: String
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        tagImg: './images/music@tag.png',
        playingSrc: './images/player@playing.png',
        waittingSrc: './images/player@waitting.png',
        playStatus: 'waitting'
    },

    attached() {
        // 组件创建时进行状态更正
        this._recoverStatus()
        // 音乐状态更新监听
        this._monitorSwitch()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 音乐播放状态修改
        changeMusicStatus() {
            if (this.data.playStatus == 'waitting') { //  如果当前是暂停 -》 播放
                this.setData({
                    playStatus: 'playing'
                })
                bgmManager.src = this.properties.musicUrl;
                bgmManager.title = this.properties.title || '音乐';

            } else { //  当然是播放 -》 暂停    
                this.setData({
                    playStatus: 'waitting'
                })
                // 暂停播放
                bgmManager.pause()
            }
        },

        //  更正播放状态
        _recoverStatus() {
            // console.log('创建时触发 _recoverStatus 正在播放音乐src => ', bgmManager.src)
            // console.log('当前组件的音乐对应src => ', this.properties.musicUrl)
            //  如果本来就是停止的，设置为等待状态
            if (bgmManager.paused) {
                this.setData({
                    playStatus: 'waitting'
                })
                return
            }
            if (bgmManager.src == this.properties.musicUrl) { // 如果全局管理的背景音乐播放的是当前音乐路径，修改状态为播放
                this.setData({
                    playStatus: 'playing'
                })
            }
        },

        //  音乐播放器事件监听（背景播放）
        _monitorSwitch() {
            bgmManager.onPlay(() => {
                this._recoverStatus()
            })
            bgmManager.onPause(() => {
                this._recoverStatus()
            })
            bgmManager.onEnded(() => {
                this._recoverStatus()
            })
            bgmManager.onStop(() => {
                this._recoverStatus()
            })
        }
    }
})