define(['jquery','lib/leaflet/dist/leaflet','lib/esri-leaflet/dist/esri-leaflet'],function($){

  return function(div,options){

    var settings = $.extend(true,{
      mapOptions: {
        center: [37.64, -97.11],
        zoom: 5,
        maxBounds: null,
        zoomControl: false,
        scrollWheelZoom: false
      }
    },options);

    if (settings.mapOptions.maxBounds){
      settings.mapOptions.maxBounds = getMaxBounds(settings.mapOptions.maxBounds);
    }

    var map = L.map(div,settings.mapOptions);

    var zoomControl = new L.control.zoom({position: 'topright'});
    zoomControl.addTo(map);

    window.mapper = map;

    this.addLayer = function(layerObj){
      switch (layerObj.type){
        case 'esriBasemap':
          L.esri.basemapLayer(layerObj.name).addTo(map);
          break;
        default:
          console.log('Layer not currently supported');
      }
    };
  };

  function getMaxBounds(maxBounds){
    if (maxBounds && maxBounds.southWest && maxBounds.northEast){
      return L.latLngBounds(maxBounds.southWest,maxBounds.northEast);
    }
  }

});
