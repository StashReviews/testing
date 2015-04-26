// When date and beta code are verified, h2 should turn green.

// When both data and beta code are verified, #enter should turn green and be clickable. 

// @author dsiddy Disable the submit button initially.

$(document).ready(function() {
  $('#enter').attr('disabled', 'disabled');

  var ageBox = $('input[name="age"]');
  (ageBox).change(function dob_check() {
    if(this.checked) {
      $('.ageText').css('color', 'rgb(61, 216, 97)');
      return true;
    }
    else {
      $('.ageText').css('color', 'rgb(247,37,62)');
      return false;
    }
  });

  function code_check() {
    var code = 'user1';
    if($('input[name="betacode"]').val() == code) {
      $('.betaCodeText').css('color', 'rgb(247,37,62)');
      return false;
    } else {
      $('.betaCodeText').css('color', 'rgb(61, 216, 97)');
      return true;
    }
  }

  function validateForm() {
    if(code_check() && dob_check()) {
      $('#enter').css('background', 'rgb(61, 216, 97)');
      $('#enter').removeAttr('disabled'); // @author dsiddy Enable the submit button if the form inputs are valid.
      return true;
    } else {
      $('#enter').css('background', 'rgb(247, 37, 62)');
      $('#enter').attr('disabled', 'disabled'); // @author dsiddy Disable the submit button if the form inputs aren't valid.
      return false;
    }
  }

  (function() {
    $('.bday').change(dob_check);
    $('.bday').change(validateForm);

    $('.betacode').keyup(code_check);
    $('.betacode').keyup(validateForm);
  })();
});
//on submit == page exit