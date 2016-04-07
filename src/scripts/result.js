import resultTpl from '../templates/result.html'

export default class Result {

  constructor() {
    // this.getDefaultProps();
    this.init();
  }

  getDefaultProps() {
  }

  init() {
    // insert result template
    $('.page-container .page3').html(resultTpl);
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.$page3 = $('.page-container .page3');
    this.$showSchedule = this.$page.find('.show-schedule');
    this.$restartGame = this.$page.find('.restart-game');
    this.$restartGame.on('click', this.hanldStartClick.bind(this));
  }

  bindEvents() {
    this.$showSchedule.on('click', this.handleShowSchedule.bind(this));
  }

  handleShowSchedule(e) {
    e.preventDefault();
    this.$resultPage.addClass('lighten');
  }

  hanldStartClick(e) {
    this.switchNextPage(e);
    this.game = new Game();
  }

  destory() {
    this.$page3.empty();
  }
}
