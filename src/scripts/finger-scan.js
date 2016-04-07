export default {
  init() {
    this.cacheElements();
    this.fingerScan();
  },
  cacheElements() {
    this.$page0 = $('.page-container .page0');
    this.$scan = this.$page0.find('.scan');
  },
  fingerScan() {
    this.$scan.addClass('move');
  }
}