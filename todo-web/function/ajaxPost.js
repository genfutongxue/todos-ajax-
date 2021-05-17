//封装一个函数去进行ajax请求
function ajaxPost(options) {
    return new Promise((resolve, reject) => {
        //把传入的参数进行解构，得到需要请求的信息
        const {
            url,
            data
        } = options;
        //如果没有url就直接返回了
        if (!url) return;
        //创建xhr对象
        const xhr = new XMLHttpRequest();
        xhr.open("post", url);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //要把data数据进行转换成"key=值&key=值"
        const params = obj2str(data);
        xhr.send(params);
        //监听发送请求的状态
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //那么就是成功了，成功了就把响应的数据响应给浏览器，先把数据转成js对象
                const obj = JSON.parse(xhr.responseText);
                resolve(obj);
            }
        }
    });
}