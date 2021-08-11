window.onload = function () {
  //初始化地图
  let map = new AMap.Map('mapContainer', {
    zoom: 11.5,//级别
    center: [121.413866, 31.400704],//中心点坐标
    viewMode: '3D',//使用3D视图
    // mapStyle: 'amap://styles/whitesmoke',
    // mapStyle: 'amap://styles/b7f2f5f44e96873a3826f7340966e84b',
    mapStyle: 'amap://styles/b84edd0ebb9e5773c3d31fa10c759856',
    features: ['bg', 'point']
  });
  map.setDefaultCursor("default")

  //行政边界
  let disProvince = new AMap.DistrictLayer.Province({
    zIndex: 12,
    adcode: ['310113'],
    depth: 2,
    styles: {
      'fill': 'rgba(255,255,255,0.1)',
      'county-stroke': 'rgb(255,255,255)'
    }
  })
  disProvince.setMap(map)

  //加载GeoJSON数据
  //加载行政区划数据
  function addDivision(data) {
    let geoJson = new AMap.GeoJSON({
      geoJSON: data,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          fillOpacity: .1,
          strokeWeight: 1,
          strokeColor: '#ffffff',
          fillColor: '#ffffff'
        });
      }
    })
    geoJson.setMap(map)
    geoJson.hide()
    return geoJson
  }

  //宝山区行政区划
  let geoJsonDBS = addDivision(divisionBS)
  let geoJsonDPJ = addDivision(divisionPJ)
  let geoJsonDLJ = addDivision(divisionLJ)


  //加载河道数据
  function addRiver(data) {
    let geoJson = new AMap.GeoJSON({
      geoJSON: data,
      getPolygon: function (geojson, lnglats) {
        return new AMap.Polygon({
          path: lnglats,
          fillOpacity: .8,
          strokeWeight: 2,
          strokeColor: '#347fff',
          fillColor: '#347fff'
        });
      }
    })
    geoJson.setMap(map)
    return geoJson
  }

  //区管河道
  let geoJsonRD = addRiver(riverDistrict)
  // //市管河道
  let geoJsonRC = addRiver(riverCity)
  //潘泾河道
  let geoJsonRPJ = addRiver(riverPJ)
  //罗泾河道
  let geoJsonRLJ = addRiver(riverLJ)


  //监测站
  function addStation(data) {
    let geoJson = new AMap.GeoJSON({
      geoJSON: data,
      getMarker: function (geojson, lnglats) {
        let level = geojson.properties.水质级别
        return new AMap.Marker({
          position: lnglats,
          offset: new AMap.Pixel(-13, -13),
          icon: new AMap.Icon({
            size: new AMap.Size(26, 26),
            image: `./images/水质/${level}.png`,
            imageSize: new AMap.Size(26, 26)
          })
        })
      }
    })
    geoJson.setMap(map)
    geoJson.hide()
    return geoJson
  }

  let geoJsonS1 = addStation(sta1)
  geoJsonS1.show()
  let geoJsonS2 = addStation(sta2)
  let geoJsonS3 = addStation(sta3)
  let geoJsonS4 = addStation(sta4)
  let geoJsonS5 = addStation(sta5)
  let geoJsonS6 = addStation(sta6)
  let geoJsonS7 = addStation(sta7)
  let arrayStations = [geoJsonS7, geoJsonS6, geoJsonS5, geoJsonS4, geoJsonS3, geoJsonS2, geoJsonS1]


  //治理对象
  let geoJsonGov = new AMap.GeoJSON({
    geoJSON: govern,
    getMarker: function (geojson, lnglats) {
      return new AMap.Marker({
        position: lnglats,
        offset: new AMap.Pixel(-13, -13),
        icon: new AMap.Icon({
          size: new AMap.Size(26, 26),
          image: `./images/治理问题.png`,
          imageSize: new AMap.Size(26, 26)
        })
      })
    }
  })
  geoJsonGov.setMap(map)
  geoJsonGov.hide()


  //添加事件
  map.on("click", function (event) {
    console.log(event)
    console.log(map.getZoom())
  })

  //鼠标悬浮监测点显示名字
  let content = "<div style='color: black; background-color: white; padding: 3px'>罗泾</div>"
  let infoWindow = new AMap.InfoWindow({
    isCustom: true,
    content: content  //使用默认信息窗体框样式，显示信息内容
  })

  geoJsonS1.on("mouseover", function (event) {
    let name = event.target.Ce.extData._geoJsonProperties.名称
    infoWindow.setContent(`<div style='color: black; background-color: white; padding: 3px'>${name}</div>`)
    infoWindow.open(map, event.target.Ce.position)
  })
  geoJsonS1.on("mouseout", function () {
    infoWindow.close()
  })

  //点击监测站事件
  let dic = {"Ⅰ类": 1, "Ⅱ类": 2, "Ⅲ类": 3, "Ⅳ类": 4, "Ⅴ类": 5, "劣Ⅴ类": 6}
  geoJsonS1.on('click', function (event) {
    //更改折线图
    let level = event.target.Ce.extData._geoJsonProperties.水质级别
    lineSta(dic[level])
    //更改表格
    let name = event.target.Ce.extData._geoJsonProperties.名称
    console.log(name)
    changeStaTable(name, level)
  })

  function changeStaTable(name, level) {
    let dom = document.getElementsByClassName("sta")
    dom[0].innerHTML = name
    dom[1].innerHTML = level
    if (dic[level] <= 3) {
      dom[2].innerHTML = "是"
    } else {
      dom[2].innerHTML = "否"
    }
  }

  //根据时间切换水质图标
  let dates = [2.23, "", 2.25, "", 2.27, "", 3.1]
  createAxis(dates)
  let domCircles = document.querySelectorAll(".axis .circle")
  domCircles.forEach(function (item) {
    item.addEventListener("click", function (event) {
      //更改时间轴
      domCircles.forEach(function (item) {
        item.classList.remove("active")
        console.log(item.getAttribute("index"))
      })
      event.target.classList.add("active")
      //更改图标
      let index = parseInt(item.getAttribute("index"))
      arrayStations.forEach(function (item) {
        item.hide()
      })
      arrayStations[index].show()
    })
  })
  console.log(domCircles)

  function createAxis(dates) {
    let axis = document.getElementById("axis")
    let text = document.getElementById("text")

    for (let i = 0; i < dates.length; i++) {
      //添加文字
      let spanText = document.createElement("span")
      spanText.innerHTML = dates[i]
      text.appendChild(spanText)
      //添加轴
      let span1 = document.createElement("span")
      span1.classList.add("circle")
      span1.setAttribute("index", i.toString())
      let span2 = document.createElement("span")
      span2.classList.add("line")
      if (i === dates.length - 1) {
        span1.classList.add("active")
        axis.appendChild(span1)
        break
      }
      axis.appendChild(span1)
      axis.appendChild(span2)
    }
  }


  // geoJsonRD.on('click', function (event) {
  //   console.log(event.target.Ce.extData._geoJsonProperties._parentProperities)
  //   console.log(event.target.Ce.path)
  //   console.log(event)
  // })
  //
  // geoJsonRC.on('click', function (event) {
  //   console.log(event.target.Ce.extData._geoJsonProperties._parentProperities)
  //   console.log(event.target.Ce.path)
  // })

  //点击河流显示对应的行政区划
  //潘泾
  geoJsonRPJ.on('click', function (event) {
    map.setCenter(new AMap.LngLat(121.3650741239607, 31.41506874203218))
    map.setZoom(11.9)
    geoJsonRLJ.setOptions({
      zIndex: 20,
      fillOpacity: .8,
      strokeWeight: 3,
      strokeColor: '#fff897',
      fillColor: '#347fff'
    })
    geoJsonRPJ.setOptions({
      zIndex: 20,
      fillOpacity: .8,
      strokeWeight: 3,
      strokeColor: '#fff897',
      fillColor: '#347fff'
    })
    geoJsonDPJ.setOptions({
      zIndex: 20,
      fillOpacity: .1,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      fillColor: '#ffffff'
    })
    geoJsonDPJ.show()
    geoJsonDLJ.hide()
  })
  //罗泾
  geoJsonRLJ.on('click', function (event) {
    map.setCenter(new AMap.LngLat(121.35293791428205, 31.468934875273543))
    map.setZoom(13)
    geoJsonRLJ.setOptions({
      zIndex: 20,
      fillOpacity: .8,
      strokeWeight: 3,
      strokeColor: '#fff897',
      fillColor: '#347fff'
    })
    geoJsonRPJ.setOptions({
      zIndex: 20,
      fillOpacity: .8,
      strokeWeight: 2,
      strokeColor: '#347fff',
      fillColor: '#347fff'
    })
    geoJsonDLJ.setOptions({
      zIndex: 20,
      fillOpacity: .1,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      fillColor: '#ffffff'
    })
    geoJsonDPJ.hide()
    geoJsonDLJ.show()
  })

  //更改鼠标图标
  function cursorChange(coverage) {
    coverage.on("mouseover", function () {
      map.setDefaultCursor("pointer")
    })
    coverage.on("mouseout", function () {
      map.setDefaultCursor("default")
    })
  }


  //图层的显示和隐藏
  function coverageControl(id, coverage) {
    let dom = document.getElementById(id)
    dom.addEventListener("click", function () {
      if (dom.checked) {
        coverage.show()
      } else {
        coverage.hide()
      }
    })
  }

  //水质类别
  coverageControl("level", geoJsonS1)
  //治理对象
  coverageControl("govern", geoJsonGov)
  //宝山区行政区划
  coverageControl("divisionBS", geoJsonDBS)


}