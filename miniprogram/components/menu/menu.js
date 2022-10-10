let startY = 0, moveY = 0, moveDistance = 0;
const menuMinHeight = 145, menuMaxHeight = 620;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideMenu:Boolean
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
  created() {
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
      startY = event.touches[0].clientY;
      // 缓存原有的top值
      this.oldMenuTop = this.data.menuTop;
    },
    handleTouchMove(event){
      moveY = event.touches[0].clientY;
      moveDistance =  startY - moveY;
      let newMenuTop = this.oldMenuTop + moveDistance; // 基于原有的bottom值上进行偏移更新
      // moveDistance = this.data.menuTop + moveDistance;
      if(newMenuTop < menuMinHeight || newMenuTop > menuMaxHeight) return;
      this.setData({menuTop:newMenuTop});
    },
    handleTouchEnd(){
      this.oldMenuTop = this.data.menuTop;
      if(moveDistance < 0 && this.data.menuTop < menuMaxHeight){
        this.setData({menuTop:menuMinHeight})
      } else if(moveDistance > 0 && this.data.menuTop > menuMinHeight) {
        this.setData({menuTop:menuMaxHeight})
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
