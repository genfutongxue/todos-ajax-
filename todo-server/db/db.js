//这个文件是用来连接数据库的
//先引入mongoose模块
const mongoose=require("mongoose");
mongoose.set('useCreateIndex', true);

//然后连接数据库，返回一个promise对象，直接将这个对象导出去
module.exports=mongoose.connect("mongodb://127.0.0.1:27017/todo",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});