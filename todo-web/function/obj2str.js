//封装一个函数去处理data数据转换
function obj2str(data) {
    //要把data数据进行转换成"key=值&key=值"
    if (!data) return;
    let arr = [];
    for (const key in data) {
        arr.push(`${key}=${data[key]}`);
    }
    //把数组转换成标准格式的字符串并且返回出去
    return arr.join("&");
}