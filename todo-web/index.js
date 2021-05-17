//获取数据库的内容，然后把数据库的内容渲染到页面上
const oTodo_main = document.querySelector(".todo-main");
const oTodo_footer = document.querySelector(".todo-footer");
const oTodo_none = document.querySelector(".todo-none");
const oTodo_header_input = document.querySelector(".todo-header input");

//获取所有数据并渲染到页面上的函数
function render(dataStr) {
    //这里先判断后台传过来的实参有没有内容，如果没有内容那就是个空数组，有内容那数组里面就有值，所以用数组的长度去判定
    if (dataStr.length === 0) {
        //要让页面中的两块内容消失,一块内容显示出来
        oTodo_main.style.display = "none";
        oTodo_footer.style.display = "none";
        oTodo_none.style.display = "block";
        //返回出去，不用执行后面的代码
        return;
    } else {
        //要让页面中的一块内容消失,两块内容显示出来
        oTodo_main.style.display = "block";
        oTodo_footer.style.display = "block";
        oTodo_none.style.display = "none";

        //然后处理传进来的数据
        // console.log(dataStr);//传进来的是一个数组，里面有每一条数据
        //那么就把这个数组进行遍历,用数组的reduce方法
        const arrItems = dataStr.reduce((preArr, item) => {
            //在推入的时候要判断下每一条数据的isDone的值，如果是true那么就要给input加上选中的标签
            preArr.push(`
              <li>
                <label>
                  <input type="checkbox" ${item.isDone === "true" ? "checked" : ""}  id="${item._id}"/>
                  <span>${item.todoItem}</span>
                </label>
                <button class="btn btn-danger"">删除</button>
              </li>`);
            return preArr;
        }, []);

        //判断全部数据的isDone的值为true的数量，如果等于dataStr.length那么就让全选框选中,先初始化一个计数器，然后遍历dataStr
        let doneNum = 0;
        dataStr.forEach((item, index) => {
            if (item.isDone === "true") {
                //计数器加一
                doneNum++;
            }
        });

        //拼接好字符串，并且根据获取到的数量去判断里面的内容
        const footerStr = `<label>
            <input type="checkbox" ${dataStr.length === doneNum ? "checked" : ""}/>
          </label>
          <span>
            <span>已完成 <i id="doneNum">${doneNum}</i></span> / 全部
            <i id="totalNum">${dataStr.length}</i>
          </span>
          <button class="btn btn-danger">清除已完成任务</button>`;

        //给oTodo_footer里的内容重新赋值
        oTodo_footer.innerHTML = footerStr;
        //把arrItems转为字符串用来添加到ul里头
        oTodo_main.innerHTML = arrItems.join("");


        //渲染完了之后就可以给footer下的标签绑定点击事件了

        //当点击footer下面的选框的时候，如果它是选中的，那么要把ul中所有的li都选中，也就是把数据库的所有数据的isDone都修改成true
        //如果没选中，就把所有的数据的isDone都修改成false状态，然后再重新获取渲染到页面上
        const oTodo_footer_input = document.querySelector(".todo-footer input");
        oTodo_footer_input.onclick = isCheckAll;

        //当点击footer下面的button按钮的时候，要把所有的isDone的状态为true的数据删除掉
        const oTodo_footer_button = document.querySelector(".todo-footer button");
        oTodo_footer_button.onclick = clearChecked;
    }
}

//因为向服务器发送请求获取数据库里的数据会跨域，所以这里用jsonp来实现跨域请求
function getContent(dataStr) {
    //调用渲染页面的函数
    render(dataStr);
}
//添加一个script标签，用这个标签去访问服务器去拿到数据并返回回来执行函数
//后端已经设置好了，发送这个请求就会去执行传过去的callback函数，并且会传回来后台查找到的数据作为实参去给这个函数调用
const script = document.createElement("script");
script.src = "http://127.0.0.1:5000/findAll?callback=getContent";
document.body.appendChild(script);





//增删改查----------------------------------------------

//增加数据的处理函数
oTodo_header_input.onkeyup = async function (e) {
    //按了回车才去执行下面的代码
    if (e.keyCode === 13) {
        //先获取到输入框的内容
        const value = oTodo_header_input.value.trim();
        //获取到之后把输入框的内容删除掉
        oTodo_header_input.value = "";
        //如果没有输入内容就直接返回出去了
        if (!value) return;
        //有内容就发送ajax请求过去，根据ajaxPost需要的参数传入一定的格式
        const options = {
            url: "http://127.0.0.1:5000/create",
            data: {
                todoItem: value
            },
        }
        //调用发送ajax请求的函数
        const dataStr = await ajaxPost(options);
        render(dataStr);
    }
}

//更改数据的处理函数，当点击单选框的时候，要根据input是否选中来改变数据库的内容，事件绑定
oTodo_main.onclick = async function (e) {
    //判定当点击的目标是input标签的时候
    if (e.target.getAttribute("type") === "checkbox") {
        const isDone = e.target.checked ? "true" : "false";
        //知道是要改成什么状态之后，那么就要去找到对应的id值
        const ids = JSON.stringify([e.target.id]);
        const options = {
            url: "http://127.0.0.1:5000/update",
            data: {
                isDone,
                ids
            }
        };
        const dataStr = await ajaxPost(options);
        render(dataStr);
    }
}

//点击ul那里的删除按钮的时候，要获取当前元素的id，然后去数据库里通过id删除该数据
//因为同样需要给ul事件绑定，所以用另一个不会覆盖前一个的方法去设置
oTodo_main.addEventListener("click", async (e) => {
    if (e.target.className === "btn btn-danger") {
        // console.log(e.target.parentNode);
        //知道了目标元素之后，就能获取到目标父元素，通过父元素去找到对应的input标签
        const inputDelete = e.target.parentNode.querySelector("input");
        // console.log(inputDelete.id);
        //获取到了id就可以去发送删除的ajax请求，然后数据库就会把传进去的id对应的数据删除掉
        const ids = JSON.stringify([inputDelete.id]);
        const dataStr = await ajaxPost({
            url: "http://127.0.0.1:5000/delete",
            data: {
                ids
            }
        });
        render(dataStr);
    }
});