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
      {name:'时钟', path:'index01', icon:'/static/imgs/fastMenu/clock.svg'},
      {name:'番茄时钟', path:'index02', icon:'/static/imgs/fastMenu/timer.svg' },
      {name:'待办事项', path:'index03', icon:'/static/imgs/fastMenu/todo-list.svg' },
      {name:'更多', path:'index04', icon:'/static/imgs/fastMenu/more.svg' },
    ],
    menuTop: menuMaxHeight, // menuMinHeight
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
    }
  }
})
