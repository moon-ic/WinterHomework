function getplayListTag() {
    fetch("http://why.vin:2023/playlist/hot")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                //如果正确就调用显示数据的方法
                
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
    getplayListTag();
}

init()