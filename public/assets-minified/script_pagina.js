$(window).load(function() {
    setTimeout(function() {
        $('#loading').fadeOut(400, "linear");
    }, 300);
});
$(document).ready(function() {

    $('#recuperarSenha').click(function () {
        $('#login').val('');
        $('#senha').val('');
    });

    $('#cancelarRecuperarSenha').click(function () {
        $('#email').val('');
    });
});