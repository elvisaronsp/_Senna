var confirmation = function(a, b) {
    b = $extend({
        'textBoxBtnOk': 'Sim',
        'textBoxBtnCancel': 'Não'
    }, b || {});
    Sexy.confirm(a, b);
};
if (window.jQuery && jQuery.i18n) jQuery.i18n.load({
    "intro_button_continuar": "Continuar",
    "intro_button_avancar": "Avan\u00e7ar",
    "intro_button_entendi": "<i class=\"icon-ok\"><\/i> Entendi",
    "intro_button_ok": "<i class=\"icon-ok\"><\/i> Ok",
    "intro_button_concluir": "<i class=\"icon-thumbs-up\"><\/i> Concluir",
    "intro_button_voltar": "Voltar",
    "intro_button_fechar": "Fechar",
    "intro_button_cancelar": "<i class=\"icon-remove\"><\/i> Cancelar Tutorial"
});

window.addEvent('domready', function() {
    list.onBeforeDeleteRow = function(row) {
            var ret = true;
            new Request({
                url: '/senna/usuario/perfis/verificaexistencia/' + row.nome,
                async: false,
                onComplete: function(response) {
                    if (response == '1') {
                        Sexy.alert("<h5>Atenção:</h5><br/><div style='max-height:270px;overflow:auto;display:block;'>isso ta errado precisa alterar. procurar por script_perfis_index.js</div>");
                        ret = false;
                    }
                }
            }).send();
            return ret;
    };
});