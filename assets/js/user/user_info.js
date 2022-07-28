$(function () {
    //表单验证
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度必须在1-6位数之间'
            }
        }
    })
    initUserInfo()

//初始化用户的基本信息
    var layer = layui.layer

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res)
                //调用form.val()快速为表单赋值  将登录名称 用户昵称等信息填充到文本框里
                form.val('formUserInfo', res.data)
            }
        })
    }

//重置按钮
    $('#btnReset').on('click', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault()
        //
        initUserInfo()
    })
    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //快速拿到表单中填写的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户的信息失败')
                }
                layer.msg('更新用户信息成功')
                //调用父页面中的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })

})
