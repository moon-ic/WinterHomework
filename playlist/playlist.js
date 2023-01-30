function goTo(a) {
    window.location.href = "/playlistDetails/playlistDetails.html?id=" + a;
}
let leiBtn = document.querySelectorAll(".lei");
let gedanImg = document.querySelectorAll(".gedanImg");
let boFang = document.querySelectorAll(".boFang");
let geP = document.querySelectorAll(".geP");
let geDan = document.querySelectorAll(".geDan");
let i = 0;
let id = [];
let Btn = document.querySelector("#leiBtn");

function getplayListTag(i) {
    fetch("http://why.vin:2023/top/playlist?limit=20&cat=" + leiBtn[i].innerText)
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                Btn.innerText = leiBtn[i].innerText + ">";
                for (let q = 0; q < 10; q++) {
                    leiBtn[q].className = "lei";
                }
                leiBtn[i].classList.add("active");
                for (let j = 0; j < 20; j++) {
                    id[i] = json.playlists[j].id;
                    gedanImg[j].src = json.playlists[j].coverImgUrl;
                    geP[j].innerText = json.playlists[j].name;
                    boFang[j].innerText = ">" + json.playlists[j].playCount;
                }
            } else {
                console.log("请求错误" + json.code);
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}
function getplayListTagFunction(i) {
    return () => {
        getplayListTag(i)
    }
}
//这里是初始化，你需要设置监听器，或者初始化一些网路数据
function init() {
    getplayListTag(0);
    for (i = 0; i < 10; i++) {
        let tempgetplayListTag = getplayListTagFunction(i);
        leiBtn[i].addEventListener('click', tempgetplayListTag);
    }
    for (let m = 0; m < 20; m++) {
        geDan[m].onclick = () => goTo(id[m]);
    }
}

init();
