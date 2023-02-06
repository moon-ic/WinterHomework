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
    fetch("http://why.vin:2023/comment/playlist?id=705123491")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            if (json.code === 200) {
              
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            console.log("请求失败")
        })
}

//这里是初始化，你需要设置监听器，或者初始化一些网路数据
function init() {
     getRankList()
}

init()
// MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/eapi/clientlog; HTTPOnly;__csrf=19e2c30aa9357accd0faed04bc36217a; Max-Age=1296010; Expires=Tue, 21 Feb 2023 15:41:19 GMT; Path=/;;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/api/feedback; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_U=0fd6d8f8c419952ccd3ee20a5beb047c8971ff08261626bd442d4249b7782d9f993166e004087dd304fcd503d8d181c1a2b849cc9b8a4ef605e1f2a11fc31512813630e8b12b4870d4dbf082a8813684; Max-Age=15552000; Expires=Sat, 05 Aug 2023 15:41:09 GMT; Path=/; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Mon, 06 Feb 2023 15:41:09 GMT; Path=/;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1517225079490; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1517225097162; Max-Age=2147483647; Expires=Sat, 24 Feb 2091 18:55:16 GMT; Path=/wapi/clientlog; HTTPOnly