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
        displayRetina: true
      },{
        name: 'GrayLabels',
        type: 'esriBasemap',
        displayRetina: false
      }],
      operationalLayers: [{
        name: 'FarmersMarkets',
        type: 'esriFeatureLayer',
        url: 'http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/Farmers_Markets_update/FeatureServer/0',
        popupTemplate: '<h3>{marketname}</h3>',
        scaleDependent: {
          minZoom: 8,
          maxZoom: 10,
        }
      }]
    },

    slides: [{
      title: 'Farmer\'s Markets are exploding!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente omnis obcaecati placeat quam adipisci esse asperiores, dolore quidem maxime alias, magnam doloremque nam quasi architecto aliquam ea aut commodi corporis eligendi. Similique perspiciatis nesciunt quasi eos maiores quae. At, voluptatibus.',
      layers: {
        basemaps: ['Gray'],
        operational: ['FarmersMarkets']
      }
    },{
      title: 'Lorem ipsum dolor.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptatem, itaque, omnis, mollitia, tempore explicabo fugiat cumque fuga voluptates expedita obcaecati. Molestiae ab sequi commodi consequuntur harum labore recusandae doloremque laboriosam quibusdam et quod reiciendis odit nostrum officiis sunt hic odio quo, quam amet accusamus, modi possimus molestias nisi! Fugiat cupiditate blanditiis obcaecati, dolorum aliquid!',
      layers: {
        basemaps: ['Gray','GrayLabels'],
        operational: ['']
      }
    },{
      title: 'Lorem ipsum dolor sit amet.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quos ad adipisci blanditiis, quod nam tempore quo placeat possimus repellendus.',
      layers: {
        basemaps: ['Gray'],
        operational: ['FarmersMarkets']
      }
    }]

  };

  return _data;
});