//这里写查询数据库的方法

//先引入数据库
const model=require("../model");

//查询所有的数据的函数
function findAll(){
    //调用find方法返回的是一个promise对象，成功之后返回值就是查询得到的值
    return model.find();
}


//给导出去的对象增加一个方法
module.exports.findAll=findAll;