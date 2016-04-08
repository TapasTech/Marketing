export default {
  init() {
    this.cacheElements();
    this.bindEvents();
  },
  cacheElements() {
    this.$page0 = $('.page-container .page0');
    this.$fingerPrinter = this.$page0.find('.fingerprint');
    this.$scan = this.$page0.find('.scan');
  },
  bindEvents() {
    this.$fingerPrinter.on('click', this.handleFingerScan.bind(this));
  },
  handleFingerScan() {
    this.$scan.addClass('move');
    this.$page0.trigger('scanover');
  }
}