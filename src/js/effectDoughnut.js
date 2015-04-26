var firebaseUrl = "https://deviineadmin.firebaseIO.com/";  // Generate a Firebase location
var firebaseRef = new Firebase(firebaseUrl);
var oneValEffect = parseInt($("#redeffect").attr("data-value"), 10);
var twoValEffect = parseInt($("#yelloweffect").attr("data-value"), 10);
var threeValEffect = 100 - (oneValEffect + twoValEffect);
var data = [
  {
    value: oneValEffect,
    color: "#f7253e"
  },
  {
    value: twoValEffect,
    color: "#fcd31c"
  },
  {
    value: threeValEffect,
    color: "#4ef253"
  }
];

var options = {
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: false,


  //The percentage of the chart that we cut out of the middle.
  percentageInnerCutout: 40,

  //Boolean - Whether we should animate the chart
  animation: true,

  //Number - Amount of animation steps
  animationSteps: 100,

  //String - Animation easing effect
  animationEasing: "easeOutQuart",

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false,

  //Function - Will fire on animation completion.
  onAnimationComplete: null
};

//Get the context of the canvas element we want to select
var ctx = document.getElementById("effectChart").getContext("2d");
var effectChart = new Chart(ctx).Doughnut(data, options);
