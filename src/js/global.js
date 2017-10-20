
const WIDTH = window.innerWidth || document.documentElement.clientWidth;
// iPad屏幕宽度(含)以内的，算作移动设备
const IS_MOBILE = WIDTH <= 768;

// 如果存在ontouchstart事件，并且是移动设备，则用ontouchstart替换点击事件，以加快事件响应速度。
let CLICK = 'click';
let MOUSEENTER = 'mouseenter';
let MOUSEOUT = 'mouseout';
if ('ontouchstart' in window && IS_MOBILE) {
  CLICK = 'touchstart';
  MOUSEENTER = 'touchstart';
  MOUSEOUT = 'touchend';
}

