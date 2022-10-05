// index.ts
// 获取应用实例
import moment from 'moment';
import formatConfig  from '../../config/index'
const app = getApp<IAppOption>()

interface CustomObject {
  [key:string]: any;
}

Page({
  options:{
    pureDataPattern: /^_/
  },
  data: {
    timeClock: moment().format('HH:mm:ss.SS'),
    date: moment().format('YYYY-MM-DD'),
    menuHide:true,
    countTime: moment('00:00').format('mm:ss'),
    _startTime: new Date().getTime(),
  },
  // 事件处理函数
  onLoad() {
    if(!this.timer){
      this.startTimer();
    }
  },
  onShow(){
    if(!this.timer){
      this.startTimer();
    }
  },
  startTimer(){
    this.setData({_startTime:new Date().getTime()})
    this.timer = setInterval(() =>{
      this.setData({
        timeClock: moment().format(formatConfig.timeFormat.zhTime),
        date: moment().format(formatConfig.timeFormat.zhYMD),
        countTime: moment.utc(new Date().getTime() - this.data._startTime).format('H:m:ss')
      })
    }, 63)
  },
  handleTimeTap(event:any){
    this.setData({
      menuHide: !this.data.menuHide
    })
  },
  handleFocusTap(event:any){
    wx.navigateTo({url:'/pages/dev/dev'});
  },
  onShareAppMessage(options:any){
    console.log(options);
    return {
      title:"全屏专注时钟",
      path:"/pages/index/index"
    }
  },
  onShareTimeline(){
    return {
      title:'全屏专注时钟'
    }
  },
  onHide(){
    wx.showToast({
      title:"退出将重新计时",
      duration: 2000,
      icon: 'none'
    })
    if(this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    };
  },
  onUnload(){
    if(this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    };
  }
} as CustomObject)