var firebaseUrl = "https://deviineadmin.firebaseIO.com/";  // Generate a Firebase location
var firebaseRef = new Firebase(firebaseUrl);
var flavor1 = $(".flavor1").html();
console.log(flavor1);
// var flavor2 = $(".flavor2").attr("data-value");
var flavor2 = parseInt($(".flavor2").attr("data-value"), 10);
console.log(flavor2);
var flavor3 = 100 - (flavor1 + flavor2);
console.log(flavor3);
var data = [
  {
    value: flavor1,
    color: "#f7253e"
  },
  {
    value: flavor2,
    color: "#fcd31c"
  },
  {
    value: flavor3,
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
var ctx = document.getElementById("flavorChart").getContext("2d");
var flavorChart = new Chart(ctx).Doughnut(data, options);