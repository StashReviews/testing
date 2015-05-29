$(document).ready(function() {
  today = new Date()
  thisDay = today.getDay()
  $('#' + thisDay).addClass("active");
});