// 转换的方法
function goTo(a) {
    window.location.href = "/play/play.html?id=" + a;
}
// 歌盒子
let mainBox = document.querySelector(".mainBox");
function showRank() {
    let section = document.createElement('div');
    section.innerHTML =
        ` <div class="newBox" >
    <div class="num">1</div>
    <div class="img"><img src="/images/index1.png" alt=""></div>
    <div class="name"></div>
    <div class="singer"></div>
    <div class="album"></div>
    <div class="time"></div></div>`
    mainBox.appendChild(section);
}

let theSong = [];
let m = 100;
// 展示数据
async function getNewList() {
    let data = await fetch("http://why.vin:2023/personalized/newsong?limit=100")
    let json = await data.json()
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        for (let i = 1; i < 100; i++) {
            showRank();
            document.querySelectorAll(".num")[i].innerHTML = i + 1;
        }
        for (let j = 0; j < 100; j++) {
            document.querySelectorAll(".img>img")[j].src = json.result[j].picUrl;
            document.querySelectorAll(".name")[j].innerHTML = json.result[j].name;
            document.querySelectorAll(".singer")[j].innerHTML = json.result[j].song.artists[0].name;
            document.querySelectorAll(".album")[j].innerHTML = json.result[j].song.album.name;
            theSong[j] = json.result[j].id;
        }
    } else {
        console.log("请求错误" + json.code)
    }
    return { theSong }
}

async function init() {
    const res = await getNewList();
    for (let i = 0; i < m; i++) {
        document.querySelectorAll(".pic")[i].onclick = () => goTo(theSong[i]);
    }
}

init();