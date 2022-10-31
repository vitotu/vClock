let startY = 0, moveY = 0, moveDistance = 0;
// TODO:重构横向布局
const menuMinHeight = 145, menuMaxHeight = 620;
const menuMinWidth = 110, menuMaxWidth = 330;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideMenu:Boolean,
    orientation:Boolean
  },
  observers:{
    'orientation':function(){
      if(this.data.orientation){
        this.minDistance = menuMinHeight;
        this.maxDistance = menuMaxHeight;
      }else {
        this.minDistance = menuMinWidth;
        this.maxDistance = menuMaxWidth;
      }
      this.setData({menuTop:this.minDistance});
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    fastMenu:[
      {name:'专注时钟', path:'clock', icon:'/static/imgs/fastMenu/clock.svg', onTap:function(e){this.triggerEvent('modechange', 'clock')}},
      {name:'番茄时钟', path:'todo', icon:'/static/imgs/fastMenu/timer.svg', onTap:function(e){this.triggerEvent('modechange', 'todo')} },
      {name:'待办事项', path:'index03', icon:'/static/imgs/fastMenu/todo-list.svg', onTap:function(e){this.showDev(e);} },
      {name:'更多', path:'index04', icon:'/static/imgs/fastMenu/more.svg' , onTap:function(e){console.log('trigger more')}},
    ],
    menuTop: menuMinHeight, // menuMinHeight
    menuTransition: 'transform 1s linear',
    userInfo:{},
  },
  attached() {
    this.minDistance = menuMinHeight;
    this.maxDistance = menuMaxHeight;
    if(!this.data.orientation) {
      this.minDistance = menuMinWidth;
      this.maxDistance = menuMaxWidth;
      this.setData({menuTop:menuMinWidth});
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onHide(){
      this.setData({hideMenu:true});
    },
    handleTouchStart(event){
      // this.setData({menuTransition: ''});
      startY = this.data.orientation ? event.touches[0].clientY : event.touches[0].clientX;
      // 缓存原有的top值
      this.oldMenuTop = this.data.menuTop;
    },
    handleTouchMove(event){
      moveY = this.data.orientation ? event.touches[0].clientY : event.touches[0].clientX;
      moveDistance =  startY - moveY;
      let newMenuTop = this.oldMenuTop + moveDistance; // 基于原有的bottom值上进行偏移更新
      // moveDistance = this.data.menuTop + moveDistance;
      if(newMenuTop < this.minDistance || newMenuTop > this.maxDistance) return;
      this.setData({menuTop:newMenuTop});
    },
    handleTouchEnd(){
      this.oldMenuTop = this.data.menuTop;
      if(moveDistance < 0 && this.data.menuTop < this.maxDistance){
        this.setData({menuTop:this.minDistance})
      } else if(moveDistance > 0 && this.data.menuTop > this.minDistance) {
        this.setData({menuTop:this.maxDistance})
      }
    },
    showDev(event){
      wx.showToast({
        title:`${event?.currentTarget?.dataset?.name}功能开发中`,
        duration:1000,
        icon:'none'
      })
    },
    onFastMenuTap(e){
      const path = e.currentTarget.dataset.path;
      if(path === 'clock') this.triggerEvent('modechange', 'clock');
      else if (path === 'todo') this.triggerEvent('modechange', 'todo');
      else {
        this.showDev(e);
      }
    }
  }
})
