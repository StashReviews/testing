var oneValNegative = parseInt($("#rednegative").attr("data-value"), 10);
var twoValNegative = parseInt($("#yellownegative").attr("data-value"), 10);
var threeValNegative = 100 - (oneValNegative + twoValNegative);
var data = [
  {
    value: oneValNegative,
    color: "#f7253e"
  },
  {
    value: twoValNegative,
    color: "#fcd31c"
  },
  {
    value: threeValNegative,
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
var ctx = document.getElementById("negativeChart").getContext("2d");
var negativeChart = new Chart(ctx).Doughnut(data, options);
