window.addEventListener('load', function () {
    // 鼠标经过触发事件 显示遮罩层和大图片
    var img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var bBox = document.querySelector('.bigbox');
    img.addEventListener('mousemove', function () {

        mask.style.display = 'block';
        bBox.style.display = 'block';
    })
    img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        bBox.style.display = 'none';
    })

    img.addEventListener('mousemove', function (e) {
        //  鼠标在盒子里的坐标
        var maskX = (e.pageX - this.offsetLeft) - (mask.offsetWidth / 2);
        var maskY = (e.pageY - this.offsetTop) - (mask.offsetHeight / 2);

        // 限制模态框移动范围
        var maxOffsetX = this.offsetWidth - mask.offsetWidth;
        var maxOffsetY = this.offsetHeight - mask.offsetHeight;

        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maxOffsetX) {
            maskX = maxOffsetX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maxOffsetY) {
            maskY = maxOffsetY;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图片跟随移动
        // 大图片移动距离 = 遮挡层移动距离 / 遮挡层最大移动离 * 大图片最大移动距离
        var bImg = bBox.querySelector('img');
        var bMaxOffset = bBox.offsetWidth - bImg.offsetWidth;
        bImg.style.left = maskX / maxOffsetX * bMaxOffset + 'px';
        bImg.style.top = maskY / maxOffsetY * bMaxOffset + 'px';


    })




});