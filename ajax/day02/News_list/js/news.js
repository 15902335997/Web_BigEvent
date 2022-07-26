$(function () {
    //获取新闻列表的函数
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news',
            function (res) {
                if (res.status !== 200) {
                    return alert('获取新闻失败')
                }
                for (var i = 0; i < res.data.length; i++) {
                    //把每一项的tags属性，从字符串改为字符串的数组
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                console.log(res)
                //数据获取成功
                var htmlStr = template('tpl-news', res)
                $('#news-list').html(htmlStr)
            })
    }

    getNewsList()
    //定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        //根据给定的字符串得到一个日期对象
        var dt = new Date(dtstr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义时间的补零函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
})