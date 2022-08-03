$(function () {
    initArtCateList()

    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                //使用模板引擎渲染表格的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //给添加类别按钮添加点击事件，使其点击之后弹出一个弹出层
    var layer = layui.layer
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理的形式为表单绑定submit事件
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('添加失败！')
                    layer.open(indexAdd)

                    return
                }
                layer.msg('添加成功！')
                layer.open(indexAdd)
                initArtCateList()
            }
        })
    })

    //通过代理的方式为编辑按钮绑定点击事件
    var indexEidt = null
    var form = layer.form
    $('tbody').on('click', '#btn-edit', function () {
        indexEidt = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        //data-id是自定义属性，用来获取每一行内容的ID
        //发起ajax请求，获取对应分类的数据
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    //给确认修改按钮添加点击事件，使得修改后的信息发送到服务器，再渲染到页面上
    $('tbody').on('click','#changeSure',function (e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$('#form-edit').serialize(),
            success:function (res){
                if(res.status!==0){
                    layer.msg('修改文章类别失败！')
                }
                layer.msg('修改文章类别成功！')
                //关闭弹出层
                layer.close(indexEidt)
                //更新列表
                initArtCateList()
            }
        })
    })

    //给删除按钮绑定点击事件，使得点击删除按钮之后，那一列的内容就从页面上删除
    $('tbody').on('click','#btn-del',function (){
        var id=$(this).attr('data-Id')
        //提示用户是否要删除
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function (res){
                    if(res.status!==0){
                        layer.msg('删除失败！')
                        return
                    }
                    layer.msg('删除成功')
                    //关闭提示层
                    layer.close(index);
                    initArtCateList()
                }
            })
        })
    })
})