//只用于Easy_template这个html文件中

function template(id,data){
    var str=document.getElementById(id).innerHTML
    //\s*是去除空格
    var parrern=/{{\s*([a-zA-Z]+)\s*}}/

    var pattResult=null
    while (pattResult=parrern.exec(str)){
        str=str.replace(pattResult[0],data[pattResult[1]])
    }
    return str
}