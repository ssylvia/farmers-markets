define(['lib/leaflet/dist/leaflet','lib/esri-leaflet/dist/esri-leaflet'],function(){

  return function(div,center,zoom){
    var map = L.map(div).setView(center, zoom);
    L.esri.basemapLayer('Gray').addTo(map);
  }

});