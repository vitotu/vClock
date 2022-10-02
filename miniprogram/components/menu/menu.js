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
      {name:'时钟', path:'index', },
      {name:'番茄时钟', path:'index', },
      {name:'待办事项', path:'index', },
    ],
    menuTransfrom: 'translateY(0)',
    menuTransition: 'transform 1s linear',
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
      console.log('start',startY);
    },
    handleTouchMove(event){
      moveY = event.touches[0].clientY;
      moveDistance =  moveY - startY;
      console.log(moveDistance);
      this.setData({menuTransfrom:`translateY(${moveDistance}rpx)`});
    },
    handleTouchEnd(){
      this.setData({
        menuTransfrom:'translateY(0rpx)',
        menuTransition: 'transform 1s linear',
      })
    }
  }
})
