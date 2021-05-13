
/**
 * 判断是否是移动端
 */
 export function isMobile(){
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { 
           return true;
     }
     return false;
  }

export function watermark(settings,container) {
          
    //默认设置
     var defaultSettings={
         watermark_txt:"text",
         watermark_x:1,//水印起始位置x轴坐标
         watermark_y:1,//水印起始位置Y轴坐标
         watermark_rows:10,//水印行数
         watermark_cols:20,//水印列数
         watermark_x_space:1,//水印x轴间隔
         watermark_y_space:50,//水印y轴间隔
         watermark_color:'#AAAAAA',//水印字体颜色
         watermark_alpha:0.2,//水印透明度
         watermark_fontsize:'25px',//水印字体大小
         watermark_font:'STKaiti',//水印字体
         watermark_width:80,//水印宽度
         watermark_height:40,//水印长度
         watermark_angle:20//水印倾斜度数
     };
     //采用配置项替换默认值，作用类似jquery.extend
     Object.assign(defaultSettings, settings);
     var oTemp = document.createDocumentFragment();
  
     //获取页面最大宽度
     var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
     //获取页面最大长度
     var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
  
     //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
     if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
         defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
         defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
       }
     //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
     if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
         defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
         defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
     }
     var x;
     var y;
     for (var i = 0; i < defaultSettings.watermark_rows; i++) {
         y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
         for (var j = 0; j < defaultSettings.watermark_cols; j++) {
             x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
  
             var mask_div = document.createElement('div');
             mask_div.id = 'mask_div' + i + j;
             mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
             //设置水印div倾斜显示
             mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
             mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
             mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
             mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
             mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
             mask_div.style.visibility = "";
             mask_div.style.position = "absolute";
             mask_div.style.left = x + 'px';
             mask_div.style.top = y + 'px';
             mask_div.style.overflow = "hidden";
             mask_div.style.zIndex = "999";
             //mask_div.style.border="solid #eee 1px";
             mask_div.style.pointerEvents='none';
             mask_div.style.opacity = defaultSettings.watermark_alpha;
             mask_div.style.fontSize = defaultSettings.watermark_fontsize;
             mask_div.style.fontFamily = defaultSettings.watermark_font;
             mask_div.style.color = defaultSettings.watermark_color;
             mask_div.style.textAlign = "center";
             mask_div.style.width = (defaultSettings.watermark_width-20) + 'px';
             mask_div.style.height = (defaultSettings.watermark_height-20) + 'px';
             mask_div.style.display = "block";
             oTemp.appendChild(mask_div);
         };
     };
     document.body.appendChild(oTemp);
  }
  
  
  export function addWaterMarker({
    // 使用 ES6 的函数默认值方式设置参数的默认取值
    // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
    container = document.body,
    width = '220px',
    height = '220px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = "16px  'Microsoft YaHei'",
    fillStyle = 'rgba(170, 170, 170, 0.2)',
    content = '请勿外传',
    rotate = '-30',
    zIndex = 1000
  } = {}) {
    var args = arguments[0];
    var canvas = document.createElement('canvas');
  
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.setAttribute('style', `
      position:fixed;
      top:0;
      background:#fff;
      z-index:-1;`);
    var ctx = canvas.getContext("2d");
  
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
  
    var base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement("div");
    watermarkDiv.setAttribute('style', `
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:${zIndex};
      pointer-events:none;
      background-repeat:repeat;
      background-image:url('${base64Url}')`);
  
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
  
    
  }
  
/**
 * 
 * @param {*} hasWeek 是否需要星期
 * @param {*} type 返回值类型   1 返回字符串 20210428103123 。2 返回 2021年4月28号 10:31:23
 */
export function getDateTime(  type = 1,hasWeek=false){
  //获取当前日期
  var date_time = new Date();
  //定义星期
  var week;
　　　　//switch判断
　　　　switch (date_time.getDay()){
　　　　　　case 1: week="星期一"; break;
　　　　　　case 2: week="星期二"; break;
　　　　　　case 3: week="星期三"; break;
　　　　　　case 4: week="星期四"; break;
　　　　　　case 5: week="星期五"; break;
　　　　　　case 6: week="星期六"; break;
　　　　　　default:week="星期天"; break;
　　　　}
　　　　//年
　　　　var year = date_time.getFullYear();
　　　　//判断小于10，前面补0
　　　　if(year<10){
　　　　　　year="0"+year;
　　　　}
　　　　//月
　　　　var month = date_time.getMonth()+1;
　　　　//判断小于10，前面补0
　　　　if(month<10){
　　　　　　month="0"+month;
　　　　}
　　　　//日
　　　　var day = date_time.getDate();
　　　　//判断小于10，前面补0
　　　　if(day<10){
　　　　　　day="0"+day;
　　　　}
　　　　//时
　　　　var hours =date_time.getHours();
　　　　//判断小于10，前面补0
　　　　if(hours<10){
　　　　　　hours="0"+hours;
　　　　}
　　　　//分
　　　　var minutes =date_time.getMinutes();
　　　　//判断小于10，前面补0
　　　　if(minutes<10){
　　　　　　minutes="0"+minutes;
　　　　}
　　　　//秒
　　　　var seconds=date_time.getSeconds();
　　　　//判断小于10，前面补0
　　　　if(seconds<10){
　　　　　　seconds="0"+seconds;
　　　　}
              switch(type){
                case 1:
                  return  year+month+day+hours+minutes+seconds;
                  break;
                case 2:
                  return  (year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds)+" "+ (hasWeek ? week : '');
                  break;
              }
}


/**
 * 模糊查询
 * @param {*} 原数组 
 * @param {*} 需要匹配值 
 * @param {*} 根据哪个字段进行匹配
 * @returns 
 */
 export function fuzzyQuery(list,colmn, keyWord) {
  var reg =  new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i][colmn])) {
      arr.push(list[i]);
    }
  }
  return arr;
}