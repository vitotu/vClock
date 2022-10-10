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
    mode:'todo',
    timeLeft:moment.utc(formatConfig.constant.todoTime).format('mm:ss'),
    baseConfig:{
      autoTimer:true
    },
    todoStatus:0,
    todoStatusLabel:'开始',
    focusRecord:{
      name:'',
      startTime:moment(),
      endTime: undefined,
    },
  },
  timeLeftCache:formatConfig.constant.todoTime,
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
      let updateData:CustomObject = {};
      if(this.data.mode === 'clock'){
        updateData.countTime = moment.utc(new Date().getTime() - this.data._startTime).format('H:m:ss')
      } else if (this.data.mode === 'todo' && this.data.todoStatus === 1){
        let timeLeft = this.timeLeftCache - new Date().getTime() + this.data._startTime;
        if(timeLeft <= 0) {
          timeLeft = formatConfig.constant.todoTime;
          updateData._startTime = new Date().getTime();
          if(!this.data.baseConfig.autoTimer){
            updateData.todoStatus = 0;
            updateData.todoStatusLabel = '开始'
          }
        };
        updateData.timeLeft = moment.utc(timeLeft).format('mm:ss');
      } else if (this.data.mode === 'todo' && this.data.baseConfig.autoTimer && this.data.todoStatus === 0){
        updateData.todoStatus = 1;
        updateData.todoStatusLabel = '暂停';
        updateData._startTime = new Date().getTime();
        this.timeLeftCache = formatConfig.constant.todoTime;
      }
      this.setData({
        timeClock: moment().format(formatConfig.timeFormat.zhTime),
        date: moment().format(formatConfig.timeFormat.zhYMD),
        ...updateData
      })
    }, 63)
  },
  handleTimeTap(event:any){
    this.setData({
      menuHide: !this.data.menuHide
    })
  },
  handleFocusTap(event:any){
    // for dev
    // wx.navigateTo({url:'/pages/dev/dev'});
  },
  autoTimerChange(e:any){
    this.setData({
      baseConfig:{...this.data.baseConfig, autoTimer:e.detail.value},
    })
  },
  changeLogName(e:any){
    // logChange 可以设置为一个函数，因为不影响页面不需要setData进行通信
    this.setData({
      focusRecord:{...this.data.focusRecord, name:e.detail.value}
    })
  },
  handleTodoStatusChange(e:any){
    switch(this.data.todoStatus){
      case 0: // 点击开始变更状态
        this.timeLeftCache = formatConfig.constant.todoTime;
        this.setData({
          _startTime:new Date().getTime(),
          todoStatus:1,
          todoStatusLabel:'暂停'
        });
        break;
      case 1: // 点击暂停
        this.timeLeftCache = this.timeLeftCache - new Date().getTime() + this.data._startTime;
        this.setData({
          todoStatus:2,
          todoStatusLabel:'继续'
        });
        break;
      case 2: // 点击继续

        this.setData({
          todoStatus:1,
          todoStatusLabel:'暂停',
          _startTime:new Date().getTime()
        });
        break;
    }
  },
  handleTodoStop(e:any){
    this.setData({
      todoStatus:0,
      todoStatusLabel:'开始',
      timeLeft:moment.utc(formatConfig.constant.todoTime).format('mm:ss'),
    });
  },
  onModeChange(e:any){
    this.setData({
      mode:e.detail,
      _startTime: new Date().getTime(),
      todoStatus:0,
      todoStatusLabel:'开始',
      timeLeft:moment.utc(formatConfig.constant.todoTime).format('mm:ss'),
    })
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