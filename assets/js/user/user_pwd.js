//表单验证
$(function () {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //samePwd给新密码框 将填写的值与原密码框中的值比较
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        //新密码和确认新密码输入的内容要相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码不一致'
            }
        }
    })

    //监听表单发起请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                //密码更新成功后重置表单
                // $('.layui-form')[0]将$元素转换为原生的dom元素，可以调用表单的reset方法
                $('.layui-form')[0].reset()

            }
        })
    })
})