define [], ->

  mapStyles = [
    {
      featureType: "landscape.man_made"
      elementType: "geometry"
      stylers: [visibility: "off"]
    }
    {
      featureType: "landscape.natural"
      elementType: "geometry"
      stylers: [
        {
          saturation: 66
        }
        {
          lightness: 53
        }
        {
          visibility: "simplified"
        }
      ]
    }
    {
      featureType: "poi"
      stylers: [
        {
          color: "#8fc143"
        }
        {
          saturation: 54
        }
        {
          lightness: 69
        }
        {
          visibility: "off"
        }
      ]
    }
    {
      featureType: "road"
      elementType: "geometry.fill"
      stylers: [
        {
          visibility: "on"
        }
        {
          color: "#ffe222"
        }
        {
          lightness: 52
        }
        {
          saturation: 61
        }
      ]
    }
    {
      featureType: "road"
      elementType: "geometry.stroke"
      stylers: [color: "#f9c415"]
    }
    {
      featureType: "road.local"
      stylers: [
        {
          visibility: "simplified"
        }
        {
          color: "#f4bc25"
        }
        {
          saturation: 38
        }
        {
          lightness: 40
        }
      ]
    }
  ]

