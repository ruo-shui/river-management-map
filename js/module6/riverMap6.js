window.onload = function () {
  //初始化地图
  let map = new AMap.Map('mapContainer', {
    zoom: 11.5,//级别
    center: [121.413866, 31.400704],//中心点坐标
    // viewMode: '3D',//使用3D视图
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
  //市管河道
  let geoJsonRC = addRiver(riverCity)
  //选取河道
  let geoJsonRiver = addRiver(river)
  geoJsonRiver.setOptions({
    zIndex: 20,
    fillOpacity: .5,
    strokeWeight: 1,
    strokeColor: '#fff897',
    fillColor: '#fff897'
  })


  //添加事件
  map.on("click", function (event) {
    console.log(event)
    console.log(map.getZoom())
  })

  //巡河
  let lineArray = [
    [121.36072490396269, 31.449637899971624],
    [121.35887451920405, 31.454008535889557],
    [121.35722871401241, 31.457193162988762],
    [121.35546287613282, 31.460908071600663],
    [121.3547361239102, 31.46225820900202],
    [121.35330199024091, 31.46528099573117],
    [121.35205637154722, 31.468048661259747],
  ]

  let marker = new AMap.Marker({
    map: map,
    position: [121.36072490396269, 31.449637899971624],
    // icon: "https://webapi.amap.com/images/car.png",
    icon: new AMap.Icon({
      size: new AMap.Size(36, 36),
      image: `./images/方向.png`,
      imageSize: new AMap.Size(36, 36)
    }),
    offset: new AMap.Pixel(-26, -13),
    autoRotation: true,
    angle:0,
  })

  // 绘制轨迹
    let polyline = new AMap.Polyline({
      map: map,
      path: lineArray,
      lineCap:"round",
      showDir:true,
      strokeColor: "#52f147",  //线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 8,      //线宽
      // strokeStyle: "solid"  //线样式
  });

  let passedPolyline = new AMap.Polyline({
    map: map,
    // path: lineArr,
    showDir:true,
    lineCap:"round",
    strokeColor: "#AF5",  //线颜色
    // strokeOpacity: 1,     //线透明度
    strokeWeight: 8,      //线宽
    // strokeStyle: "solid"  //线样式
  });


  marker.on('moving', function (e) {
    passedPolyline.setPath(e.passedPath);
  });

  let dom = document.getElementById("table")
  dom.addEventListener("click", function () {
    startAnimation()
  })

  function startAnimation () {
    marker.moveAlong(lineArray, 300);
  }

  function pauseAnimation () {
    marker.pauseMove();
  }

  function resumeAnimation () {
    marker.resumeMove();
  }

  function stopAnimation () {
    marker.stopMove();
  }
}