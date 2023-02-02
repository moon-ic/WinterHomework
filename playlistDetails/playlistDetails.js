function goTo(a) {
    window.location.href = "/play/play.html?id=" + a;
}
// 展示歌曲方法
let mainBox = document.querySelector(".songBox");
function show() {
    let section = document.createElement('div');
    section.className = "song";
    section.innerHTML =
        `  <div class="num"></div>
        <div class="songId"></div>
        <div class="singer"></div>
        <div class="album"></div>
        <div class="time"></div>
        <div class="clearfix"></div><!-- 清除浮动 -->`
    mainBox.appendChild(section);
}
//获取参数方法
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//使用获取参数方法
const id = GetUrlParam("id");

// 展示
let theSong = [];
let m = 0;
async function getplayList() {
    let data = await fetch("http://why.vin:2023/playlist/detail?id=" + id)
    let json = await data.json()
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        if (json.fromUsers != null) document.querySelector(".from").innerText = json.fromUsers;
        document.querySelector(".names").innerText = json.playlist.name;
        document.querySelector(".introduceBox>img").src = json.playlist.coverImgUrl;
        document.querySelector(".biaoqian").innerText = "标签： " + json.playlist.tags;
        document.querySelector(".count").innerText = "播放： " + json.playlist.playCount;
        document.querySelector(".songCount").innerText = "歌曲： " + json.playlist.trackIds.length;
        m = json.playlist.trackIds.length;
        console.log("m:" + m + "\n");
        console.log(json);
        document.querySelector(".des").innerText = json.playlist.description;
        // songBox
        for (let i = 1; i < json.playlist.trackIds.length; i++) {
            show();
            document.querySelectorAll(".num")[i].innerHTML = i;
            theSong[i] = json.playlist.trackIds[i].id;
            //console.log(theSong[i]);
        }
    } else {
        console.log("请求错误" + json.code)
    }
    return { m, theSong }
}

async function GetSong(res) {
    let { m, theSong } = res
    for (let i = 0; i < m; i++) {
        fetch("http://why.vin:2023/song/detail?ids=" + theSong[i])
            //这里是将数据json字符串转为对象
            .then(data => data.json())
            .then(json => {
                //判断网络请求返回的数据是否正确
                if (json.code === 200) {
                    // 如果正确就调用显示数据的方法
                    document.querySelectorAll(".songId")[i].innerHTML = json.songs[0].name;
                    document.querySelectorAll(".singer")[i].innerHTML = json.songs[0].ar[0].name;
                    document.querySelectorAll(".album")[i].innerHTML = json.songs[0].al.name;
                } else {
                    console.log("请求错误" + json.code)
                }
            })
            .catch(reason => {
                //请求失败的异常情况
                console.log("请求失败")
            })
    }
}

async function init() {
    let res = await getplayList();
    GetSong(res);
    for (let i = 0; i < m; i++) {
        document.querySelectorAll(".song")[i].onclick = () => goTo(theSong[i]);
    }
}

init();