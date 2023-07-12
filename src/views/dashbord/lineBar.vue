<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    linexAxis: {
      type: Array,
      required: () => [],
    },
    lineSeries1: {
      type: Object,
      required: () => {},
    },
    lineSeries2: {
      type: Object,
      required: () => {},
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    linexAxis(newVal) {
      this.chart.setOption({
        xAxis: {
          data: newVal,
        },
      });
    },
    lineSeries1: {
      handler(newVal) {
        this.chart.setOption({
          series: [
            {
              name: newVal.name,
              data: newVal.data,
            },
          ],
        });
      },
      deep: true,
    },
    lineSeries2: {
      handler(newVal) {
        this.chart.setOption({
          series: [
            {},
            {
              name: newVal.name,
              data: newVal.data,
            },
          ],
        });
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      let that = this;
      this.chart = echarts.init(this.$el, "macarons");

      that.chart.off("click"); //防止 触发多次 echarts 点击事件
      that.chart.on("click", function (params) {
        that.$emit("getMessage", params.dataIndex);
      });
      this.chart.setOption({
        color: ["#f68d8b", "#bacef6"], // "#"
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0,50,99,0.65)",
          borderColor: "rgba(0,129,255,1)",
          textStyle: {
            color: "#fff",
            fontSize: 14,
            fontFamily: "SourceHanSansCN",
          },
        },
        legend: {
          right: "10",
        },
        grid: {
          left: "7%",
          right: "5%",
          bottom:'70px'
        },
        xAxis: {
          type: "category",
          axisLine: {
            //坐标轴
            show: false,
          },
          axisTick: {
            //坐标轴刻度
            show: false,
          },
          data: that.linexAxis,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            color: "#666",
            align: 'center',
            formatter(params) {
              // 当字符串长度超过2时
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 3; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
          },
        },

        yAxis: [
          {
            type: "value",
            axisLine: {
              //坐标轴
              show: false,
            },
            axisTick: {
              //坐标轴刻度
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                // color: "rgba(0, 0, 0, 0.15)",
                width: 1,
              },
            },
            axisLabel: {
              color: "#999",
            },
            splitArea: {
              show: false
            }
          },
          {
            type: "value",
            alignTicks: true, // ！！配置多坐标轴标签对齐
            // min: 0,
            // max: 100,
            // interval: 20,
            axisLine: {
              //坐标轴
              show: false,
            },
            axisTick: {
              //坐标轴刻度
              show: false,
            },
            axisLabel: {
              formatter: "{value} %",
            },
            splitLine: { show: false },
            axisLabel: {
              color: "#999",
            },
            splitArea: {
              show: false
            }
          },
        ],
        dataZoom: [
          {
            type: 'slider',
            realtime: true,
            start: 0,
            end: 60,
            height: 14,
            bottom: 0,
            xAxisIndex: [0],
            fillerColor: "rgba(139, 139, 139,.2)"
          //  fillerColor: "rgba(171,145,255,.2)"
          },
        ],
        series: [
          {
            name: that.lineSeries1.name,
            type: "bar",
            barGap: 0,
            data: that.lineSeries1.data,
            showAllSymbol: true,
            barWidth:10
          },
          
          {
            name: that.lineSeries2.name,
            type: "line",
            yAxisIndex: 1,
            // tooltip: {
            //   valueFormatter: function (value) {
            //     return value + " °C";
            //   },
            // },
            smooth: true,
            data: that.lineSeries2.data,
          },
        ],
      });
    },
  },
};
</script>
