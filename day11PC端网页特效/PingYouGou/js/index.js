// 注册加载事件
window.addEventListener('load', function () {
    // 获取箭头按钮
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');

    // 获取focus
    var focus = document.querySelector('.focus');
    // 网页在缩放是会出现1px的偏差
    var focusWd = focus.offsetWidth;

    // 获取需要移动的盒子
    var ul = focus.querySelector('ul');


    // 动态创建圆点按钮
    // 获取元素
    var dot = document.querySelector('.dot');

    for (var i = 0; i < ul.children.length; i++) {
        // 创建并添加节点
        var li = document.createElement('li');
        dot.appendChild(li);
        // 给li设置索引号切换图片
        li.setAttribute('index', i);

        //给dot.li添加点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < dot.children.length; i++) {
                dot.children[i].className = '';
            }
            this.className = 'current';

            // 点击圆点按钮切换图片
            var idx = this.getAttribute('index');
            // 将圆点按钮与箭头按钮 同步
            num = idx;

            // 给动画函数传参
            // 目标值 = idx * focus宽度
            // 网页在缩放是会出现1px的偏差
            animate(ul, -(idx * (focusWd)));

        })
    }

    // 默认第一个被选中
    dot.children[0].className = 'current';


    // 鼠标经过focus显示箭头按钮，离开隐藏
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block'

        // 鼠标经过con 停止自动播放定时器
        clearInterval(timer);
        // 不用了最好清空
        timer = null

    })

    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none'

        // 鼠标离开 开启自动播放定时器
        timer = setInterval(function () {
            // 手动调用点击事件
            next.click();
            // 相当于每隔两秒触发next按钮的点击事件
            // 我他妈直接好家伙


        }, 2000)

    })
    // 箭头按钮切换图片
    // 利用num变量控制
    var num = 0;
    // 克隆并添加ul.firstli 实现无缝滚动
    var firstLi = ul.children[0].cloneNode(true);
    ul.appendChild(firstLi);
    // 使得圆点按钮与箭头按钮同步
    var dNum = 0;
    // 右箭头按钮绑定点击事件
    next.addEventListener('click', function () {
        // 控制盒子移动范围
        if (num == (ul.children.length - 1)) {
            ul.style.left = '0px';
            num = 0;
        }
        // 每点击一次num++
        num++;

        dNum = num % (ul.children.length - 1);
        console.log(dNum, num);
        changeDot(dot);
        // for (var i = 0; i < dot.length; i++) {
        //     dot.children[i].className = '';
        // }
        // dot.children[dNum].className = 'current';

        animate(ul, -(num * focusWd));



    })
    // 左箭头按钮绑定点击事件

    prev.addEventListener('click', function () {
        // 控制盒子移动范围
        if (num == 0) {
            num = (ul.children.length - 1);
            ul.style.left = -(num * focusWd) + 'px';

        }
        // 每点击一次num--
        num--;


        // 使得圆点按钮与箭头按钮同步
        dNum = num % (ul.children.length - 1);
        changeDot(dot);

        animate(ul, -(num * focusWd));


    })

    // 改变圆点按钮样式函数
    function changeDot(obj) {
        for (var i = 0; i < obj.children.length; i++) {
            obj.children[i].className = '';
        }
        obj.children[dNum].className = 'current';
    }

    // 自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        next.click();
        // 相当于每隔两秒触发next按钮的点击事件
        // 我他妈直接好家伙


    }, 2000)


})