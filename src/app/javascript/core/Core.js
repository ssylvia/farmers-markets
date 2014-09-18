define(['jquery','app/data/Data','app/ui/Map','app/ui/Slides'],function($,Data,Map,Slides){

  var _map,
  _slides;

  $(document).bind('touchmove', false);

  function createMap(){
    // Create new map object
    _map = new Map('map',{
      mapOptions: {
        center: Data.mapConfig.center,
        zoom: Data.mapConfig.zoom,
        maxBounds: Data.mapConfig.maxBounds,
        minZoom: Data.mapConfig.minZoom,
        maxZoom: Data.mapConfig.maxZoom,
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

    $('#geocoder-wrapper input').on('keypress',function(event){
      var code = event.keyCode || event.which;
      if (code === 13){
        _map.geocodeAddress($(this));
      }
    });

    $('#search-button').click(function(){
      _map.geocodeAddress($('#geocoder-wrapper input'));
    });

    $(_map).on('geocodeAddressStart',function(){
      $('#search-button span').removeClass('icon-search').addClass('icon-spin animate-spin');
    });

    $(_map).on('geocodeAddressEnd',function(event,success){
      if (success){
        _slides.setSearchedForMarket(true);
        $('#geocoder-wrapper').fadeOut();
        if (_slides.getCurrentIndex() === 2){
          _slides.goToNext();
        }
      }
      $('#search-button span').addClass('icon-search').removeClass('icon-spin animate-spin');
    });
  }

  function createSlides(){
    _slides = new Slides();
    $(_slides).on('changeStart',changeStart);
    $(_slides).on('changeEnd',changeEnd);
  }

  function changeStart(event,changeItems){
    if ($('#geocoder-wrapper').is(':visible')){
      $('#geocoder-wrapper').fadeOut();
    }
    _map.changeLayers(changeItems.currentIndex);
  }

  function changeEnd(event,changeItems){
    _map.runMapTasks(changeItems.currentIndex);
  }

  createMap();
  createSlides();

});