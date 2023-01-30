function goTo(a) {
    window.location.href = "/playlistDetails/playlistDetails.html?id=" + a;
}
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
let newImg = document.querySelectorAll(".newImg>img");
let newSong = document.querySelectorAll(".newSong");
let newSinger = document.querySelectorAll(".newSinger");
function getnewList() {
    fetch("http://why.vin:2023/personalized/newsong?limit=12")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                for (let i = 0; i < 12; i++) {
                    newImg[i].src = json.result[i].picUrl;
                    newSong[i].innerText = json.result[i].name;
                    newSinger[i].innerText = json.result[i].song.artists[0].name;
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
for (i = 0; i < tuiPic.length; i++) {
    tuiPic[i].onclick = () => {
        location.href = "/playlistDetails/playlistDetails.html";
        return false;
    }
}
for (i = 0; i < newImg.length; i++) {
    newImg[i].onclick = () => {
        location.href = "/playlist/playlist.html";
        return false;
    }
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
                for (let i = 0; i < 7; i++) {
                    cardImg[i].src = json.banners[i].imageUrl;
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
function init() {
    getPicList();
    getnewList();
    getBanner();
    for (let i = 0; i < 10; i++) {
        tui[i].onclick = () => goTo(id[i]);
    }
}
init();

//2—— js原生
// 轮播图
