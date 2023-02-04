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
    playSong(id);
}

init();