define(['jquery','app/data/Data','lib/leaflet/dist/leaflet','lib/esri-leaflet/dist/esri-leaflet','lib/esri-leaflet-geocoder/dist/esri-leaflet-geocoder'],function($,Data,L){

  return function(div,options){

    var settings = $.extend(true,{
      mapOptions: {
        center: [37.64, -97.11],
        zoom: 5,
        maxBounds: null,
        zoomControl: false,
        scrollWheelZoom: false
      }
    },options),
    layers = [],
    currentLayers;

    if (settings.mapOptions.maxBounds){
      settings.mapOptions.maxBounds = getMaxBounds(settings.mapOptions.maxBounds);
    }

    // Set Icon Directory
    L.Icon.Default.imagePath = 'resources/images/mapIcons';

    var map = L.map(div,settings.mapOptions);

    var zoomControl = new L.control.zoom({position: 'topright'});
    zoomControl.addTo(map);

    map.on('zoomend',function(){
      toggleZoomDependentLayers(map,currentLayers);
    });

    this.createLayers = function(layerObj,firstLoad){
      var layer,
      addLayer = true;
      switch (layerObj.type){
        case 'esriBasemap':
          layer = L.esri.basemapLayer(layerObj.name,{
            detectRetina: layerObj.displayRetina
          });
          break;
        case 'esriTileLayer':
          layer = L.esri.tiledMapLayer(layerObj.url);
          break;
        case 'esriFeatureLayer':
          layer = L.esri.featureLayer(layerObj.url,layerObj.layerOptions);
          if (layerObj.popupTemplate){
            layer.bindPopup(function (feature) {
              return L.Util.template(layerObj.popupTemplate, feature.properties);
            });
          }
          break;
        default:
          addLayer = false;
          console.log('Error: ' + layerObj.name + ' is not a supported layer type.');
      }
      if (addLayer){
        layer.scaleDependent = layerObj.scaleDependent;
        layers[layerObj.name] = layer;
      }
    };

    this.changeLayers = function(index){

      if (index < Data.slides.length && Data.slides[index].layers && Data.slides[index].layers.basemaps){
        var slideLayers = Data.slides[index].layers.basemaps.concat(Data.slides[index].layers.operational);

        currentLayers = [];

        for (var name in layers){
          if (layers.hasOwnProperty(name)){
            var layer = layers[name];
            if ($.inArray(name,slideLayers) < 0){
              map.removeLayer(layer);
            }
            else{
              currentLayers.push(layer);
              if (checkScaleDependency(map,layer)){
                map.addLayer(layer);
              }
            }
          }
        }
      }

      $('a[style]:eq(0)').show();

    };

    this.runMapTasks = function(index){
      if (index < Data.slides.length && Data.slides[index].tasks && Data.slides[index].tasks.mapTasks){
        $.each(Data.slides[index].tasks.mapTasks,function(){
          var self = this;
          switch (this.type){
            case 'centerAndZoom':
                map.setView(self.data.center,self.data.zoom);
              break;
            case 'showItem':
                $(self.data.selector).fadeIn();
              break;

          }
        });
      }
    };

    this.geocodeAddress = function(input){
      var self = this,
      geocoder = new L.esri.Services.Geocoding();

      $(self).trigger('geocodeAddressStart');

      geocoder.geocode(input.val(), {}, function (error, results) {
        if(!error && results.length > 0 && settings.mapOptions.maxBounds.contains(results[0].bounds)){
          map.fitBounds(results[0].bounds);
          $(self).trigger('geocodeAddressEnd',true);
        }
        else{
          input.val('Search for a valid location in the United States');
          $(self).trigger('geocodeAddressEnd',false);
        }
      });
    };

  };

  function checkScaleDependency(map,layer){
    var zoom = map.getZoom();
    if (layer.scaleDependent){
      if (layer.scaleDependent.minZoom && zoom < layer.scaleDependent.minZoom){
        return false;
      }
      else if (layer.scaleDependent.maxZoom && zoom > layer.scaleDependent.maxZoom){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return true;
    }
  }

  function toggleZoomDependentLayers(map,currentLayers){
    $.each(currentLayers,function(){
      if (!map.hasLayer(this) && checkScaleDependency(map,this)){
        map.addLayer(this);
      }
      else if (map.hasLayer(this) && !checkScaleDependency(map,this)){
        map.removeLayer(this);
      }
      $('a[style]:eq(0)').show();
    });
  }

  function getMaxBounds(maxBounds){
    if (maxBounds && maxBounds.southWest && maxBounds.northEast){
      return L.latLngBounds(maxBounds.southWest,maxBounds.northEast);
    }
  }

});
