$(function () {
    //调用getUserInfo()函数，获取用户的基本信息
    getUserInfo()

    //点击退出 返回到登录界面 事件
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', {icon: 3, title: '提示'}, function (index) {
            //用户点击确定之后执行
            //清空本地存储的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = 'login.html'
            //关闭询问框 默认有的
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //获取成功后渲染用户头像
            renderAvatar(res.data)
        }
        //写在了baseAPI里面
        
        // //不论成功还是失败都调用complete()函数  控制用户的访问权限
        // complete: function (res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //跳转到登录页面
        //         location.href='login.html'
        //     }
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称  nickname优先于username
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //用户有图片头像，渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        //获取用户名中的第一个字符，并且将其改为大写字母
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}