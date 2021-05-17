//这里写给数据库增加的内容

//先引入数据库
const model=require("../model");

//创建一个函数，当调用这个函数就增加内容
function createItems(document){
    //把传入的参数对象,在数据库生成内容
    return model.create(document);
}

//把增加内容的方法导出去
module.exports.createItems=createItems;
