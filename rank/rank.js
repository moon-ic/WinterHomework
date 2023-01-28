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

//网络请求得到数据
function getRankList() {
    fetch("http://why.vin:2023/toplist/detail")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                for (let i = 1; i < 40; i++) {
                    showRank();
                }
                for(let i=0;i<4;i++){
                    document.querySelectorAll(".pic>img")[i].src = json.list[i].coverImgUrl;
                }
                for (let i = 0; i < 40; i++) {
                    document.querySelectorAll(".bang>img")[i].src = json.list[i + 4].coverImgUrl;
                    document.querySelectorAll(".p")[i].innerText = json.list[i + 4].name;
                    document.querySelectorAll(".bo")[i].innerText = ">" + json.list[i + 4].playCount;
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
    getRankList();
}

init()