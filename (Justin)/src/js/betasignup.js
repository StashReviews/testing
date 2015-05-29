// When fields are verified, h2 should turn green.
// When all fields are verified, .enter should turn green and be clickable. 

var firebaseRef = new Firebase('https://dazzling-inferno-1178.firebaseio.com/users');

$('form').submit(function(event) {
  firebaseRef.push({
    "name": $('#name').val(),
    "nickname": $('#nickname').val(),
    "email": $('#email').val(),
    "phone": $('#phone').val(),
    "location": $('#location').val(),
    "birthdate": $('#year').val() + '-' + $('#month').val() + '-' + $('#day').val(),
    "howusage": $('#howusage').val(),
    "whereusage": $('#whereusage').val()
  });
  event.preventDefault();
});