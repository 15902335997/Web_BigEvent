//封装自己的ajax函数

//将data对象转换成查询字符串的形式
function resolveData(data) {
    var arr = []
    for (var k in data) {
        var str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// var res=resolveData({name:'zs',age:20})
// console.log(res)

//定义itheima函数   options是外界传过来的page选项
function itheima(options) {
    var xhr = new XMLHttpRequest()
    //把外界传递过来的参数对象转化为查询字符串
    var qs = resolveData(options.data)

    //判断请求的类型
    if (options.method.toUpperCase() === 'GET') {
        //发起GET请求  直接将提交的参数放到url后面
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        //发起POST请求  将用户提交的参数放在send函数里面
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)
    }

    //监听请求状态改变的事件
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //将返回的数据转换成字符串的形式，并且给result
            var result = JSON.parse(xhr.responseText)
            //调用options的success回调函数  帮用户执行成功后的操作
            options.success(result)
        }
    }
}

