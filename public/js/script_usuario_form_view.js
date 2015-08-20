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
    "lang_start_date": "01\/01\/2011",
    "label_upload_error": "<b>Erro !<\/b>",
    "label_conf_remover": "Deseja realmente excluir este arquivo?<br\/>Esta opera\u00e7\u00e3o n\u00e3o poder\u00e1 ser desfeita.",
    "label_conf_sim": "Apagar Arquivo",
    "label_conf_nao": "Cancelar"
});


(function ($) {

    var preencheForm = function ($parent, json) {
        $parent.find("[name*=endereco__logradouro]").val(json.logradouro);
        $parent.find("[id*=endereco__bairro]").val(json.bairro);
        $parent.find("[id*=cidade_nome]").val(json.cidade);
        $parent.find("[id*=cidade_cod]").val(json.cidade_cod);
        $parent.find("[id*=estado_nome]").val(json.estado);
        $parent.find("[id*=estado_cod]").val(json.estado_cod);
        $parent.find("[id*=pais_nome]").val(json.pais);
        $parent.find("[id*=pais_cod]").val(json.pais_cod);
        $parent.find("[name*=endereco__cep]").val(json.cep);
        $parent.find("[name*=endereco_entidade__id_endereco]").val(json.id);
        $parent.find('[name*=btn_mapa]').removeAttr('disabled').unbind('click').click(
            function () {
                var container = $parent;

                showMap(container);
            }
        );
    };


    var exist_principal = function () {
        var retorno = false;
        var fields = $('#endereco .clonedField:not(.hiddenClone)').find('[name*=principal_radio]');
        fields.each(function () {
            if ($(this).is(':checked'))
                retorno = true;
        });
        return retorno;
    };

    var set_principal_padrao = function () {
        var visibles = $('#endereco .clonedField:not(.hiddenClone):first');
        var inserido_ultimo = $('#endereco .clonedField:not(.hiddenClone):last');
        if (inserido_ultimo.find('[name*=endereco_entidade__id]').val() == '') {
            $('#endereco .clonedField:not(.hiddenClone):last').find('[name*=btn_mapa]').attr('disabled', 'disabled');
        }
        if (!exist_principal()) {
            visibles.find('[name*=principal_radio]').attr('checked', 'checked');
            visibles.find('[name*=__principal]').val(1);
        }
    };

    jQuery(document).ready(function () {

        // Trata cadastro de endereço principal
        $('#endereco .clonedField').each(
            function () {
                /*acao_novo_endereco($(this));
                 auto_comlepete_endereco($(this));*/

                if ($(this).find('[name*=__principal]').val() == 1) {
                    $(this).find('[name*=principal_radio]').attr('checked', 'checked');
                }
                $(this).find('[name*=principal_radio]').click(
                    function () {
                        $('[name*=endereco_entidade__principal]').val('0');
                        $(this).parents('.clonedField').find('[name*=__principal]').val($(this).is(':checked') ? 1 : 0);
                    }
                );
            }
        );

        //verifica se existe algum campo marcado como principal na hora de remover um clone
        $(".removeClone").click(function () {
            set_principal_padrao();
        });
        //verifica se existe algum campo marcado como principal na hora de inserir um clone
        $(".cloneable").click(function () {
            set_principal_padrao();
        });

        /* BOTÃO DE BUSCA DE CEP ******************************/
        $("[id*=btn_cep]").click(function (evt, el) {
            get_cep_ws($(this).parents('.clonedField'))
        });
        $("[name*=endereco__cep]").blur(function (evt, el) {
            if ($('#flag_exterior').val() != '1')
                get_cep_ws($(this).parents('.clonedField'))
        });


        $("[id*=endereco__id_cidade]").change(function (evt, el, json) {

            container = $(this).parents('.clonedField');
            $(container).find("[name*=endereco__id_cidade]").val(json.id);
            $(container).find("[name*=localidade_cidade__nome]").val(json.nome);
            $(container).find("[name*=cidade_cod]").val(json.cod);
            $(container).find("[name*=estado_cod]").val(json.cod_estado);
            $(container).find("[name*=estado]").val(json.sigla);
        });

        $("[id*=btn_correio]").click(function (evt, el) {
            window.open('http://www.buscacep.correios.com.br/');
        });


    });

    //######## CONSULTA DE CEP #######
    var get_cep_ws = function (container) {
        //Carregando
        $("#loader").show().find(".carregando").hide();
        $("#loader").find(".enviando").show();

        var cep = $(container).find("[name*=endereco__cep]").val();
        if (!cep) {
            Sexy.alert('Por favor, informe o CEP.');
            $("#loader").hide();
        } else {
            $.getJSON("/senna/cadastro/endereco/busqueEnderecoPorCep/" + cep, {}, function (json) {
                if (!json || json.resultado == '') {
                    $("#loader").hide();
                    Sexy.alert("Não foi possível pesquisar este CEP. Por favor tente novamente em alguns instantes");
                    return false;
                }

                if (!json || json.resultado == 0) {
                    $("#loader").hide();
                    Sexy.alert("CEP não encontrado.");
                    return false;
                }

                //Erro ao recuperar CEP
                if (json.cod_error) {
                    $("#loader").hide();
                    Sexy.alert("Não foi possível pesquisar este CEP. Por favor tente novamente em alguns instantes");
                    return false;

                }

                //Verificando se houve retorno no webservice caso não manda editar direto
                if (json.logradouro != '' && json.bairro != '' && json.id_cidade != '') {
                    json.uf_nome = json.uf;
                    $(container).find('[name*=endereco__cep]').val(json.cep);
                    $(container).find('[name*=endereco__logradouro]').val(json.logradouro);
                    $(container).find('[name*=endereco__bairro]').val(json.bairro);
                    $(container).find('[name*=endereco__id_cidade]').val(json.cidade); //id_cidade
                    $(container).find('[autosuggest*=endereco__id_cidade]').val(json.cidade);
                    $(container).find('[name*=estado]').val(json.estado_nome);
                    $(container).find('[name*=pais]').val(json.pais);
                    $(container).find('[name*=endereco__id_pais]').val(json.id_pais);
                    $(container).find('[name*=cidade_cod]').val(json.cod_ibge_municipio);
                    $(container).find('[name*=estado_cod]').val(json.cod_ibge_estado);
                    $(container).find('[name*=pais_cod]').val(json.pais_cod);
                } else {
                    $(container).find('[name*=endereco__cep]').val(json.cep);
                    $(container).find('[name*=endereco__id_cidade]').val(json.id_cidade);
                    $(container).find('[autosuggest*=endereco__id_cidade]').val(json.cidade);
                    $(container).find('[name*=estado]').val("TE");
                    $(container).find('[name*=pais]').val(json.pais);
                    $(container).find('[name*=cidade_cod]').val(json.cod_ibge_municipio);
                    $(container).find('[name*=estado_cod]').val(json.cod_ibge_estado);
                    $(container).find('[name*=endereco_entidade__numero]').focus();
                }
                $("#loader").hide();
            });
        }
    }


})(jQuery);

(function ($) {


    var tratamento_change_tipo_contato = function (el) {
        $('[id*=contato].clonedField').find('[name*=ac_]').each(function () {
            switch ($(this).parents('span:first').find('[name*=contato__id_tipo_contato]').val()) {
                case '1':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('mask', '(99)9999-9999?9');
                    break;
                case '2':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
                    break;
                case '3':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('url', 'true');
                    break;
                case '4':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
                    break;
                case '5':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('mask', '(99)9999-9999?9');
                    break;
            }
        });
    };


    var tipo_contato = new Array();

    tipo_contato["1"] = "T";

    tipo_contato["2"] = "E";

    tipo_contato["3"] = "O";

    tipo_contato["4"] = "O";

    tipo_contato["5"] = "O";

    //Principal
    $(document).ready(function () {


        $('[id*=contato].clonedField').find('[name*=ac_]').each(function () {
            switch ($(this).parents('span:first').find('[name*=contato__id_tipo_contato]').val()) {
                case '1':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('mask', '(99)9999-9999?9');
                    break;
                case '2':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
                    break;
                case '3':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('url', 'true');
                    break;
                case '4':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
                    break;
                case '5':
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('mask', '(99)9999-9999?9');
                    break;
            }
        });

        //adicionando comportamento ao evento click no tipo de contato.
        $(this).find('[name*=contato__id_tipo_contato]').change(function () {
            tratamento_change_tipo_contato($(this));
        }).bind('clear', function () {
            tratamento_change_tipo_contato($(this));
        });

        $('[rel=contato]').focus();
    });

})(jQuery);




(function ($) {




    $(document).ready(function () {
        $('#tab_dependentes_tab').hide();
    });
})(jQuery);

(function ($) {
    $(document).ready(function () {

        var botao_inserir_novo = $("#contato .cloneable");
        var botao_inserir_novo_endereco = $("#endereco .cloneable");

        if ($("#id").val() == '') {
            var botao_excluir = $("#contato .removeClone:first");
            $(botao_inserir_novo).click();
            $(botao_excluir).click();
        }

        $('[id*=contato].clonedField').find('.clone_id').each(function () {
            if ($(this).val() != "")
                (botao_inserir_novo).click();
        });

        // abre todos os enderecos
        $('[id*=endereco].clonedField').each(function () {
            botao_inserir_novo_endereco.click();
        });

        // fecha todos os enderecos (correcaod de bug da copia ... erro no riquered)
        $('[id*=endereco].clonedField').each(function () {
            var cep = $(this).find('div:last :input').attr('value');
            if (!cep)
            {
                var botao_excluir_contato = $(this).find(".removeClone:first");
                botao_excluir_contato.click();
            }

        });
    });
})(jQuery);



(function ($) {
    $(document).ready(function () {
        $("#senha").val('');

        if ($('#contato').find('.clonedField:not(.hiddenClone)').length == 0) {
            $('#fieldset_contato').html('infelizmente  n&atilde;o &agrave; nenhum contato seu cadastrado. Que tal dar uma passadinha no RH e atualizar seu cadastro?.')
        }
        if ($('#endereco').find('.clonedField:not(.hiddenClone)').length == 0) {
            $('#fieldset_endereco').text('Infelizmente não à nenhum endereco seu cadastrado. Que tal dar uma passadinha no RH e atualizar seu cadastro? =) .')
        }

        $('.cloneable,.removeClone').remove();


        // desabilita os campos de tipo de cadastro em contatos para que o usuario nao possa alterar
        $('#contato__id_tipo_cadastro_0 ').attr("readonly","true");
        $('#contato__id_tipo_cadastro_1 ').attr("readonly","true");
        $('#contato__id_tipo_cadastro_2 ').attr("readonly","true");
        $('#contato__id_tipo_cadastro_3 ').attr("readonly","true");
        $('#contato__id_tipo_cadastro_4 ').attr("readonly","true");

        function beforeSuccess(btn, text){
            var p = window.parent;
            var d = parent.document;
            if(text.session_updated && text.session_updated!=''){
                parent.Sexy.alert("Seu perfil de acesso foi alterado com sucesso!<br/><br/>Contanto, é necessário recarregar o sistema para que as novas permissões tenham efeito.<br/><br/><b>ATENÇÃO:</b> Você perderá todas as informações que não estejam salvas.", {
                    onComplete: function(val) {
                        if(val){
                            jQuery(d).find("#loader").show();
                            p.location.reload();
                        }
                    }
                });
            }
        }
        $$('#form').addEvent('afterSubmit', beforeSuccess);
    });
})(jQuery);

jQuery(document).ready(function () {
    jQuery.extend(jQuery.validator.messages, {
        accept: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.'/> ",
        cnpj: "<img src='/images/alert.png' class='tooltip' title='Informe um CNPJ válido.'/> ",
        cpf: "<img src='/images/alert.png' class='tooltip' title='Informe um CPF válido.'/> ",
        creditcard: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.'/> ",
        date: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma data v&aacute;lida.'/> ",
        digits: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a somente d&iacute;gitos.'/> ",
        email: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.'/> ",
        equalTo: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a o mesmo valor novamente.'/> ",
        max: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor menor ou igual a {0}.'/> "),
        maxlength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a n&atilde;o mais que {0} caracteres.'/> "),
        min: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior ou igual a {0}.'/> "),
        minlength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a ao menos {0} caracteres.'/> "),
        number: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um n&uacute;mero v&aacute;lido.'/> ",
        range: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor entre {0} e {1}.'/> "),
        rangelength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor contendo de {0} a {1} caracteres.'/> "),
        required: "<img src='/images/alert.png' class='tooltip' title='Este campo é obrigatório.'/> ",
        requiredIf: "<img src='/images/alert.png' class='tooltip' title='Este campo deve ser preenchido.'/> ",
        remote: "<img src='/images/alert.png' class='tooltip' title='Por favor, corrija este campo.'/> ",
        url: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma URL v&aacute;lida.'/> ",
        time: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma hora válida'/> ",
        code: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um código válido'/> ",
        price: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior que 0'/> ",
        cidade: "<img src='/images/alert.png' class='tooltip' title='Cidade não cadastrada no sistema.'/> ",
        pais: "<img src='/images/alert.png' class='tooltip' title='País não 'cadastrado no sistema.'/> ",
        requiredCep: "<img src='/images/alert.png' class='tooltip' title='CEP e ou Logradouro não cadastrados no sistema.'/> ",
        transporte: "<img src='/images/alert.png' class='tooltip' title='O valor deste campo deve ser definido.'/> ",
        positive: "<img src='/images/alert.png' class='tooltip' title='Forneça um valor maior que 0,00.'/> ",
        cfop: "<img src='/images/alert.png' class='tooltip' title='CFOP inválido'/> ",
        cfop_transp: "<img src='/images/alert.png' class='tooltip' title='CFOP inválido'/> ",
        code_ean: "<img src='/images/alert.png' class='tooltip' title='Caso seja preenchido, este campo deve ser um EAN válido e possuir 8, 12,13 ou 14 caracteres.'/> ",
        number_letter: "<img src='/images/alert.png' class='tooltip' title='Por favor insirá apenas números ou letras, não será permitido caracteres especiais'/> ",
        cod_ncm: "<img src='/images/alert.png' class='tooltip' title='Caso seja preenchido ,este campo deve possuir 2 ou 8 caracteres.'/> ",
        max_vr_cupom: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='O valor neste campo deve ser inferior a {0}'/> "),
        autosuggest: "<img src='/images/alert.png' class='tooltip' title='Este campo não possui um valor válido selecionado'/> ",
        password: "<img src='/images/alert.png' class='tooltip' title='Senha deve conter pelo menos 6 caracteres utilizando letras e números'/> "
    });
});

Date.monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
Date.abbrMonthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
Date.dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
jQuery.dpText = {
    TEXT_PREV_YEAR: 'Ano Anterior',
    TEXT_PREV_MONTH: 'Mês Anterior',
    TEXT_NEXT_YEAR: 'Próximo Ano',
    TEXT_NEXT_MONTH: 'Próximo Mês',
    TEXT_CLOSE: 'Fechar',
    TEXT_CHOOSE_DATE: 'Escolha a Data',
    HEADER_FORMAT: 'mmmm yyyy'
};
Date.firstDayOfWeek = 0;
Date.format = jQuery.i18n._('lang_date_format');

