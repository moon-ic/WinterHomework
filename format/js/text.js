const btn = document.querySelector('#btn1')
const content = document.querySelector('#content')

//这种是得到数据后，直接创建html，也可以更改html中的东西
function showRank(data) {
    let section = document.createElement('section')
    section.innerHTML = `<h5>${data.name}<h5>`
    content.appendChild(section);
}
//如果是list的资源可以多加一个方法来解析返回的json数据
function loadRankList(data) {
    data.forEach(value => showRank(value))
}
//如果是post方法，就需要传入body
let testRequest = new Request('http://why.vin:2023/toplis', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=utf-8;'
    },
    //这里是body，需要对需要的参数进行设置
    body: JSON.stringify({ a: 1 })
})
//网络请求得到数据
function getRankList() {
    fetch("http://why.vin:2023/toplis")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                loadRankList(json.list)
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
    btn.onclick = getRankList
}

init()