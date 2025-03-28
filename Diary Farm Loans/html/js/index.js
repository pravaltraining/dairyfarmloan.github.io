$(document).ready(function() {
    $(".dropdown").hover(
        function() {
            $(this).find(".dropdown-menu").addClass("show");
        },
        function() {
            $(this).find(".dropdown-menu").removeClass("show");
        }
    );
});

$(document).ready(function () {
    $('#apply-loan').modal({
        backdrop: 'static',
        keyboard: false
    });
});

function openAdminPage(){
  window.location.href = 'admindashboard.html';
}

