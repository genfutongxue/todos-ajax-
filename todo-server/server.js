;(async function () {
    const express = require("express");
    const app = express();

    //引入数据库,等数据库连接成功之后再执行后面的代码
    await require("./db/db");
    console.log("数据库连接成功");

    //引入cors第三方包（实现跨域资源共享的中间件）
    const cors=require("cors");
    //使用这个中间件
    app.use(cors());

    //这行代码(中间件)是为了使用post请求时能获取到request.body的内容
    app.use(express.urlencoded({
        extended: true
    }));

    //引入路由器并且使用
    const logicRouter = require("./routers/logicRouter");
    app.use(logicRouter);

    //设置路由的使用
    app.listen(5000, () => console.log("服务器开启成功"));
})();