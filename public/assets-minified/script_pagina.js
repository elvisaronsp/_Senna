$(window).load(function() {
    setTimeout(function() {
        $('#loading').fadeOut(400, "linear");
    }, 300);
});
$(document).ready(function() {

    $('#email').change(function () {

        if($('#email').val()!="")
          $('#bntRecuperarSenha').removeAttr('disabled');
        else
          $('#bntRecuperarSenha').attr('disabled','disabled');
    });

    $('#recuperarSenha').click(function () {
        $('#login').val('');
        $('#senha').val('');
    });

    $('#cancelarRecuperarSenha').click(function () {
        $('#email').val('');
        $('#bntRecuperarSenha').attr('disabled','disabled');
    });

    $('#bntSolicitarNovamente').click(function () {
        $('#atencao').remove();
    });



});