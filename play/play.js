//获取参数方法
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//使用获取参数方法
const id = GetUrlParam("id");

// 展示
function getplayList(a) {
    fetch("http://why.vin:2023/song/detail?ids=" + a)
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                document.querySelector(".cdImg>img").src = json.songs[0].al.picUrl;
                document.querySelector(".name").innerHTML = json.songs[0].name;
                document.querySelector(".singer").innerHTML = "歌手：" + json.songs[0].ar[0].name;
                document.querySelector(".album").innerHTML = "专辑：" + json.songs[0].al.name;

            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}
// 歌词
function getLyrics(a) {
    fetch("http://why.vin:2023/lyric?id=" + a)
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                let al = json.lrc.lyric + "";
                let str = al.split("[]", 2);
                let m = str[0].split(/\[.*\]/);
                let lyc = "";
                for (let i = 0; i < m.length; i++) {
                    lyc = lyc + m[i];
                }
                document.querySelector(".lyrics").innerHTML = lyc;
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}
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
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}

function init() {
    getplayList(id);
    playSong(id);
    getLyrics(id);
    document.querySelector(".back").onclick = () => {
        window.history.go(-1);
    }
}

init();