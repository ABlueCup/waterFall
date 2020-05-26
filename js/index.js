let waterFallRender = (function () {
    let pictures = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"
    ],
        imageSizeAry = [], //存储所有图片的高度
        _ary = [], //存储每列的高度
        waterFall = document.getElementById('waterFall'),
        liHeightContainer = waterFall.getElementsByClassName('grid-item')
        ;
    // 插入一张图片
    let placeOne = function placeOne(image, index) {
        let _min = Math.min(..._ary), _minIndex = _ary.indexOf(_min);
        liHeightContainer[_minIndex].innerHTML += `<img src= ./img/${image}>`;
        _ary[_minIndex] += imageSizeAry[index]; //修改数组
    }
    // 插入所有的图片
    let insertAllImages = function insertAllImages(images) {
        //插入所有图片前，需要将每列的html清空
        images.forEach((item, index) => {
            placeOne(item, index);
        });
    }
    // 给计算高度数组添加默认值
    let addDefaultValue = (ary, len) => {
        for (let i = 0; i < len; i++) {
            ary[i] = 0;
        }
    }
    // 图片预加载, 计算出所有图片的宽度、高度，根据列的宽度计算高度，根据高度排列顺序, 100 / _ w = _H / _h _H = _h * (100/_w)
    
    let placeAllPictures = function (images, callback) {
        let count = 0;
        imageSizeAry=[];
        images.forEach((item, index) => {
            let tempImage = new Image();
            tempImage.src = `./img/${item}`;
            tempImage.onload = function () {
                let _w = this.width, _h = this.height;
                _h = (100 / _w) * _h;
                imageSizeAry[index] = _h;
                count++;
                if (count === images.length) {
                    callback(images);
                    flag = true;
                }
            }
        });
    }

    // 滚动事件
    let flag = true;
    let scrollEve = function scrollEve() {
        let _wh = waterFall.offsetHeight, _cH = document.documentElement.clientHeight, _scrollH = document.documentElement.scrollTop;
        if (_scrollH + _cH + 10 > _wh && flag) {
            flag = false;
            placeAllPictures(pictures, insertAllImages);
        }
    }

    return {
        init: function init() {
            addDefaultValue(_ary, liHeightContainer.length);
            placeAllPictures(pictures, insertAllImages);
            window.onscroll = scrollEve;
        }
    }
})();
waterFallRender.init();




    // // 获取当前所有列的高度
    // let getAllLiHeight = function getAllLiHeight() {
    //     [].forEach.call(liHeightContainer, (item, index) => {
    //         let liHeight = item.offsetHeight;
    //         _ary[index] = liHeight;
    //     });
    // }
