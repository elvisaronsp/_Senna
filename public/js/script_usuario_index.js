if (window.jQuery && jQuery.i18n) jQuery.i18n.load({
    "intro_button_continuar": "Continuar",
    "intro_button_avancar": "Avan\u00e7ar",
    "intro_button_entendi": "<i class=\"icon-ok\"><\/i> Entendi",
    "intro_button_ok": "<i class=\"icon-ok\"><\/i> Ok",
    "intro_button_concluir": "<i class=\"icon-thumbs-up\"><\/i> Concluir",
    "intro_button_voltar": "Voltar",
    "intro_button_fechar": "Fechar",
    "intro_button_cancelar": "<i class=\"icon-remove\"><\/i> Cancelar Tutorial",
    "lang_range_separator": "a",
    "lang_range_periodo_vazio": "Todo o Per\u00edodo",
    "lang_range_date_format": "dd mmm",
    "lang_range_date_format_dia": "dd de mmmm yyyy",
    "lang_range_date_format_mes": "mmmm yyyy",
    "lang_range_date_format_ano": "yyyy",
    "lang_date_format": "dd\/mm\/yyyy",
    "lang_start_date": "01\/01\/2011"
});

var confirmation = function(a, b) {
    b = $extend({
        'textBoxBtnOk': 'Sim',
        'textBoxBtnCancel': 'Não'
    }, b || {});
    Sexy.confirm(a, b);
};

/****************************
 usuario/funcionarios/list.js
 ****************************/

window.addEvent('domready', function() {
    list.onBeforeDeleteRow = function(row) {
        /*if(row.possui_vinculo == 0){
         $$('input[name=delete]').set('confirm','Deseja realmente apagar o Funcionário selecionado?');
         }
         else if(row.possui_vinculo == 1){
         $$('input[name=delete]').set('confirm','Este Funcionário não pode ser removido pois já efetuou login ou possui vínculos no sistema. Deseja desativá-lo?');
         }*/
        if (row.ativo == '0' && row.possui_log == 1) {
            Sexy.info('Este Funcionário já está inativo.');
            return false;
        }
    };

    list.datagrid.addEvent('loaddata', function() {
        $$('.btn_desativa').setStyle('display', 'none');
        $$('.btn_delete').setStyle('display', '');
    });

    list.datagrid.addEvent('click', function(row) {
        if (list.datagrid.getDataByRow(row.row).possui_log == '1' || list.datagrid.getDataByRow(row.row).possui_vinculo == '1') {
            $$('.btn_desativa').setStyle('display', '');
            $$('.btn_delete').setStyle('display', 'none');
        } else {
            $$('.btn_desativa').setStyle('display', 'none');
            $$('.btn_delete').setStyle('display', '');
        }
    });
});