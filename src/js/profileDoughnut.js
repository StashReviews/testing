var oneValProfile = parseInt($("#redprofile").attr("data-value"), 10);
var twoValProfile = parseInt($("#yellowprofile").attr("data-value"), 10);
var threeValProfile = 100 - (oneValProfile + twoValProfile);
var data = [
  {
    value: oneValProfile,
    color: "#f7253e"
  },
  {
    value: twoValProfile,
    color: "#fcd31c"
  },
  {
    value: threeValProfile,
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
var ctx = document.getElementById("profileChart").getContext("2d");
var profileChart = new Chart(ctx).Doughnut(data, options);
