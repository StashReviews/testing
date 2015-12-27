/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Form Validation - REF: http://validity.thatscaptaintoyou.com/Demos/index.htm#CommonValidators */
$(function () {
  $("#reserveUsernameForm").validity(function() {
      $(".reserveUsernameInput").require().maxLength(20, "Sorry, usernames cannot be longer than 20 characters.").minLength(3, "Sorry, usernames cannot be less than 3 characters.");
      $(".reserveEmailInput").require().match("email");
  }); 
  $("#reserveUsernameTakenForm").validity(function() {
      $(".reserveUsernameInput").require().maxLength(20, "Sorry, usernames cannot be longer than 20 characters.").minLength(3, "Sorry, usernames cannot be less than 3 characters.");
      $(".reserveEmailInput").require().match("email");
  }); 
})

/* Reserve Username Modal */
$(".reserveBtn").on("click", function(){
  $('#rebrandingModal').modal('hide');
  $('#reserveUsernameModal').modal('show');
  $('#reserveEmailTakenModal').modal('hide');
  $('#reserveUsernameTakenModal').modal('hide');
  $('#reserveUsernameSuccessModal').modal('hide');
})


