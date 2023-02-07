let doc = document;
function goToPlay(a) {
    window.location.href = "/play/play.html?id=" + a;
}
function goToList(a) {
    window.location.href = "/playlistDetails/playlistDetails.html?id=" + a;
}
function goToReas(a) {
    window.location.href = "/search/search.html?keywords=" + a;
}
//获取参数方法
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
// 个人信息
// 1-id
async function getUerId() {
    let data = await fetch("http://why.vin:2023/user/account");
    let json = await data.json()
    let userId;
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        userId = json.account.id;
        console.log(userId);
    } else {
        console.log("请求错误" + json.code)
    }
    return { userId };
}

// 2-信息
async function getInfo(a) {
    let data = await fetch("http://why.vin:2023/user/detail?uid=" + a);
    let json = await data.json()
    let playlistCount;
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        doc.querySelector("#touXiang>img").src = json.profile.avatarUrl;
        doc.querySelector("#niCheng").innerHTML = json.profile.nickname;
        playlistCount = json.profile.playlistCount;
    } else {
        console.log("请求错误" + json.code)
    }
    return { playlistCount };
}

// 3-左侧歌单
// 歌盒子
let shellBox = document.querySelector(".shellBox");
function showShell() {
    let section = document.createElement('div');
    section.className = "shell";
    section.innerHTML = `<img src="/images/music.png" class="music">歌单1`
    shellBox.appendChild(section);
}

async function getUList(a) {
    let data = await fetch("http://why.vin:2023/user/playlist?uid=" + a);
    let json = await data.json()
    let playlistId = [];
    let l = json.playlist.length;
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        for (let i = 1; i < l; i++) {
            showShell();
            playlistId[i] = json.playlist[i - 1].id;
            doc.querySelectorAll(".shell")[i].innerHTML = `<img src="/images/music.png" class="music">` + json.playlist[i - 1].name;
            doc.querySelectorAll(".shell")[1].innerHTML = `<img src="/images/love.png" id="love">` + json.playlist[0].name;
        }
    } else {
        console.log("请求错误" + json.code)
    }
    return { playlistId, l };
}

// 搜索
// 热搜榜
function showHotSear() {
    let mainBox = document.querySelector("#searchPage");
    let section = document.createElement('div');
    section.innerHTML =
        ` <div class="theSearHot">
        <div class="searNum">1</div>
        <div class="searBox">
            <div class="searName">4</div>
            <div class="searCon">5</div>
        </div>
    </div>`
    mainBox.appendChild(section);
}

function searList() {
    fetch("http://why.vin:2023/search/hot/detail")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                for (let i = 0; i < 20; i++) {
                    showHotSear()
                    doc.querySelectorAll(".searNum")[i].innerText = i + 1;
                    doc.querySelectorAll(".searName")[i].innerText = json.data[i].searchWord;
                    doc.querySelectorAll(".searCon")[i].innerText = json.data[i].content;
                }
                for (let i = 0; i < 3; i++) {
                    doc.querySelectorAll(".searNum")[i].style.color = "#ec4141";
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
// 默认搜索关键词
function placehoder() {
    fetch("http://why.vin:2023/search/default")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                doc.querySelector("#searchInput").setAttribute("placeholder", json.data.showKeyword);
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}

// 底部播放
function playSong(a) {
    fetch("http://why.vin:2023/song/detail?ids=" + a)
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                document.querySelector("#geImg>img").src = json.songs[0].al.picUrl;
                document.querySelector("#geMing").innerHTML = json.songs[0].name;
                document.querySelector("#geShou").innerHTML = json.songs[0].ar[0].name;
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

// 初始化
async function init() {
    // 信息
    let res0 = await getUerId();
    let userId = res0.userId;
    userId = 32953014
    // 实验太多次我的id遭封了orz
    let res1 = await getInfo(userId);
    let res2 = await getUList(userId);
    // 个人歌单
    let playlistId = res2.playlistId;
    let l = res2.l;
    for (let i = 1; i < l; i++) {
        doc.querySelectorAll(".shell")[i].onclick = () => {
            goToList(playlistId[i]);
        }
    }
    // 搜索
    placehoder()
    doc.querySelector("#searchInput").addEventListener("input", () => {
        document.onkeydown = (e) => {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                goToReas(doc.querySelector("#searchInput").value);
            }
        }
    })
    // 热搜
    searList();
    doc.querySelector(".searchBox").addEventListener("mouseover", () => {
        doc.querySelector("#searchPage").style.zIndex = 1000;
    })
    doc.querySelector("#searchPage").addEventListener("mouseover", () => {
        doc.querySelector("#searchPage").style.zIndex = 1000;
        // 点击跳转
        for (let i = 0; i < 10; i++) {
            document.querySelectorAll(".theSearHot")[i].addEventListener("click", () => {
                console.log(document.querySelectorAll(".searName")[i].innerText);
                goToReas(document.querySelectorAll(".searName")[i].innerText);
            })
        }
    })
    doc.querySelector("#searchPage").addEventListener("mouseout", () => {
        doc.querySelector("#searchPage").style.zIndex = -1;
    })

    // 底部播放
    // playSong(id);
}

init();