$(() => {
  
  console.log('partners');
  
  var types = [
    {
      name: '战略合作伙伴',
      key: 'strategic-partner'
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
      name: '特邀合作媒体',
      key: 'special-media'
    },
    {
      name: '合作媒体',
      key: 'data-media'
    },
  ];
  
  
  $.getJSON({
    url: 'http://invest-images.oss-cn-shanghai.aliyuncs.com/production/cbndata_parterners.json',
    success: function(data) {
      console.log(data);
      
      types.forEach((item, index) => {
        
        var filteredData = data.filter(datum => datum.type === item.key).sort(datum => Number(datum.order));
        
        var logosHtml = '';
        filteredData.forEach(datum => {
          logosHtml += `
          <div class="logo-unit">
          <div class="logo" style="background-image: url('${datum.image_url}')"></div>
          </div>`;
        });
        
        var html = `
        <div class="section-unit">
          <div class="section-title">${item.name}</div>
          <div class="logos-wrapper partners">${logosHtml}</div>
        </div>`;
        
        $('#organizations').append(html);
        
      })
      
    }
  })
  
  
});
