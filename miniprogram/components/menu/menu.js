let startY = 0, moveY = 0, moveDistance = 0;
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
      {name:'时钟', path:'index01', },
      {name:'番茄时钟', path:'index02', },
      {name:'待办事项', path:'index03', },
    ],
    menuBottom: 0,
    menuTransition: 'transform 1s linear',
    userInfo:{},
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
      // 缓存原有的bottom值
      this.oldMenuBottom = this.data.menuBottom;
    },
    handleTouchMove(event){
      moveY = event.touches[0].clientY;
      moveDistance =  startY - moveY;
      moveDistance += this.oldMenuBottom; // 基于原有的bottom值上进行偏移更新
      // moveDistance = this.data.menuBottom + moveDistance;
      if(moveDistance < 0 || moveDistance > 500) return;
      this.setData({menuBottom:moveDistance});
    },
    handleTouchEnd(){
      this.oldMenuBottom = this.data.menuBottom;
    }
  }
})
