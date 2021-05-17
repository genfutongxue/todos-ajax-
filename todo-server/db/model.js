//这个文件是设置数据对象的
const mongoose = require("mongoose");
//设置Schema对象
const Schema = mongoose.Schema;
//设置自己定义的Schema对象
const mySchema = new Schema({
    todoItem: {
        type: String,
        required: true,
        unique: true,
    },
    isDone: {
        type: String,
        default: "false",
    },
});

//然后创建model对象
const model = mongoose.model("items", mySchema);
//将这个model对象导出去
module.exports = model;