// 下拉表单部分
// 1-生日
function YYYYDD(str) //年发生变化时日期发生变化(主要是判断闰平年)   
{
    var MMvalue = document.reg_testdate.MM.options[document.reg_testdate.MM.selectedIndex].value;
    if (MMvalue == "") { var e = document.reg_testdate.DD; optionsClear(e); return; }
    var n = MonHead[MMvalue - 1];
    if (MMvalue == 2 && IsPinYear(str)) n++;
    writeDay(n)
}

function YYYYMMDDstart() {
    var YYYYvalue = document.reg_testdate.YYYY.options[document.reg_testdate.YYYY.selectedIndex].value;
    MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //先给年下拉框赋内容   
    var y = new Date().getFullYear();
    for (var i = (y - 30); i < (y + 30); i++) //以今年为准，前30年，后30年   
        document.reg_testdate.YYYY.options.add(new Option(" " + i + " 年", i));

    //赋月份的下拉框   
    for (var i = 1; i < 13; i++)
        document.reg_testdate.MM.options.add(new Option(" " + i + " 月", i));

    document.reg_testdate.YYYY.value = y;
    document.reg_testdate.MM.value = new Date().getMonth() + 1;
    var n = MonHead[new Date().getMonth()];
    if (new Date().getMonth() == 1 && IsPinYear(YYYYvalue)) n++;
    writeDay(n); //赋日期下拉框Author:meizz   
    document.reg_testdate.DD.value = new Date().getDate();
}

function MMDD(str)   //月发生变化时日期联动   
{
    var YYYYvalue = document.reg_testdate.YYYY.options[document.reg_testdate.YYYY.selectedIndex].value;
    if (YYYYvalue == "") { var e = document.reg_testdate.DD; optionsClear(e); return; }
    var n = MonHead[str - 1];
    if (str == 2 && IsPinYear(YYYYvalue)) n++;
    writeDay(n)
}

function writeDay(n)   //据条件写日期的下拉框   
{
    var e = document.reg_testdate.DD; optionsClear(e);
    for (var i = 1; i < (n + 1); i++)
        e.options.add(new Option(" " + i + " 日", i));
}

function IsPinYear(year)//判断是否闰平年   
{ return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0)); }

function optionsClear(e) {
    e.options.length = 1;
}

// 2-城市
function showCity() {
    // 定义二维数组，存放城市 
    let citys = [[],
    ['北京市'],
    ['天津市'],
    ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
    ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
    ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
    ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '盘锦市', '朝阳市', '葫芦岛市'],
    ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边'],
    ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区',],
    ['上海市'],
    ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
    ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
    ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
    ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
    ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
    ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
    ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '济源市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'],
    ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施', '仙桃市', '潜江市', '天门市', '神农架林区'],
    ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西'],
    ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '东沙群岛', '潮州市', '揭阳市', '云浮市'],
    ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
    ['海口市', '三亚市', '三沙市', '五指山市', '琼海市', '儋州市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙', '昌江', '乐东', '陵水', '保亭', '琼中'],
    ['重庆市'],
    ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝', '甘孜', '凉山'],
    ['贵阳市', '六盘水市', '遵义市', '安顺市', '铜仁市', '黔西南', '毕节市', '黔东南', '黔南'],
    ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄', '红河', '文山', '西双版纳', '大理', '德宏', '怒江', '迪庆'],
    ['拉萨市', '昌都地区', '山南地区', '日喀则地区', '那曲地区', '阿里地区', '林芝地区'],
    ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
    ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏', '甘南'],
    ['西宁市', '海东市', '海北', '黄南', '海南', '果洛', '玉树', '海西'],
    ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
    ['乌鲁木齐市', '克拉玛依市', '吐鲁番地区', '哈密地区', '昌吉', '博尔塔拉', '巴音郭楞', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁', '塔城地区', '阿勒泰地区', '石河子市', '阿拉尔市', '图木舒克市', '五家渠市'],
    ['台北市', '高雄市', '台南市', '台中市', '金门县', '南投县', '基隆市', '新竹市', '嘉义市', '新北市', '宜兰县', '新竹县', '桃园县', '苗栗县', '彰化县', '嘉义县', '云林县', '屏东县', '台东县', '花莲县', '澎湖县', '连江县'],
    ['香港岛', '香港岛', '新界'],
    ['澳门', '离岛']];
    //根据选择的省份，得到这个省份中的城市数组
    let provinceNode = document.getElementById("province");
    let index = provinceNode.selectedIndex;
    let showCity = citys[index];
    // 删除-初始化数据
    let cityNode = document.getElementById("city");
    let cityChildNodes = cityNode.childNodes;
    //for循环这里没有变量自增，是因为每当删除一个城市后，下一个城市就自动向前，所以只用一直删除第一个城市即可。
    for (let i = 0; i < cityChildNodes.length;) {
        cityNode.removeChild(cityChildNodes[i]);
    }
    //将获取的城市显示到城市下拉菜单的option标签中
    for (let i = 0; i < showCity.length; i++) {
        let optionCityNode = document.createElement("option");
        optionCityNode.innerHTML = showCity[i];
        cityNode.appendChild(optionCityNode);
    }

}
//综合表单
// 展示——已经寄了接口
function inner() {
    fetch("http://why.vin:2023/user/account")
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                // doc.querySelector("#selfImg").src = 
            } else {
                console.log("请求错误" + json.code)
            }
        })
        .catch(reason => {
            //请求失败的异常情况
            console.log("请求失败")
        })
}
//提交
function commit(gender, birthday, nickname, province, city, signature) {
    fetch("http://why.vin:2023/user/update?gender=" + gender + "&signature=" + signature + "&city=" + city + "&nickname=" + nickname + "&birthday=" + birthday.getTime() / 1000 + "&province=" + province)
        //这里是将数据json字符串转为对象
        .then(data => data.json())
        .then(json => {
            //判断网络请求返回的数据是否正确
            if (json.code === 200) {
                // 如果正确就调用显示数据的方法
                window.location.href = "/index/index.html";
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
async function init() {
    // 表单部分
    if (document.attachEvent)
        window.attachEvent("onload", YYYYMMDDstart);
    else
        window.addEventListener('load', YYYYMMDDstart, false);
    showCity();
    // 展示
    // 信息
    let res0 = await getUerId();
    let userId = res0.userId;
    userId = 32953014// 实验太多次我的id遭封了orz
    let res1 = await getInfo(userId);
    doc.querySelector("#selfImg").src = res1.uImg;
    doc.querySelector(".nickname>input").value = res1.uName;// 信息接口寄了出此下策

    // 
    // 提交
    doc.querySelector("#editUp").onclick = () => {
        // 性别
        let gender = 0;
        let sex = doc.getElementsByName("sex");
        for (let i = 0; i < 2; i++) {
            if (sex[i].checked == true) {
                gender = i + 1;
                break;
            }
        }
        let nickname = doc.querySelector(".nickname>input").value;
        let signature = doc.querySelector("#selfinfo").value;
        // 生日
        let indexY = document.querySelector("#yy").selectedIndex;
        let year = document.querySelector("#yy").children[indexY].value;
        let indexM = document.querySelector("#mm").selectedIndex;
        let month = document.querySelector("#mm").children[indexM].value;
        let indexD = document.querySelector("#dd").selectedIndex;
        let day = document.querySelector("#dd").children[indexD].value;
        let birthday = new Date(year, month, day);
        console.log(birthday);
        // 地址
        let city = 440300;
        let province = 440000;
        // 没找到合适的转邮政编码的接口qwq
        commit(gender, birthday, nickname, province, city, signature);
    }
}

init();