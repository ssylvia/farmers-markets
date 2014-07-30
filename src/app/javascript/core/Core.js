define(['jquery','app/data/Data','app/ui/Map','app/ui/Slides'],function($,Data,Map,Slides){

  var _map,
  _slides;

  function createMap(){
    // Create new map object
    _map = new Map('map',{
      mapOptions: {
        center: Data.mapConfig.center,
        zoom: Data.mapConfig.zoom,
        maxBounds: Data.mapConfig.maxBounds,
        minZoom: Data.mapConfig.minZoom,
      }
    });

    // Add basemap layers to map
    $.each(Data.mapConfig.basemapLayers,function(){
      _map.createLayers(this);
    });

    //Add operational layers to map
    $.each(Data.mapConfig.operationalLayers,function(){
      _map.createLayers(this);
    });

    _map.changeLayers(0);
  }

  function createSlides(){
    _slides = new Slides();
    $(_slides).on('changeStart',changeStart);
  }

  function changeStart(event,changeItems){
    _map.changeLayers(changeItems.currentIndex);
  }

  createMap();
  createSlides();

});