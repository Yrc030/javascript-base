window.addEventListener('load', function () {
    // tab栏切换
    // 获取元素
    let tabList = document.querySelector('.detail_tab_list');
    let lis = tabList.querySelectorAll('li');
    let divs = document.querySelector('.detail_tab_con').querySelectorAll('div');
    divs[0].style.display = 'block';

    for (let i = 0; i < lis.length; i++) {
        // 给每个li添加index属性，用来控制对应的div
        lis[i].setAttribute('index', i);
        // 给每个li按钮绑定点击事件
        lis[i].addEventListener('click', function () {
            // 排他
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = '';
                divs[i].style.display = 'none';
            }
            // 存己
            this.className = 'current';
            let idx = this.getAttribute('index');
            divs[idx].style.display = 'block';
        });
    }

    // 放大镜效果
    // 获取元素
    let previewImg = document.querySelector('.preview_img');
    let mask = previewImg.querySelector('.mask');
    let bigBox = document.querySelector('.bigbox')

    // 1. 鼠标经过previewImg盒子 显示mask和bigBox
    previewImg.addEventListener('mouseover', overIn)

    function overIn() {
        mask.style.display = 'block';
        bigBox.style.display = 'block';
    }


    // 2. 鼠标离开previewImg盒子 隐藏mask和bigBox
    previewImg.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        bigBox.style.display = 'none';
        removeEventListener('mouseover', moveIn);

    })

    // 3. 鼠标在previewImg 盒子内移动，将鼠标的坐标赋给mask
    // （1）把鼠标在盒子内的坐标给遮挡层
    previewImg.addEventListener('mousemove', moveIn)

    function moveIn(e) {
        // （2）鼠标在盒子内的坐标 = 鼠标在页面中的坐标 - 盒子在页面中的坐标
        // 鼠标需要在mask的中心点， 因此要减mask一半的宽度和高度
        // 注意：offset是相对于有定位父级的偏移量，所有父级都没有定位才默认以body为参考点
        let maskY = e.pageY - previewImg.offsetTop - mask.offsetHeight / 2;

        let maskX = e.pageX - previewImg.offsetLeft - mask.offsetWidth / 2;

        // （3）遮挡层不能超出previewImg盒子范围
        // 计算遮罩层在previewImg盒子的最大移动范围
        // 用previewImg盒子宽度 - mask宽度 得到的就是 mask的left的最大值
        // 高度同理
        // 盒子是正方形因此只计算一个值也可以
        let maxLeft = previewImg.offsetWidth - mask.offsetWidth;
        let maxTop = previewImg.offsetHeight - mask.offsetHeight;

        // （4）高度和宽度的判断条件只能写在2个if语句中，不然无法同时判断
        // 判断宽度
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maxLeft) {
            maskX = maxLeft;
        }
        // 判断高度 
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maxTop) {
            maskY = maxTop;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // （5）移动黄色遮挡层，大图片跟随移动 
        // 计算大图片的移动距离公式
        // 两个盒子大小不同，但移动比例相同，因此：
        // 遮挡层移动距离(X1) / 遮挡层最大移动距离(M1) = 大图片移动距离(X2) / 大图片最大移动距离(M2)

        // X1、M1通过上面计算已知，X1 = (maskX，maskY)、M1 = (maxLeft,maxTop)
        // M2 可以计算 =bigbox的宽度和高度 - Img的宽度和高度 
        // 因此 X2 = X1 * M2/ M1 ;
        let img = bigBox.querySelector('img');
        // 计算大图片的最大移动距离，正方形只计算一个值即可
        let bigMax = bigBox.offsetWidth - img.offsetWidth;
        // 大图片得移动距离 X Y
        let bigX = maskX / maxLeft * bigMax;
        // 算出比例在*上大盒子得最大距离就等于大盒子得移动距离
        let bigY = maskY / maxTop * bigMax;
        img.style.left = bigX + 'px';
        img.style.top = bigY + 'px';
    }



});