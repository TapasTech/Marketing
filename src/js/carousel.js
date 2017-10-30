$(() => {
  
  console.log('carousel');
  const $personUnit = $('#carousel .person-unit');
  const $rowUnit = $('#carousel .row-unit');
  
  initMouseEvents();
  initAnimation();
  
  function initMouseEvents() {

    $personUnit.on(MOUSEENTER, function (e) {
      const $this = $(this);
      const $parentRowUnit = $this.parents('.row-unit');
      $parentRowUnit.addClass('paused');
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
        $avatar.css("backgroundImage", `url(http://z.dtcj.com/cbndata/avatars-color/${name}.png)`);
      } else {
        const gap = 420;
        var $detail = $this.find('.detail-wrapper');
        if (WIDTH - e.clientX < gap) {
          $detail.addClass('move-left');
        } else {
          $detail.removeClass('move-left');
        }
      }
    });
    $personUnit.on(MOUSEOUT, function(e) {
      if (!IS_MOBILE) {
        const $this = $(this);
        const $parentRowUnit = $this.parents('.row-unit');
        $parentRowUnit.removeClass('paused');
      }
    });
    
    $('body').on(CLICK, function (e) {
      $('.detail-popup').addClass('hidden');
      $('.row-unit.paused').removeClass('paused');
    });
  }
  
  function initAnimation() {
    let transX = [0, -100, 0, -100];
    const numRows = transX.length;
    const fps = 60;
    const period = 40;
    const transXperFrame = -100 / period / fps;
    const directionArray = [1, -1, 1, -1];
  
    function step() {
      for (let i = 0; i < numRows; i++) {
        let $currentRow = $($rowUnit[i]);
        if ($currentRow.hasClass('paused')) {
          continue;
        }
        let $repeatUnit = $currentRow.find('.repeat-unit');
        transX[i] += transXperFrame * directionArray[i];
        if (isEven(i) && transX[i] <= -100) {
          transX[i] = 0;
        }
        if (!isEven(i) && transX[i] >= 0) {
          transX[i] = -100;
        }
        $repeatUnit.css('transform', `translateX(${transX[i]}%)`);
      }
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
    function isEven(x) {
      return x % 2 === 0;
    }
  }
  
  
});
