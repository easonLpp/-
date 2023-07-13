<template>
  <div>
    <h2>我是订单组件111</h2>
    <lineBar
      :linexAxis="linexAxis"
      :lineSeries1="lineSeries1"
      :lineSeries2="lineSeries2"
      @getMessage="showMsg"
    ></lineBar>
  </div>
</template>

<script>
import lineBar from "../../dashbord/lineBar";
export default {
  components: { lineBar },
  data() {
    return {
      linexAxis: ["星期一", "星期二"],
      lineSeries1: {
        name: "星期一",
        data: ["10", "6", "19"],
      },
      lineSeries2: {
        name: "星期二",
        data: ["9", "20", "5"],
      },
    };
  },
  methods:{
    showMsg(title) {
      console.log(title)
    },
  }
};
</script>

<style></style>
