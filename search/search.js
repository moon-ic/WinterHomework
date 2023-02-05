function showSear() {
    let mainBox = document.querySelector(".searchMain");
    let section = document.createElement('div');
    section.className = "searchSong";
    section.innerHTML =
        ` <div class="searchNums"></div>
        <div class="searTitle">音乐标题</div>
        <div class="searSinger">歌手</div>
        <div class="searAlbum">专辑</div>`
    mainBox.appendChild(section);
}

let id = [];
let m;
async function getSearch() {
    let data = await fetch("http://why.vin:2023/search?keywords=海阔天空")
    let json = await data.json()
    if (json.code === 200) {
        for (let i = 0; i < json.result.songs.length; i++) {
            doc.querySelectorAll(".searTitle")[0].style.color = "#989898";
            showSear();
            doc.querySelectorAll(".searchNums")[i + 1].innerText = i + 1;
            doc.querySelectorAll(".searTitle")[i + 1].innerText = json.result.songs[i].name;
            doc.querySelectorAll(".searSinger")[i + 1].innerText = json.result.songs[i].artists[0].name;
            doc.querySelectorAll(".searAlbum")[i + 1].innerText = json.result.songs[i].album.name;
            id[i] = json.result.songs[i].id;
            m = json.result.songs.length;
        }
    } else {
        console.log("请求错误" + json.code);
    }
    return { id, m }
}

// 初始化
async function init() {
    let res = await getSearch();
    // 跳转
    // 歌曲
    for (let i = 0; i < m; i++) {
        document.querySelectorAll(".searchSong")[i].onclick = () => goToPlay(id[i]);
    }
}

init();
