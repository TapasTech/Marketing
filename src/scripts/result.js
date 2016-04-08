import resultTpl from '../templates/result'

export default class Result {

  constructor(props) {
    this.insertTpl(props);
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
  }

  insertTpl(status = false) {
    // insert result template
    this.$page3 = $('.page-container .page3');
    this.$page3.html(resultTpl);
    this.$resultContent = this.$page3.find('.result');
    if (status) {
      this.$resultContent.addClass('passed');
    }
  }

  cacheElements() {
    this.$page = $('.page-container .page');
    this.$showSchedule = this.$page3.find('.show-schedule');
    this.$restartGame = this.$page3.find('.restart-game');
  }

  bindEvents() {
    this.$restartGame.on('click', this.hanldStartClick.bind(this));
    this.$showSchedule.on('click', this.handleShowSchedule.bind(this));
  }

  handleShowSchedule(e) {
    e.preventDefault();
    this.$resultContent.addClass('lighten');
    // bubble method `destroy` to app.js because there is a 3s timeout
    this.$page3.trigger('lighten', this.destroy.bind(this));
  }

  hanldStartClick(e) {
    e.preventDefault();
    this.$page3.trigger('restart');
    this.destroy();
  }

  destroy() {
    this.$page3.empty();
  }
}
