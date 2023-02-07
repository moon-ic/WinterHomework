// 跳转
function goToCom(a) {
    window.location.href = "/playlistDetailComment/playDetailsComment.html?id=" + a;
}

//获取id参数方法
function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
const id = GetUrlParam("id");

// 展示详情
async function getplayList() {
    let data = await fetch("http://why.vin:2023/playlist/detail?id=" + id)
    let json = await data.json()
    if (json.code === 200) {
        //如果正确就调用显示数据的方法
        if (json.fromUsers != null) document.querySelector(".from").innerText = json.fromUsers;
        document.querySelector(".names").innerText = json.playlist.name;
        document.querySelector(".introduceBox>img").src = json.playlist.coverImgUrl;
        document.querySelector(".biaoqian").innerText = "标签： " + json.playlist.tags;
        document.querySelector(".count").innerText = "播放： " + json.playlist.playCount;
        document.querySelector(".songCount").innerText = "歌曲： " + json.playlist.trackIds.length;
        document.querySelector(".des").innerText = json.playlist.description;
    } else {
        console.log("请求错误" + json.code)
    }
}
// 展示评论
let mainBox01 = document.querySelector(".display");
function showCom() {
    let section = document.createElement('div');
    section.className = "com";
    section.innerHTML =
        ` 
        <div class="Img">
            <img src="/images/index1.png" alt="">
        </div>
        <div class="leftBox_">
            <div class="comId">所拥有蓝水的陈桉:</div>
            <div class="timeup">1:00</div>
        </div>
        <div class="commentAnswer">66</div>
        <div class="answer">
            <img src="/images/answer.png" alt="">
        </div>
   `
    mainBox01.appendChild(section);
}
async function getComment() {
    let data = await fetch("http://why.vin:2023/comment/playlist?id=" + id)
    let json = await data.json()
    if (json.code === 200) {
        document.querySelector(".comP").innerText = "最新评论(" + json.comments.length + ")";
        for (let i = 0; i < json.comments.length; i++) {
            showCom();
            document.querySelectorAll(".comId")[i].innerText = json.comments[i].user.nickname + ": ";
            document.querySelectorAll(".timeup")[i].innerText = json.comments[i].timeStr;
            document.querySelectorAll(".commentAnswer")[i].innerText = json.comments[i].content;
            document.querySelectorAll(".Img>img")[i].src = json.comments[i].user.avatarUrl;
        }
    } else {
        console.log("请求错误" + json.code)
    }
}

//进行评论 
async function commentIt(id, con) {
    let data = await fetch("http://why.vin:2023/comment?t=1&type=2&id=" + id + "&content=" + con)
    let json = await data.json()
    if (json.code === 200) {

    } else {
        alert("网络不好，请稍后再试")
    }
}

//初始化
async function init() {
    // 展示
    let res = await getplayList();
    let res1 = await getComment()
    // 跳转
    document.querySelector("#geIndex").onclick = () => {
        goToList(id);
    }
    document.querySelector("#comment").onclick = () => {
        goToCom(id);
    }
    // 评论
    document.querySelector("#comBtn").onclick = () => {
        let con = document.querySelector(".write").value;
        console.log(con);
        commentIt(id, con);
        document.querySelector(".write").value = null;
    }
}

init();