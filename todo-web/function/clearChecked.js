//这里写的是清除已完成的任务的函数
async function clearChecked() {
    //获取到ul里所有的带有checked的input标签
    let oTodo_main_checkedInputs = document.querySelectorAll(".todo-main input[checked]");
    //同理，把它转成数组，再用数组的map方法
    oTodo_main_checkedInputs = Array.from(oTodo_main_checkedInputs);
    let ids = oTodo_main_checkedInputs.map((item) => {
        return item.id;
    });
    //因为发送ajax请求到删除接口需要传入字符串，所以先把ids转成JSON格式的字符串
    ids = JSON.stringify(ids);
    //发送ajax请求,并传入参数
    const dataStr = await ajaxPost({
        url: "http://127.0.0.1:5000/delete",
        data: {
            ids
        }
    });
    render(dataStr);
}