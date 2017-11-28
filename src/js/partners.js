$(() => {
  
  console.log('partners');
  
  var partnerTypes = [
    {
      name: '战略合作伙伴',
      key: 'strategic-partner'
    },
    {
      name: '智慧合作伙伴',
      key: 'wise-partner'
    },
    {
      name: '特约合作伙伴',
      key: 'special-partner'
    },
    {
      name: '数据合作伙伴',
      key: 'data-partner'
    },
    {
      name: '战略合作媒体',
      key: 'strategic-media'
    },
    {
      name: '首席战略户外新媒体',
      key: 'outdoor-media'
    },
    {
      name: '特邀合作媒体',
      key: 'special-media'
    },
    {
      name: '合作媒体',
      key: 'data-media'
    },
  ];
  
  var timeStamp = new Date().valueOf();
  
  $.getJSON({
    url: `http://invest-images.oss-cn-shanghai.aliyuncs.com/production/cbndata_parterners.json?t=${timeStamp}`,
    success: function(data) {
      
      partnerTypes.forEach(item => {
        
        var filteredData = data
          .filter(datum => datum.type === item.key)
          .sort((a, b) => Number(a.order) - Number(b.order));
        
        if (filteredData.length > 0) {
          var logosHtml = '';
          filteredData.forEach(datum => {
            logosHtml += `
          <div class="logo-unit">
          <div class="logo" style="background-image: url('${datum.image_url}')"></div>
          </div>`;
          });
  
          var html = `
        <div class=${'section-unit ' + item.key}>
          <div class="section-title">${item.name}</div>
          <div class="logos-wrapper partners">${logosHtml}</div>
        </div>`;
          
          $('#organizations').append(html);
          
        }
        
      })
      
    }
  })
  
  
});
