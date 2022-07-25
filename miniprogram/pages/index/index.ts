// index.ts
// 获取应用实例
import moment from 'moment';
const app = getApp<IAppOption>()

Page({
  data: {
    timeClock: moment().format('HH:mm:ss.SS'),
    date: moment().format('YYYY-MM-DD')
  },
  // 事件处理函数
  onLoad() {
    setInterval(() =>{
      this.setData({
        timeClock: moment().format('HH:mm:ss.SS'),
        date: moment().format('YYYY-MM-DD')
      })
    }, 100)
  }
})