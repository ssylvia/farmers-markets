define(['app/data/Data','app/ui/Map'],function(Data,Map){

  var _map = new Map('map',Data.mapConfig.center,Data.mapConfig.zoom);
});