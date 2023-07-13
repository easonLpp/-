<template>
  <div ref="ringChart" :style="{ height: height }"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    height: {
      type: String,
      default: "400px",
    },
    chartData: {
      type: Array,
      required: () => [],
    },
    ringTotal: {
      type: Number,
      default: 0,
    },
    ringTitle: {
      type: String,
      default: "用户数",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    height(newVal) {
      this.chart.setOption({
        series: [
          {
            height: newVal,
          },
        ],
      });
    },
    chartData: {
      handler(newVal) {
        this.chart.setOption({
          series: [
            {
              data: newVal,
            },
          ],
        });
      },
      deep: true,
    },
    ringTitle: {
      handler(newVal) {
        this.chart.setOption({
          title: {
            text: newVal,
          },
        });
      },
      deep: true,
    },
    ringTotal: {
      handler(newVal) {
        this.chart.setOption({
          title: {
            subtext: newVal,
          },
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let self = this;
      // {height:'250px'} 设置title 在center 必须要知道echarts 高度
      this.chart = echarts.init(this.$refs.ringChart, { height: self.height });
      this.chart.setOption({
        title: {
          text: self.ringTitle,
          subtext: self.ringTotal, //副标题
          left: "49%",
          top: "center",
          textStyle: {
            //主标题样式
            color: "#666",
            fontWeight: "normal",
            fontSize: 12,
          },
          subtextStyle: {
            //副标题样式
            color: "#000",
            fontSize: 14,
            fontWeight: "bold",
          },
          textAlign: "center", // 主、副标题水平居中显示
        },
        tooltip: {
          trigger: "item",
        },
        color: ["#f5f5f5", "#fbd5d4"],
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["45%", "65%"],
            data: this.chartData,
            showEmptyCircle: true,
            // height: this.height, //设置高度
            emphasis: {
              // hover 样式
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>
