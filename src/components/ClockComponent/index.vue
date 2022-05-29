<template>
  <div class="clock">
    <div class="dateBox">
      <span class="date">{{clock.date}}</span>
    </div>
    <div class="timeBox">
      <span class="time">{{clock.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClockComponent",
  data(){
    return {
      clock:{
        time:'',
        date:''
      },
      week:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    }
  },

  methods: {
    updateClock() {
      let date = new Date()
      this.clock.date = this.zeroPadding(date.getFullYear(), 4)
          + "-"
          + this.zeroPadding(date.getMonth() + 1, 2)
          + "-"
          + this.zeroPadding(date.getDate(), 2)
          + "-"
          + this.zeroPadding(this.week[date.getDay()])
      this.clock.time = this.zeroPadding(date.getHours(), 2)
          + ":"
          + this.zeroPadding(date.getMinutes(), 2)
          + ":"
          + this.zeroPadding(date.getSeconds(), 2)
    },

    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i <Number(digit); i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
  },

  created() {
    setInterval(()=>{
      this.updateClock()
    },1000)
  }
}
</script>

<style scoped lang="less">
.clock{


  .dateBox{


    .date{
      font-size: 18px;
    }
  }

  .timeBox{


    .time{
      font-size: 60px;
    }
  }
}
</style>