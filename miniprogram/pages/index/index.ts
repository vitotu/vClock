// index.ts
// 获取应用实例
import moment from 'moment';
import formatConfig  from '../../config/index'
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
        timeClock: moment().format(formatConfig.timeFormat.zhTime),
        date: moment().format(formatConfig.timeFormat.zhYMD),
      })
    }, 100)
  }
})