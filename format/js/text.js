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

// MUSIC_R_T=1517225097162; MUSIC_A_T=1517225079490; _ntes_nnid=ba379a9fa3946c21c7a886c48ada69be,1672310531637; _ntes_nuid=ba379a9fa3946c21c7a886c48ada69be; NMTID=00O2WyWAqUCgoanx0OqjdNebHlRfAwAAAGFi0mFwg; WEVNSM=1.0.0; WNMCID=qpzoam.1673079130701.01.0; WM_TID=ZRTcWfJwck5ERUUUUAOEcoSbcIbA1RQO; __snaker__id=sOrEx70oahWWHgMO; YD00000558929251:WM_TID=8F5hdrtlxS1AQEEREFeUd5rS3H9iDylc; ntes_kaola_ad=1; 5555; _ntes_nnid=123456; WM_NI=oqCQwV3dqlRnIpykxIFAxeek4K+Sw3Gt9WpDKye/ZXJlMxLZBoSPajolrO2enVs1jSYEGB5bGfReUTAVkTccEoqsaDN8AbUpW7ZUUCNPL/umDUAzfEVjDEP+PcivSU07eHc=; WM_NIKE=9ca17ae2e6ffcda170e2e6eeb5d564f3be998cfc74a7ef8aa2c85f838b9e82d14896b5a6a5cb5ab5909fb0ed2af0fea7c3b92aadaf8db2f65ef1bcbf8dd1668bb0b78cfb43869fb886e861f895e5b4f63985acf7b8f35089a7abd0d9548ab48399cf5282b19db1e462adb4beb0b16fae8abdd2e9599b9b89a3b86a85ba9e86d860838aa5b5e26987b1bf94e4508ee88f83d87c95e996b6d8498e9084d0f867888b8f9be54f96b68ca6d32194bda797d25ff4e9aba9e237e2a3; JSESSIONID-WYYY=3sA6NKkK7NUNcQDZBhXzI/YGUtSX\iIxgcm9Sq7Ax8uFQUKZKpDdOX+Xsh73ShOeZ7U+GYKKc8Z3\gI\ICdkc0uyuNHRG/RF10cnEY4w/5VyzvZegjln/39ZDwxqs4Z+lf670TZ9jKcZ1Autooc/9w90t2K2bN5Fweihswz9k1VatYtk:1675662227137; _iuqxldmzr_=33; YD00000558929251:WM_NI=xSfd33ps0HYihEC+VCay4sSSh/S0KMZh7r0FJUqIMtKJ7hNfwOBNZSTjjaVtIwC8Q+GbuZ0k0ClW5ust2g84TYse/YmOSq1MYakUUM20fnLJB+RXRKiuCO3Hmt8nFnWPSEk=; YD00000558929251:WM_NIKE=9ca17ae2e6ffcda170e2e6eeaef853b8bfab9bcb60aa9e8bb3d15b838a8b83d84186b5fea5d75392ef85daae2af0fea7c3b92abc8daa85b239b4ad00a9dc63ac9b8dccd549a3a7fc94d259acf19dd1ca479ab8f993b34e8a8bbfaad0808996f989cd6eb5918eafd95998b6a682d5808ba98dd9d42185bebbbbb361f49da4b8b87fb1acfe88bb409887bd86ae53af919d92b4479bbfa5b6d847f2f0aa8fcf4282f59eb9d141abab8db0b244afacf88fc56695909da6ea37e2a3; NTES_P_UTID=RoJRyInYpufUhGuxKtBlHLII31GJ9qvh|1675660440; NTES_SESS=7KbATmExNe0W0HiJ0nKNMti.tfSLorYyjtitCF8Ea3I1Z2qhZLps8NQm4ZEU85c8pcQg.T5B2miL1lhJfDOfEdYxHkm23AC_N4FYeHqqUjzMef85_6x_9C6EPZqKaq3jiLUJlqf3QgMa.HX2JSKkpZJuQe5e9IxVJx7ncXcYdzavlU5QtPJ.TEtz0saFnNapiz.1mI_GFYZkN; S_INFO=1675660440|0|3&80##|anchen0503; P_INFO=anchen0503@163.com|1675660440|0|music|00&99|sic&1675660202&cloudmusic#sic&510100#10#0#0|&0|cloudmusic|anchen0503@163.com; __remember_me=true; MUSIC_U=00678684DFBFDBBE94B47D2435D54EAF9361C840A72C00FF1C21E92E8D0D16997E210C438A0F29F3F9A9C8164B43676CF88B8558A8704EA4902F49E9FA70865CCB8A561F586061352D0C7B075E5EC179AD7D61A3227F40EE76FA62C1B23D16C3084BA7894467BD58E245128FFFF2D4B66DE9615EA3AAAD914FCCD5A65386F98B4B4D8C356F5F1F392ED3DBD29BD18F9356AE5EA41445B03C66D78AE6681FBEFCEC42BE2783803993196B469B27AE295556BE1680F617663E8DA333E384D289053A295CA6185CAD2C124F9DD0FB5CBC08470C110D6BD963B2765ECB70871881F79BB733C6C4A6FDCB0687EB4E4AE65549A0103C2502CAEAC1BDC0CDE692F204C7D0EC027011048984F10B080C950AA1656C8330A018A2BCC95112FD6F4593815D6A6C107AAC3680C080306E74AEBD0892C07B56392F319C8326C96A979E758D4571B79508077753004EAC341ECC0AE95440; __csrf=0d7e94443b130f0be1e49919b1b4dbeb; gdxidpyhxdE=Ae0CTmd4SieWOoC1PvhIDGgaYUb9Q2u5vLrIdErhEa9wxIG/xnRCKOVjXgG4qoZmd2+xsE97Ui1d8Dj+6Dey7ZdA7uBoyI6nY0vPsLKWpE\CaSmUtYNHyq4yNqw\WgNU\jtv+wjWI7XQBqHqBaRdRmlGjUXtzHI3KQG3jhUxRI49yreQ:1675662168286