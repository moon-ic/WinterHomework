let mainBox = document.querySelector(".mainBox");
function showRank() {
    let section = document.createElement('div');
    section.innerHTML =
        ` <a class="newBox" href="#">
    <div class="num">1</div>
    <div class="img"><img src="/images/index1.png" alt=""></div>
    <div class="name"></div>
    <div class="singer"></div>
    <div class="album"></div>
    <div class="time"></div></a>`
    mainBox.appendChild(section);
}

function getNewList() {
    fetch("http://why.vin:2023/personalized/newsong?limit=100")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
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
//这里是初始化，你需要设置监听器，或者初始化一些网路数据
function init() {
    getNewList();
}

init();