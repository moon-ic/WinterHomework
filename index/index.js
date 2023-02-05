//1——网络请求部分
// 推荐歌单
let tui = document.querySelectorAll(".tui");
let tuiPic = document.querySelectorAll(".tuiImg");
let boFang = document.querySelectorAll(".boFang");
let tuiP = document.querySelectorAll(".tuiP");
let id = [];
function getPicList() {
    fetch("http://why.vin:2023/personalized?limit=10")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                for (let i = 0; i < 10; i++) {
                    id[i] = json.result[i].id;
                    tuiPic[i].src = json.result[i].picUrl;
                    boFang[i].innerText = ">" + json.result[i].playCount;
                    tuiP[i].innerText = json.result[i].name;
                }
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败" + reason);
        })
}
// 最新音乐
let theSong = [];
let newImg = document.querySelectorAll(".newImg>img");
let newSong = document.querySelectorAll(".newSong");
let newSinger = document.querySelectorAll(".newSinger");
async function getNewList() {
    let data = await fetch("http://why.vin:2023/personalized/newsong?limit=12")
    let json = await data.json()
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        for (let i = 0; i < 12; i++) {
            newImg[i].src = json.result[i].picUrl;
            newSong[i].innerText = json.result[i].name;
            newSinger[i].innerText = json.result[i].song.artists[0].name;
            theSong[i] = json.result[i].id;
        }
    } else {
        console.log("请求错误" + json.code)
    }
    return { theSong }
}

// 轮播图
let card = document.querySelectorAll(".card");
let cardImg = document.querySelectorAll(".card img");
function getBanner() {
    fetch("http://why.vin:2023/banner")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                for (let i = 0; i < 6; i++) {
                    document.querySelectorAll(".imgs img")[i].src = json.banners[i].imageUrl;
                }
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}
// 初始化
async function init() {
    getPicList();
    getNewList();
    getBanner();
    for (let i = 0; i < 10; i++) {
        tui[i].onclick = () => goToList(id[i]);
    }
    const res = await getNewList();
    for (let i = 0; i < newImg.length; i++) {
        newImg[i].onclick = () => {
            window.location.href = "/play/play.html?id=" + theSong[i];
            return false;
        }
    }
    for (let i = 0; i < tuiPic.length; i++) {
        tuiPic[i].onclick = () => {
            location.href = "/playlistDetails/playlistDetails.html";
            return false;
        }
    }
}

init();

//2—— js原生
// 轮播图
window.addEventListener('load', function () {
    //获取元素
    var leftb = document.querySelector('.lefts');
    var rightb = document.querySelector('.rights');
    var box = document.querySelector('.cardBox');
    var imgs = box.querySelector('.imgs');
    var imgt = imgs.querySelectorAll('li');
    //自动翻页函数
    var timeone = setInterval(function () {
        rightf();
    }, 1000);

    // 按钮
    //左右按钮的出现
    box.addEventListener('mouseover', function () {
        leftb.style.display = 'block';
        rightb.style.display = 'block';
        //移入时清除定时器
        clearInterval(timeone);
        timeone = null;
    })
    //左右按钮的消失
    box.addEventListener('mouseout', function () {
        leftb.style.display = 'none';
        rightb.style.display = 'none';
        //恢复定时器
        clearInterval(timeone);
        timeone = setInterval(function () {
            rightf();
        }, 1000)
    })

    //动态生成小圆圈，小圈圈模块
    var list = box.querySelector('.list');
    for (var i = 0; i < imgs.children.length; i++) {
        var li = document.createElement('li');
        list.appendChild(li);
        li.setAttribute('index', i);
        li.addEventListener('click', colors);
        li.addEventListener('mouseenter', jump);
    }
    //一开始第二个亮(中间)
    list.children[1].className = 'change';
    //变色函数 
    function colors() {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].className = '';
        }
        var index = this.getAttribute('index');
        list.children[index].className = 'change';
    }
    //跳转函数
    function jump() {
        var index = this.getAttribute('index');
        var now = num.indexOf('two');
        //计算经过点与当前点的距离
        var dif = Math.max(index, now) - Math.min(index, now);
        // console.log(dis);
        if (index > now) {
            while (dif--) {
                rightf();
            }
        } else {
            while (dif--) {
                leftf();
            }
        }
    }
    //小圆圈跟随着图片移动
    var j = 1;
    function colort() {
        for (var i = 0; i < list.children.length; i++) {
            list.children[i].className = '';
        }
        if (j >= 6) {
            j = 0;
        } else if (j < 0) {
            j = 5;
        }
        list.children[j].className = 'change';
    }
    //翻页模块
    var num = ['one', 'two', 'three', 'four', 'five', 'six'];
    //右翻页
    rightb.addEventListener('click', rightf);
    function rightf() {
        //把数组的最后一个添加到第一个
        num.unshift(num[5]);
        //删除最后一个
        num.pop();
        //重新给li添加类名
        for (var i = 0; i < num.length; i++) {
            imgt[i].setAttribute('class', num[i]);
        }
        //通过这个全局变量来让小圆圈的颜色一起变化
        j++;
        colort();
    }
    //左翻页
    leftb.addEventListener('click', leftf)
    function leftf() {
        num.push(num[0]);
        num.shift();
        for (var i = 0; i < num.length; i++) {
            imgt[i].setAttribute('class', num[i]);
        }
        j--;
        colort();
    }
    //点击图片实现翻页,这里我是通过在左右两边添加一个盒子来实现的
    var rights = document.querySelector('.rightb');
    rights.addEventListener('click', function () {
        rightf();
    })
    var lefts = document.querySelector('.leftb');
    lefts.addEventListener('click', function () {
        leftf();
    })
})
