let doc = document;
// 顶部
// 搜索
function goTo(a) {
    window.location.href = "/play/play.html?id=" + a;
}
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
function init() {
    // 搜索
    // 热搜
    searList();
    doc.querySelector(".searchBox").addEventListener("mouseover", () => {
        doc.querySelector("#searchPage").style.zIndex = 1000;
    })
    doc.querySelector("#searchPage").addEventListener("mouseover", () => {
        doc.querySelector("#searchPage").style.zIndex = 1000;
    })
    doc.querySelector("#searchPage").addEventListener("mouseout", () => {
        doc.querySelector("#searchPage").style.zIndex = -1;
    })
    // 底部播放
    playSong(id);
}

init();