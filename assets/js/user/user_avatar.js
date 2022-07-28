$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //给上传图片绑定点击事件
    $('#btnUpload').on('click', function () {
        //给隐藏的上传文件框模拟一个点击事件
        $('#file').click()
    })

    //将上传的图片换到剪裁框里
    //给文件选择框绑定change事件 只要发生变化，就会执行下面函数
    var layer = layui.layer
    $('#file').on('change', function (e) {
        //这里的e是用户上传的文件
        //获取用户上传的文件列表
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择图片！')
        }

        //将上传的图片换到剪裁框里
        var file = e.target.files[0]
        //获取上传图片的URL地址
        var newUrl = URL.createObjectURL(file)
        //先将原来的头像图片销毁，再换上新的
        $image.cropper('destroy')
            .attr('src', newUrl)
            .cropper(options)
    })

    //给确定按钮绑定点击事件
    $('#btnSure').on('click',function (){
        //这一部分是直接粘贴的代码
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //将头像上传到服务器，然后渲染头像
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function (res){
                if(res.status!==0){
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                //调用父页面的getUserInfo()函数，重新获取用户信息渲染头像
                window.parent.getUserInfo()
            }
        })
    })
})

