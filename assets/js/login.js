$(function () {
    //点击”去登录“的链接，登录页面显示，注册页面隐藏
    $('.link-reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //点击“去注册账号”的链接，注册页面显示，登录页面隐藏
    $('.link-login').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //表单验证（用户名和密码的验证）
    //1.从layui中获取form对象
    var form = layui.form
    //2.通过form.verify函数自定义校验规则
    form.verify({
        //\S表示非空格
        'pwd': [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //value是确认密码框中的内容，还需要拿到密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致，请重新输入'
            }
        }
    })

    //调用接口发起注册用户的请求
    var layer=layui.layer
    $('#register').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        var data= {
            username: $('#register [name=username]').val(),
            password: $('#register [name=password]').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    // console.log('注册失败')
                    return layer.msg(res.message);
                }
                // console.log('注册成功')
                layer.msg('注册成功，请登录');
                //注册成功后自动跳转到登录页面
                $('.link-login').click()
            })
    })

    //调用接口发起登录的请求
    $('#login').on('submit',function (e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function (res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
               layer.msg('登录成功')
                //将登录成功后得到的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                // console.log(res.token)
                location.href='index.html'
            }
        })
    })

})