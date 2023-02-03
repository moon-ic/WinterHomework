const doc = document;
//获取参数方法
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
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
                doc.querySelector(".cdImg>img").src = json.songs[0].al.picUrl;
                doc.querySelector(".name").innerHTML = json.songs[0].name;
                doc.querySelector(".singer").innerHTML = "歌手：" + json.songs[0].ar[0].name;
                doc.querySelector(".album").innerHTML = "专辑：" + json.songs[0].al.name;

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
                doc.querySelector(".lyrics").innerHTML = lyc;
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
                doc.querySelector("#geImg>img").src = json.songs[0].al.picUrl;
                doc.querySelector("#geMing").innerHTML = json.songs[0].name;
                doc.querySelector("#geShou").innerHTML = json.songs[0].ar[0].name;
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}

// cd动画
// box.onclick=function(){
//     // 获取当前盒子的动画播放状态
//     let status = box.style.animationPlayState
//     console.log(status)
//     if(status==''|| status==='paused'){//暂停状态
//         // 运行动画
//         box.style.animationPlayState = 'running'
//         // 播放音乐
//         mv.play()
//     }else{
//         // 暂停音乐和动画
//         box.style.animationPlayState = 'paused'
//         mv.pause()
//     }
// }

// DOM元素
const audio = doc.querySelector('#audio'); // 播放器
const controls = doc.querySelector('#controls'); // 按钮区域
const title = doc.querySelector('#geMing'); // 歌曲标题
const author = doc.querySelector('#geShou'); // 歌曲作者
const playBtn = doc.querySelector('#play'); // 播放按钮
const voiceBtn = doc.querySelector('#voice'); // 声音开关

// 初始化
function init() {
    getplayList(id);
    playSong(id);
    getLyrics(id);
    document.querySelector(".back").onclick = () => {
        window.history.go(-1);
    }
}

init();