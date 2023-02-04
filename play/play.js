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
                doc.querySelector("#audio").src = "https://music.163.com/song/media/outer/url?id=" + a + ".mp3 ";
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}

//  footer播放
// DOM元素
const audio = doc.querySelector('#audio'); // 播放器
const controls = doc.querySelector('#controls'); // 按钮区域
const title = doc.querySelector('#geMing'); // 歌曲标题
const author = doc.querySelector('#geShou'); // 歌曲作者
const playBtn = doc.querySelector('#play'); // 播放按钮
const voiceBtn = doc.querySelector('#voice'); // 声音开关
const box = doc.querySelector(".cdImg img ");
// // 当前播放歌曲
// let curSongIndex = 1;
// 是否在播放
let isPlay = false;

// 按钮事件
controls.addEventListener('click', e => {
    switch (e.target?.id) {
        case 'list': // 歌曲列表
            // TODO
            break;
        case 'voice': // 声音开关
            voiceControl();
            break;
        case 'pre': // 上一首
            preSong();
            break;
        case 'play': // 播放/暂停
            togglePlay();
            break;
        case 'next': // 下一首
            nextSong();
            break;
        case 'mode': // 播放模式
            // TODO
            break;
        default:
            break;
    }
});

// 播放 / 暂停 切换
function togglePlay() {
    if (!isPlay) {
        // 暂停 图标切换
        songPlay();
        box.style.animationPlayState = 'running'
    } else {
        // 播放 图标切换
        songPause();
        box.style.animationPlayState = 'paused'
    }
}

// 播放
function songPlay() {
    isPlay = true;
    playBtn.classList.remove('icon-24gf-play');
    playBtn.classList.add('icon-iconstop');
    audio.play();
}

// 暂停
function songPause() {
    isPlay = false;
    playBtn.classList.remove('icon-iconstop');
    playBtn.classList.add('icon-24gf-play');
    audio.pause();
}

// 上一首
function preSong() {
    if (curSongIndex > 0) {
        curSongIndex--;
        render(songsList[curSongIndex]);
        songPlay();
    }
}

// 下一首
function nextSong() {
    if (curSongIndex < songsList.length - 1) {
        curSongIndex++;
        render(songsList[curSongIndex]);
        songPlay();
    }
}

// 声音控制
function voiceControl() {
    if (audio.volume > 0) {
        voiceOff();
    } else {
        voiceOn();
    }
}

// 声音开
function voiceOn() {
    audio.volume = 1;
    voiceBtn.classList.remove('icon-volume-mute-fill');
    voiceBtn.classList.add('icon-shengyin_shiti');
}

// 声音关
function voiceOff() {
    audio.volume = 0;
    voiceBtn.classList.remove('icon-shengyin_shiti');
    voiceBtn.classList.add('icon-volume-mute-fill');
}

// 时长
function currentTime() {
    var minutes1 = parseInt(audio.currentTime / 60, 10);
    var seconds1 = parseInt(audio.currentTime % 60);
    doc.querySelector("#start").innerHTML = minutes1 + ":" + seconds1;
    if (seconds1 < 10) {
        doc.querySelector("#start").innerHTML = minutes1 + ":0" + seconds1;
    } else {
        doc.querySelector("#start").innerHTML = minutes1 + ":" + seconds1;
    }
}
function duration() {
    var minutes2 = parseInt(audio.duration / 60, 10);
    var seconds2 = parseInt(audio.duration % 60);
    if (seconds2 < 10) {
        doc.querySelector("#end").innerHTML = minutes2 + ":0" + seconds2;
    } else {
        doc.querySelector("#end").innerHTML = minutes2 + ":" + seconds2;
    }
}
//  全部初始化
function init() {
    // 网络请求
    getplayList(id);
    playSong(id);
    getLyrics(id);
    // 返回
    doc.querySelector(".back").onclick = () => {
        window.history.go(-1);
    }
    // 音量键
    doc.querySelector("#voice").onmouseover = () => {
        doc.querySelector(".volume").style.zIndex = 1;
    }
    doc.querySelector("#volume").onmouseover = () => {
        doc.querySelector(".volume").style.zIndex = 1;
    }
    doc.querySelector("#volume").onmouseout = () => {
        doc.querySelector(".volume").style.zIndex = -1;
    }
    //设置音量大小
    doc.querySelector("#volume").onchange = function () {
        audio.volume = doc.querySelector("#volume").value;
        if (audio.volume === 0) {
            voiceOff();
        }
    }
    doc.querySelector("#voice").onclick = () => {
        voiceControl()
    }
    audio.addEventListener("canplay", () => {
        duration();
    })
    audio.addEventListener("timeupdate", () => {
        currentTime()
        doc.querySelector("#jinDu").value = audio.currentTime / audio.duration
        if (audio.currentTime === audio.duration) {
            songPause()
            box.style.animationPlayState = 'paused'
        }
    })
    // 进度拖拽
    doc.querySelector("#jinDu").addEventListener("mouseup", () => {
        audio.currentTime = doc.querySelector("#jinDu").value * audio.duration
    })
}

init();