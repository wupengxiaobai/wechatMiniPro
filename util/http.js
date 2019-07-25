import {
    config
} from "../config.js"

const tips = {
    '1': '抱歉，出现了未知错误...',
    '1005': 'appKey失效,展示mock...',
    '3000': '刊期不存在'
}

class Http {
    //  方法
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
                // console.log(res)
                let code = res.statusCode + '';
                if (code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else if (code.startsWith('4')) {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                    params.fail && params.fail(res.data)
                } else {
                    this._show_error(1)
                    params.fail && params.fail(res.data)
                }
            },
            fail: (err) => {
                this._show_error(1)
                params.fail && params.fail(error)
            },
            complete: () => {
                params.complete && params.complete()
            }
        })
    }

    //  私有方法
    _show_error(error_code) {
        ;
        // console.log(error_code);
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