define(['lib/leaflet/dist/leaflet'],function(){

  var _data = {

    defaults: {
      animationTime: 500
    },

    mapConfig: {
      center: [37.64, -97.11],
      zoom: 5,
      minZoom: 3,
      maxZoom: 16,
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
        scaleDependent: {
          minZoom: 8,
        },
        layerOptions: {
          pointToLayer: function(feature,latlng){
            return L.marker(latlng, {
              alt: feature.properties.marketname,
              riseOnHover: true,
              icon: L.icon({
                iconUrl: 'resources/images/mapIcons/farmers-markets.png',
                iconRetinaUrl: 'resources/images/mapIcons/farmers-markets-2x.png',
                iconSize: [33, 60],
                iconAnchor: [16, 54],
                popupAnchor: [0, -45],
              })
            });
          }
        }
      },{
        name: 'FarmersMarketsTiles',
        type: 'esriTileLayer',
        url: 'http://staging.storymaps.esri.com/arcgis/rest/services/FarmersMarkets/markets_v1/MapServer/',
        scaleDependent: {
          minZoom: 2,
          maxZoom: 7
        }
      },{
        name: 'DriveTime',
        type: 'esriTileLayer',
        url: 'http://staging.storymaps.esri.com/arcgis/rest/services/FarmersMarkets/driving_v3/MapServer/',
        layerOptions: {
          opacity: 0.6,
          maxNativeZoom: 12,
          maxZoom: 16
        },
        scaleDependent: {
          minZoom: 8,
          maxNativeZoom: 12,
          maxZoom: 16
        }
      },{
        name: 'WalkTime',
        type: 'esriTileLayer',
        url: 'http://staging.storymaps.esri.com/arcgis/rest/services/FarmersMarkets/walking_v1/MapServer/',
        layerOptions: {
          opacity: 0.6,
          maxNativeZoom: 12,
          maxZoom: 16
        },
        scaleDependent: {
          minZoom: 8,
          maxZoom: 16
        }
      }]
    },

    slides: [{
      mainTitle: true,
      title: 'The Rapid Rise of Farmers\' Markets',
      content: 'Farmers\' markets have more than quadrupled in number since the U.S. Department of Agriculture began keeping records in 1994. Scroll down to explore the farmers\' market phenomenon and discover markets in your community.',
      backgroundImage: 'resources/images/slideContent/backgrounds/market.jpeg'
    },{
      title: 'A bumper crop of farmers\' markets',
      content: 'The National Farmers\' Market Directory lists more than 8,000 markets, an increase of 76 percent since 2008. California hosts the most farmer’s markets, with New York not far behind. Market numbers are on the rise in all regions of the U.S., with the largest increase in the South.',
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
      title: 'Markets in your area',
      content: 'Click on market symbols for more information. Most include links to market websites. Zoom out if no markets are visible.',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      }
    },{
      title: 'Access by car to farmers\' markets',
      content: 'Blue shades on the map denote areas that are within a 15 minute drive of a farmers\' market. The darker the blue, the more markets that are within a 15 minute drive. In large cities, some residents are within a 15-minute drive of more than 60 markets. Currently, 96.2% of the nation\'s driving population is within a 15 minute drive of one or more farmers\' markets.<br /><br /><img src="resources/images/slideContent/drive.png" alt="Drive time legend" />',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets','DriveTime']
      }
    },{
      title: 'Walking to farmers\' markets',
      content: 'Green areas indicate a walking time of 10 minutes. The darker the green, the more markets are accessible by a convenient walk. Currently, 4.5% of the nations population is within a 10 minute walking distance to one or more farmers\' markets.<br /><br /><img src="resources/images/slideContent/walk.png" alt="Walk time legend" />',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets','WalkTime']
      }
    }],

    footer: {
      content: '<p>For more information on farmers\' markets, visit <a href="http://farmersmarkets.usda.gov" target="_blank">farmersmarkets.usda.gov</a>. If you didn’t see your local market, encourage your community organizer to contribute to the national directory.</p><br><br /><p class="spread-word">Spread the word: <span class="social-media"><span class="social-button social-facebook icon-facebook"></span><span class="social-button social-twitter icon-twitter"></span></span></p>',
      relatedStories: [{
        title: 'Feeding the World',
        url: 'http://storymaps.esri.com/stories/feedingtheworld/',
        thumbnail: 'http://www.arcgis.com/sharing/content/items/5c6188dd18654760ae59a6822a0a67f0/info/thumbnail/feeding.png'
      },{
        title: 'Zoo Babies',
        url: 'http://storymaps.esri.com/stories/2014/zoo-babies/',
        thumbnail: 'http://www.arcgis.com/sharing/content/items/6a213c9015604f80b47f8718debce911/info/thumbnail/Zoo.png'
      },{
        title: 'Twister Dashboard',
        url: 'http://storymaps.esri.com/stories/2014/tornadoes/',
        thumbnail: 'http://www.arcgis.com/sharing/rest/content/items/bf071b4bd72147108ddad032a7fdc092/info/thumbnail/Twist.png'
      }]
    }

  };

  return _data;
});