// 监测站指标变化折线图
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".change"));
  // (1)准备数据
  var data = {
    year: [
      [1, 3, 2, 3, 4, 3, 3]
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      top: "15%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    title: {
      text: "监测站指标变化",
      textStyle: {
        color: "#fff",
        fontSize: 15
      },
      left: 'center',
      top: "5%"
    },
    grid: {
      top: "25%",
      left: "3%",
      right: "8%",
      bottom: "6%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月"
      ],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      max: 5,
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        formatter: function (value) {
          var texts = []
          if (value === 0) {

          } else if (value <= 1) {
            texts.push('Ⅰ');
          } else if (value <= 2) {
            texts.push('Ⅱ');
          } else if (value <= 3) {
            texts.push('Ⅲ');
          } else if (value <= 4) {
            texts.push('Ⅳ');
          } else {
            texts.push('Ⅴ');
          }
          return texts;
        }
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name: "水质",
        type: "line",
        // 是否让线条圆滑显示
        smooth: true,
        data: data.year[0]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();


//河流水质要素及时间变化折线图
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector("#water-element"));
  console.log(myChart)
  // (1)准备数据
  var data = {
    year: [
      [3.98, 4.12, 4.39, 4.7, 4.7, 4.37, 4, 3.02, 4.07, 3.99, 5.26, 5.13],
      [3.85, 4.01, 4.37, 4, 4.21, 4.31, 4.12, 3.01, 4.01, 4.11, 5.14, 5.05]
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // top:"5%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "10%",
      left: "3%",
      right: "8%",
      bottom: "6%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      splitNumber: 12,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        interval: 0,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      min: 2,
      max: 6,
      splitNumber: 4,
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name: "2019",
        type: "line",
        // 是否让线条圆滑显示
        smooth: false,
        data: data.year[0]
      },
      {
        name: "2020",
        type: "line",
        // 是否让线条圆滑显示
        smooth: false,
        data: data.year[1]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

//河流水质达标情况饼图
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".chart .pie"));
  // 2. 指定配置项和数据
  var option = {
    legend: {
      top: "25%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    title: {
      text: "水质按类别统计",
      textStyle: {
        color: "#fff",
        fontSize: 13
      },
      top: "10%",
      left: '5%',
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "水质统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["0", "50%"],
        center: ["50%", "65%"],
        // roseType: "radius",
        data: [
          {value: 12, name: "Ⅰ"},
          {value: 26, name: "Ⅱ"},
          {value: 34, name: "Ⅲ"},
          {value: 25, name: "Ⅳ"},
          {value: 10, name: "Ⅴ"}
        ],
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 10,
          // 连接到文字的线长度
          length2: 10
        }
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();

//各行政区水质达标统计
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".chart .line"));
  console.log(myChart)
  // (1)准备数据
  var data = {
    year: [
      [3.98, 4.12, 4.39, 4.7, 4.7, 4.37, 4, 3.02, 4.07, 3.99, 5.26, 5.13],
      [3.85, 4.01, 4.37, 4, 4.21, 4.31, 4.12, 3.01, 4.01, 4.11, 5.14, 5.05]
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#ff9f7f", "#27b2f1"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      top:"10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    title: {
      text: "各行政区水质达标统计",
      textStyle: {
        color: "#fff",
        fontSize: 13
      },
      top: "10%",
      left:"5%"
    },
    grid: {
      top: "25%",
      left: "3%",
      right: "3%",
      bottom: "3%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: true,
      splitNumber: 12,
      data: [
        "吴淞街道",
        "友谊路街道",
        "张庙街道",
        "罗店镇",
        "大场镇",
        "杨行镇",
        "月浦镇",
        "罗泾镇",
        "顾村镇",
        "高境镇",
        "庙行镇",
        "淞南镇"
      ],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        // interval: 0,
        rotate:45
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      },
    },
    yAxis: [{
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      min: 2,
      max: 6,
      splitNumber: 4,
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    }, {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      min: 2,
      max: 6,
      splitNumber: 4,
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        formatter:"{value}%"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      },
    }
    ],
    series: [
      {
        name: "达标率",
        type: "line",
        // 是否让线条圆滑显示
        smooth: false,
        data: data.year[0]
      },
      {
        name: "达标个数",
        type: "bar",
        barWidth: "40%",
        data: data.year[1]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

//水环境治理对象类型统计
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".right .pie"));
  // 2. 指定配置项和数据
  var option = {
    legend: {
      top: "25%",
      left:"15%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    title: {
      text: "治理对象类型统计",
      textStyle: {
        color: "#fff",
        fontSize: 13
      },
      top: "10%",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#32c5e9",
    ],
    series: [
      {
        name: "处理对象",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["30%", "45%"],
        center: ["45%", "70%"],
        // roseType: "radius",
        data: [
          {value: 12, name: "普通垃圾"},
          {value: 34, name: "水体垃圾      "},
          {value: 26, name: "截污治理"},
          {value: 25, name: "清淤疏浚"},

        ],
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 5,
          // 连接到文字的线长度
          length2: 5
        }
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();