define([],function(){

  var _data = {

    defaults: {
      animationTime: 500
    },

    mapConfig: {
      center: [37.64, -97.11],
      zoom: 5,
      minZoom: 3,
      maxBounds: {
        southWest:[10,-188],
        northEast: [75,-20]
      },
      basemapLayers: [{
        name: 'Gray',
        type: 'esriBasemap',
        displayRetina: false
      },{
        name: 'GrayLabels',
        type: 'esriBasemap',
        displayRetina: false,
        scaleDependent: {
          minZoom: 8,
        }
      }],
      operationalLayers: [{
        name: 'FarmersMarkets',
        type: 'esriFeatureLayer',
        url: 'http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/Farmers_Markets_update/FeatureServer/0',
        popupTemplate: '<h3>{marketname}</h3>',
        scaleDependent: {
          minZoom: 8,
        },
      },{
        name: 'FarmersMarketsTiles',
        type: 'esriTileLayer',
        url: 'http://staging.storymaps.esri.com/arcgis/rest/services/FarmersMarkets/markets_v1/MapServer/',
        scaleDependent: {
          minZoom: 2,
          maxZoom: 7
        }
      }]
    },

    slides: [{
      mainTitle: true,
      title: 'Farmer\'s Markets: Americans continue to discover and celebrate fresh, locally-grown foods.',
      content: 'Farmer\'s markets have more than quadrupled in number since the U.S. Department of Agriculture began keeping records in 1994. Scroll down to explore the farmer\'s market phenomenon and discover markets in your community.',
      backgroundImage: 'resources/images/slideContent/backgrounds/market.jpeg'
    },{
      title: 'A bumper crop of farmer\'s markets',
      content: 'The National Farmer\'s Market Directory lists more than 8,000 markets, an increase of 76 percent since 1978. California hosts the most farmer’s markets, with New York not far behind. Market numbers are on the rise in all regions of the U.S., with the largest increase in the South.',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      },
      tasks: {
        mapTasks: [{
          type: 'centerAndZoom',
          data: {
            center: [37.64, -97.11],
            zoom: 5
          }
        }]
      }
    },{
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      },
      tasks: {
        mapTasks: [{
          type: 'showItem',
          data: {
            selector: '#geocoder-wrapper'
          }
        }]
      }
    },{
      title: 'Access by car to farmer\'s markets',
      content: 'The shaded areas are within a fifteen-minute drive of a farmer\'s market. Is your home convenient to a market?',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      }
    },{
      title: 'Walking to farmer\'s markets',
      content: 'The shaded areas are within a ten-minute walk of a farmer\'s market. Access to markets may be more difficult for residents of less affluent neighborhoods.',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      }
    }]

  };

  return _data;
});