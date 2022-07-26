// function getCommentList() {
//   $.ajax({
//     method: 'GET',
//     url: 'http://www.liulongbin.top:3006/api/cmtlist',
//     success: function (res) {
//       if (res.status !== 200) return alert('获取评论列表失败！')
//       var rows = []
//       $.each(res.data, function (i, item) {
//         var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>'
//         rows.push(str)
//       })
//       $('#cmt-list').empty().append(rows.join(''))
//     }
//   })
// }
//
// getCommentList()
//
// $(function () {
//   $('#formAddCmt').submit(function (e) {
//     e.preventDefault()
//     var data = $(this).serialize()
//     $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
//       if (res.status !== 201) {
//         return alert('发表评论失败！')
//       }
//       getCommentList()
//       $('#formAddCmt')[0].reset()
//     })
//   })
// })
function getCommentList() {
    $.ajax({
        //获取服务器的数据
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        success: function (res) {
            if (res.status !== 200) {
                return alert('获取评论列表失败')
            }
            //创建一个空数组
            var rows = []
            //遍历数据，并将用户输入的内容给str，然后加入到数组里面
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"> <span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span> <span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>'
                rows.push(str)
            })
            //先将原来的列表清空，然后将上面新数组的内容显示到列表里面
            $('#cmt-list').empty().append(rows.join(''))
        }
    })
}

getCommentList()

$(function (){
    //给表单添加提交的事件
    $('#formAddCmt').submit(function (e){
        //阻止默认的提交和跳转事件
        e.preventDefault()
        //快速获取表单的数据
        var data=$(this).serialize()
        //给服务器发送数据
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,
            function (res){
            if(res.status!==201){
                return alert('发送评论失败')
                }
            //发送数据成功后再调用getCommentList()重新加载表单
            getCommentList()
                //清空输入框中的内容(重置表单)
                $('#formAddCmt')[0].reset()
            })
    })
})