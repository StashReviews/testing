$(function() {
    $("input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('.signupBtn').click();
            return false;
        } else {
            return true;
        }
    });
});