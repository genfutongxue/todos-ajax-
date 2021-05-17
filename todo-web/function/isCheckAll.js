//这里写的是全选的函数
async function isCheckAll() {
    //先获取到选框的结果是选中还是未选中
    const isChecked = this.checked;
    //获取到所有的ul中的input标签，用这种方法获取到的集合只有forEach方法，没有数组的其他方法，所以这里把它转成数组
    let oTodo_main_inputs = document.querySelectorAll(".todo-main input");
    oTodo_main_inputs = Array.from(oTodo_main_inputs);
    //map方法返回一个新数组
    let ids = oTodo_main_inputs.map((item) => {
        return item.id;
    });
    //然后把数组转成JSON格式的字符串,用来传进更新数据的请求里面
    ids = JSON.stringify(ids);
    //使用ajax发送更新数据的请求
    const dataStr = await ajaxPost({
        url: "http://127.0.0.1:5000/update",
        data: {
            ids,
            isDone: isChecked
        }
    });
    render(dataStr);
}