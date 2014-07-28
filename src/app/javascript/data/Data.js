define(['lib/leaflet/dist/leaflet'],function(){

  var _data = {

    mapConfig: {
      center: [37.64, -97.11],
      zoom: 5,
      minZoom: 3,
      maxBounds: {
        southWest:[20,-188],
        northEast: [75,-20]
      },
      basemapLayers: [{
        name: 'Gray',
        type: 'esriBasemap'
      }],
      operationalLayers: [{
        name: 'GrayLabels',
        type: 'esriBasemap'
      }]
    },

    slides: [{
      title: 'Farmer\'s Markets are exploding!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente omnis obcaecati placeat quam adipisci esse asperiores, dolore quidem maxime alias, magnam doloremque nam quasi architecto aliquam ea aut commodi corporis eligendi. Similique perspiciatis nesciunt quasi eos maiores quae. At, voluptatibus.'
    },{
      title: 'Lorem ipsum dolor.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis voluptatem, itaque, omnis, mollitia, tempore explicabo fugiat cumque fuga voluptates expedita obcaecati. Molestiae ab sequi commodi consequuntur harum labore recusandae doloremque laboriosam quibusdam et quod reiciendis odit nostrum officiis sunt hic odio quo, quam amet accusamus, modi possimus molestias nisi! Fugiat cupiditate blanditiis obcaecati, dolorum aliquid!'
    },{
      title: 'Lorem ipsum dolor sit amet.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quos ad adipisci blanditiis, quod nam tempore quo placeat possimus repellendus.'
    }]

  };

  return _data;
});