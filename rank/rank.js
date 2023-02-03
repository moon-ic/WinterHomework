// 创建歌单元素
let mainBox = document.querySelector(".earthBox");
function showRank() {
    let section = document.createElement('div');
    section.className = "bang";
    section.innerHTML =
        `<div class="bo"></div>
        <img src="/images/none.png" alt="">
        <div class="p"></div>`;
    mainBox.appendChild(section);
}
let theRank = [];
// 设置歌单跳转
function goTo1(a) {
    window.location.href = "/playlistDetails/playlistDetails.html?id=" + a;
}
// 设置歌曲跳转
function goTo2(a) {
    window.location.href = "/play/play.html?id=" + a;
}

//网络请求得到数据
// 获取排行榜歌单
async function getRankList() {
    let data = await fetch("http://why.vin:2023/toplist/detail")
    let json = await data.json()
    //判断网络请求返回的数据是否正确
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        for (let i = 1; i < 40; i++) {
            showRank();
        }
        // 官方
        for (let i = 0; i < 4; i++) {
            document.querySelectorAll(".pic>img")[i].src = json.list[i].coverImgUrl;
            theRank[i] = json.list[i].id;
        }
        // 总榜
        for (let i = 0; i < 39; i++) {
            document.querySelectorAll(".bang>img")[i].src = json.list[i + 4].coverImgUrl;
            document.querySelectorAll(".p")[i].innerText = json.list[i + 4].name;
            document.querySelectorAll(".bo")[i].innerText = ">" + json.list[i + 4].playCount;
        }
    } else {
        console.log("请求错误" + json.code)
    }
    return { theRank }
}
// 获取前五首歌曲
let theSong = [];
async function GetSong(res) {
    let { theRank } = res;
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 5; i++) {
            let data = await fetch("http://why.vin:2023/playlist/detail?id=" + theRank[j]);
            let json = await data.json();
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                if (j === 0) {
                    document.querySelectorAll(".song .name")[i].innerHTML = json.playlist.tracks[i].name;
                    document.querySelectorAll(".song .singer")[i].innerHTML = json.playlist.tracks[i].ar[0].name;
                    theSong[i] = json.playlist.tracks[i].id;
                }
                if (j === 1) {
                    document.querySelectorAll(".song .name")[i + 5].innerHTML = json.playlist.tracks[i].name;
                    document.querySelectorAll(".song .singer")[i + 5].innerHTML = json.playlist.tracks[i].ar[0].name;
                    theSong[i + 5] = json.playlist.tracks[i].id;
                }
                if (j === 2) {
                    document.querySelectorAll(".song .name")[i + 10].innerHTML = json.playlist.tracks[i].name;
                    document.querySelectorAll(".song .singer")[i + 10].innerHTML = json.playlist.tracks[i].ar[0].name;
                    theSong[i + 10] = json.playlist.tracks[i].id;
                }
                if (j === 3) {
                    document.querySelectorAll(".song .name")[i + 15].innerHTML = json.playlist.tracks[i].name;
                    document.querySelectorAll(".song .singer")[i + 15].innerHTML = json.playlist.tracks[i].ar[0].name;
                    theSong[i + 15] = json.playlist.tracks[i].id;
                }
            } else {
                console.log("请求错误" + json.code)
            }
        }
    }
    return { theSong }
}
//这里是初始化，你需要设置监听器，或者初始化一些网路数据
async function init() {
    // 网络请求
    let res = await getRankList();
    let w = await GetSong(res);
    // 歌单跳转
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll(".pic img")[i].onclick = () => goTo1(theRank[i]);
    }
    for (let i = 0; i < 39; i++) {
        document.querySelectorAll(".bang img")[i].onclick = () => goTo1(theRank[i]);
    }
    // 歌曲跳转
    for (let i = 0; i < 20; i++) {
        document.querySelectorAll(".song")[i].onclick = () => goTo2(theSong[i]);
    }
}

init()