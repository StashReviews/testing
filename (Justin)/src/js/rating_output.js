 // on page load...
 moveProgressBar();
 // on browser resize...
 $(window).resize(function() {
 moveProgressBar();
 });
 // THIS SCRIPT NEEDS TO BE UPDATED TO PULL THE RATING FROM FIREBASE FOR THE CORRESPONDING STRAIN OR DISPENSARY
 // SIGNATURE PROGRESS
 function moveProgressBar() {
 console.log("moveProgressBar");
 var getPercent = ($('.progress-wrap').data('progress-percent') / 5);
 var getProgressWrapWidth = $('.progress-wrap').width();
 var progressTotal = getPercent * getProgressWrapWidth;
 var animationLength = 1700;

 // on page load, animate percentage bar to data percentage length
 // .stop() used to prevent animation queueing
 $('.progress-bar').stop().animate({
 left: progressTotal
 }, animationLength);
 }
 