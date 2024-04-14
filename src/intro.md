---
icon: circle-info
cover: /assets/images/cover3.jpg
---

# 介绍页

将你的个人介绍和档案放置在此处。
::: chart 一个块状图案例

```json
{
  "type": "bar",
  "data": {
    "labels": ["红色", "蓝色", "黄色", "绿色", "紫色", "橙色"],
    "datasets": [
      {
        "label": "投票数",
        "data": [12, 19, 3, 5, 2, 3],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "scales": {
      "y": {
        "beginAtZero": true
      }
    }
  }
}
```

:::


::: echarts A bar chart

```js
var data  = await fetch("https://flash-api.xuangubao.cn/api/pool/detail?pool_name=limit_up&date=2024-04-11")
  .then((response) => response.json());
console.log(data)
option = {
  xAxis: {
    type: 'category',
    data: data.data.map(x=>x.stock_chi_name)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data.data.map(x=>x.price),
      type: 'bar'
    }
  ]
};

```

:::

@include-pop()
