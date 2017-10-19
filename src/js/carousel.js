$(() => {
  
  console.log('carousel');
  
  const mouseEnter = 'mouseenter';
  const $personUnit = $('#carousel .person-unit');
  
  $personUnit.on(mouseEnter, function (e) {
    const $this = $(this);
    if (IS_MOBILE) {
      e.stopPropagation();
      const attributes = ['name', 'job', 'type', 'title', 'time'];
      const values = [];
      attributes.forEach(item => {
        values.push($this.attr('data-' + item));
      });
      const [name, job, type, title, time] = values;
      const $popup = $('.detail-popup');
      $popup.removeClass('hidden');
      const $text = $popup.find('.text-wrapper');
      const $avatar = $popup.find('.avatar');
      $text.find('.job').html(job);
      $text.find('.type').html(type);
      $text.find('.title').html(title);
      $text.find('.time').html(time);
      $avatar.css("backgroundImage", `url(http://z.dtcj.com/cbndata/avatars/${name}.png)`);
      return;
    }
    
    const gap = IS_MOBILE ? 190 : 420;
    var $detail = $this.find('.detail-wrapper');
    if (WIDTH - e.clientX < gap) {
      $detail.addClass('move-left');
    } else {
      $detail.removeClass('move-left');
    }
  });
  
  $('body').on(CLICK, function (e) {
    $('.detail-popup').addClass('hidden');
  });
  
  let transX = [0, -100, 0, -100];
  const numRows = transX.length;
  const $rowUnit = $('.row-unit');
  const fps = 60;
  const period = 40;
  const transXperFrame = -100 / period / fps;
  const directionArray = [1, -1, 1, -1];
  
  function step() {
    for (let i = 0; i < numRows; i++) {
      transX[i] += transXperFrame * directionArray[i];
      if (isEven(i) && transX[i] <= -100) {
        transX[i] = 0;
      }
      if (!isEven(i) && transX[i] >= 0) {
        transX[i] = -100;
      }
      $($rowUnit[i]).find('.repeat-unit').css('transform', `translateX(${transX[i]}%)`);
    }
    window.requestAnimationFrame(step);
  }
  
  window.requestAnimationFrame(step);
  
  function isEven(x) {
    return x % 2 === 0;
  }
  
});
