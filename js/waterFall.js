class WaterFall {
    constructor(wrapper, pictures) {
        this.wrapper = wrapper;
        this.pictures = pictures;
        // 
        this.container = this.wrapper.getElementsByClassName('grid-item');
        this.imagesHeightAry = [];
        this.baseAry = [],
            this.flag = true;
        this.init(this.pictures, this.wrapper, this.imagesHeightAry, this.baseAry, this.container, this.flag);

    }
    //给计算高度数组添加默认值
    setAryDefaultValue(ary, len) {
        for (let i = 0; i < len; i++) {
            ary[i] = 0;
        }
    }
    //插入一张图片
    insertOneImg(imgSrc, ary, container, ary2, index) { //, ary2指的是图片高度集合，index指的是图片高度集合数组中的Index
        let _min = Math.min(...ary), _minIndex = ary.indexOf(_min);
        container[_minIndex].innerHTML += `<img src = ./img/${imgSrc}>`;
        ary[_minIndex] += ary2[index];
    }
    // 初始化
    placeAllImages(images, imagesHeightAry, baseAry, container) {
        let _that = this;
        let count = 0;
        imagesHeightAry = [];
        images.forEach((item, index) => {
            let tempImg = new Image();
            tempImg.src = `./img/${item}`;
            tempImg.onload = function () {
                let _w = this.width, _h = this.height;
                _h = (100 / _w) * _h;
                imagesHeightAry[index] = _h;
                count++;
                if (count === images.length) {
                    // 依次插入所有的图片 insert all the images in the order.
                    images.forEach((item, index) => {
                        _that.insertOneImg(item, baseAry, container, imagesHeightAry, index);
                    });
                    _that.flag = true;
                }
            }
        });
    }
    //滚动加载
    scrollLoad(images){
            let _wh = this.wrapper.offsetHeight,
            _cH = document.documentElement.clientHeight,
            _scrollH = document.documentElement.scrollTop;
            if (_scrollH + _cH + 10> _wh && this.flag) {
                this.flag = false;
                this.placeAllImages(images, this.imagesHeightAry, this.baseAry, this.container);
            } 
    }
    init(images, wrapper, imagesHeightAry, baseAry, container) {
        this.setAryDefaultValue(baseAry, container.length);
        this.placeAllImages(images, imagesHeightAry, baseAry, container);
        window.onscroll = () => {

        }
    }
}
