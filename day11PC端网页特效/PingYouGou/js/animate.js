     // 将动画函数写入js文件，需要使用时直接引用即可
     // 使用DOMContentLoaded 加载事件，当初始HTML文档完全加载后，DOMContentLoaded事件被触发，无需等待样式表、图片、子框架


     function animate(obj, target, callback) {
         clearInterval(obj.timer);
         obj.timer = setInterval(function () {
             let x = obj.offsetLeft;
             let step = (target - x) / 10;
             step = step > 0 ? Math.ceil(step) : Math.floor(step);
             if (x == target) {
                 clearInterval(obj.timer);
                 callback && callback();
             }

             obj.style.left = x + step + 'px';
         }, 15);
     }