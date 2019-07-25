import {
    config
} from "../config.js"

const tips = {
    '1': '抱歉，出现了错误...',
    '1005': 'appKey失效,展示mock...',
    '3000': '刊期不存在'
}

class Http {
    request({
        url,
        data = {},
        method = 'GET'
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    //  私有request方法
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config._API_BASE_URL + url,
            method: method,
            data: data,
            header: {
                'Content-Type': 'application/json',
                'appKey': config.APP_KEY
            },
            success: (res) => {
                let code = res.statusCode + '';
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject(res.data)
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(err.data.error_code)
                reject()
            }
        })
    }

    //  私有方法： error 提示
    _show_error(error_code) {
        ;
        (!error_code || !tips[error_code]) && (error_code = 1);
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    Http
}