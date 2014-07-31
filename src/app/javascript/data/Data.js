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
        url: 'http://staging.storymaps.esri.com/arcgis/rest/services/FarmersMarkets/markets/MapServer',
        scaleDependent: {
          minZoom: 2,
          maxZoom: 7
        }
      }]
    },

    slides: [{
      mainTitle: true,
      title: 'Lorem ipsum dolor sit amet, consectetur.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente omnis obcaecati placeat quam adipisci esse asperiores, dolore quidem maxime alias, magnam doloremque nam quasi architecto aliquam ea aut commodi corporis eligendi. Similique perspiciatis nesciunt quasi eos maiores quae. At, voluptatibus.',
      backgroundImage: 'resources/images/slideContent/backgrounds/market.jpeg'
    },{
      title: 'Farmer\'s Markets are exploding!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente omnis obcaecati placeat quam adipisci esse asperiores, dolore quidem maxime alias, magnam doloremque nam quasi architecto aliquam ea aut commodi corporis eligendi. Similique perspiciatis nesciunt quasi eos maiores quae. At, voluptatibus.',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      },
      task: {
        mapTasks: {
          type: 'geocodeAddress',
          delay: 3000
        }
      }
    },{
      title: 'Lorem ipsum dolor.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptatem, itaque, omnis, mollitia, tempore explicabo fugiat cumque fuga voluptates expedita obcaecati. Molestiae ab sequi commodi consequuntur harum labore recusandae doloremque laboriosam quibusdam et quod reiciendis odit nostrum officiis sunt hic odio quo, quam amet accusamus, modi possimus molestias nisi! Fugiat cupiditate blanditiis obcaecati, dolorum aliquid!',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      }
    },{
      title: 'Lorem ipsum dolor sit amet.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quos ad adipisci blanditiis, quod nam tempore quo placeat possimus repellendus.',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['FarmersMarketsTiles','FarmersMarkets']
      }
    }]

  };

  return _data;
});