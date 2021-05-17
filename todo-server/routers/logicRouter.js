const express = require("express");

//创建路由器对象
const router = express.Router();

//引用添加数据库的方法
const {
    createItems
} = require("../db/CRUD/create");

//引入findAll方法
const {
    findAll
} = require("../db/CRUD/find");

//引入更新数据的方法
const {
    update
} = require("../db/CRUD/update");

//引入删除数据的方法
const {
    deleteItem
} = require("../db/CRUD/delete");

//设置get请求的路由
router.get("/findAll", async (request, response) => {
    //去数据库查找到所有数据响应给浏览器
    const data = await findAll();
    //找到数据后要把数据转换成JSON格式的字符串
    const dataStr = JSON.stringify(data);
    //获取到get请求的时候url里查询字符串传进来的函数
    const {
        callback
    } = request.query;

    //拼接字符串并且响应给浏览器，浏览器会自动解析字符串，所以函数会调用
    const callbackStr = `${callback}(${dataStr})`;
    response.send(callbackStr);
});

//设置post请求增加内容的路由
router.post("/create", async (request, response) => {
    //获取到请求主体的数据并且把它添加到数据库中
    const {
        todoItem
    } = request.body;

    //调用存数据的方法把数据存在数据库中
    await createItems({
        todoItem
    });
    //存完了之后要重新获取到最新数据
    const data = await findAll();
    //找到数据之后，把数据响应给浏览器
    response.send(data);
});

//设置post请求更新修改数据的接口
router.post("/update", async (request, response) => {
    //获取到要修改的数据
    let {
        ids,
        isDone
    } = request.body;
    ids = JSON.parse(ids);
    //更新数据
    await update(ids, isDone);
    //更新完了之后就重新查找全部数据返回给前端
    const data = await findAll();
    //找到数据之后，把数据响应给浏览器
    response.send(data);
});

//设置一个删除数据的接口
router.post("/delete", async (request, response) => {
    //获取到要删除的数据
    let {
        ids
    } = request.body;
    ids=JSON.parse(ids);
    //调用删除数据的方法
    await deleteItem(ids);
    //删除完了之后重新获取到全部数据库的数据并返回给前端
    const data = await findAll();
    //找到数据之后，把数据响应给浏览器
    response.send(data);
});

//把路由器导出去
module.exports = router;