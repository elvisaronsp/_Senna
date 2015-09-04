
if (window.jQuery && jQuery.i18n) jQuery.i18n.load({
    "intro_button_continuar": "Continuar",
    "intro_button_avancar": "Avan\u00e7ar",
    "intro_button_entendi": "<i class=\"icon-ok\"><\/i> Entendi",
    "intro_button_ok": "<i class=\"icon-ok\"><\/i> Ok",
    "intro_button_concluir": "<i class=\"icon-thumbs-up\"><\/i> Concluir",
    "intro_button_voltar": "Voltar",
    "intro_button_fechar": "Fechar",
    "intro_button_cancelar": "<i class=\"icon-remove\"><\/i> Cancelar Tutorial",
    "label_sim": "Sim",
    "label_nao": "N\u00e3o",
    "lang_range_separator": "a",
    "lang_range_periodo_vazio": "Todo o Per\u00edodo",
    "lang_range_date_format": "dd mmm",
    "lang_range_date_format_dia": "dd de mmmm yyyy",
    "lang_range_date_format_mes": "mmmm yyyy",
    "lang_range_date_format_ano": "yyyy",
    "lang_date_format": "dd\/mm\/yyyy",
    "lang_start_date": "01\/01\/2011",
    "intro_button_cadastrar_produto": "Cadastrar Produto",
    "intro_inicio_title": "Cadastro de Cliente",
    "intro_inicio_text": "Estamos agora no menu <b>Clientes<\/b> onde vamos aprender a cadastrar nosso primeiro Cliente.",
    "intro_lista_title": "Listagem de Cliente",
    "intro_lista_text": "Aqui ser\u00e3o listados alguns clientes cadastrados.<br\/> Em cada p\u00e1gina podem ser exibidos de 25 a 200 clientes.",
    "intro_lista_cliente_title": "P\u00e1gina\u00e7\u00e3o",
    "intro_lista_cliente_text": "Aqui voc\u00ea escolhe quantos clientes ser\u00e3o exibidos por p\u00e1gina.",
    "intro_lista_paginacao_title": "P\u00e1gina\u00e7\u00e3o",
    "intro_lista_paginacao_text": "Aqui voc\u00ea navegar\u00e1 entre as p\u00e1ginas.",
    "intro_filtrar_title": "Filtrar",
    "intro_filtrar_text": "Aqui voc\u00ea pode pesquisar os clientes por <b>palavras-chaves<\/b>, como nome, email, telefone.",
    "intro_filtro_avancado_title": "Filtro Avan\u00e7ado",
    "intro_filtro_avancado_text": "Aqui voc\u00ea encontra fun\u00e7\u00f5es mais avan\u00e7adas para<br\/> buscar o cliente como, cidade ou estado.",
    "intro_form_cliente_title": "Nome",
    "intro_form_cliente_text": "Agora por favor digite o <b>nome<\/b> do seu primeiro cliente",
    "intro_form_cliente_email_title": "Email",
    "intro_form_cliente_email_text": "Agora por favor digite o <b>Email<\/b> do seu primeiro cliente",
    "intro_form_cliente_tel_title": "Telefone",
    "intro_form_cliente_tel_text": "Agora por favor digite o <b>Telefone<\/b> do seu primeiro cliente",
    "intro_form_cliente_save_title": "Salvar",
    "intro_form_cliente_save_text": "Para <b>salvar<\/b> o cliente basta clicar em cima do bot\u00e3o e pronto. ",
    "intro_form_cliente_fim_title": "Fim do Cadastro",
    "intro_form_cliente_fim_text": "Parab\u00e9ns!<br\/> Voc\u00ea j\u00e1 aprendeu como cadastrar seu primeiro cliente com sucesso. Agora, vamos cadastrar um produto?",
    "intro_novo_item_title": "Novo",
    "intro_novo_item_text": "Neste bot\u00e3o poder\u00e1 cadastrar um novo Cliente "
});


/**
 * vendedores do cliente
 */
(function ($) {

    var autocompleteVendedor = function (table, container) {
        // Trata o comportamento do autosuggest de produtos
        $(container).find("[name*=cliente_vendedor__id_funcionario]").change(function (evt, el, json) {
            if (json.flag_exterior == 1) {
                $(container).find("[name*=cpf_cnpj_vendedor]").val("");
            } else {
                $(container).find("[name*=cpf_cnpj_vendedor]").val(json.cpfcnpj);
                var d = new Date();
                var n = d.toLocaleString();
                $(container).find("[name*=data_hora]").val(n);
            }
            $(container).find("[name*=cliente_vendedor__id_funcionario]").val(json.id);
        });

        $(container).find("[name*=cliente_vendedor__id_funcionario]").bind("clear", function (evt) {
            $(container).find("[name*=cliente_vendedor__id_funcionario]," +
                "[name*=cliente_vendedor__id_cliente]," +
                "[name*=cliente_vendedor__id_funcionario]," +
                "[name*=cpf_cnpj_vendedor],").val("");

            $(this).bestupper();
        });

        if ($(container).find("[name*=cliente_vendedor__id_funcionario]").val() != "" && "0" == '1') {
            $(container).find("[autosuggest*=cliente_vendedor__id_funcionario]").attr('disabled', 'disabled');
            $(container).find(".removeTableClone").hide();
        } else {
            $(container).find("[autosuggest*=cliente_vendedor__id_funcionario]").removeAttr('disabled');
            $(container).find(".removeTableClone").show();
        }

    };

    var validaLinhas = function () {
        if ($("#clientes_vendedores tbody tr:last").find("[name*=cliente_vendedor__id_funcionario]").val() == '') {
            return false;
        }
        return true;
    };


    $(document).ready(function () {
        //insere os eventos antes do focus ser dado na primeira linha no autocomplete.
        $("#clientes_vendedores").clonetable({
            addButtonLabel: 'Inserir',
            onCreateClone: autocompleteVendedor,
            onBeforeCreateClone: validaLinhas
        });

        //Insere autocomplete e efetua tratamentos para lançamentos
        $("#clientes_vendedores tbody tr").each(function () {
            autocompleteVendedor("#clientes_vendedores", $(this), true);
        });

        if ("0" == '1') {
            $("#clientes_vendedores").find(".removeTableClone").hide();
        }
    });
})(jQuery);

/**
 * Endereços
 */
(function ($) {

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

/**
 * Contatos
 */
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

/**
 * Oculda abas que nao estao sendo usadas atualmente
 */
(function ($) {
    $(document).ready(function () {
        $('#label_saldos_tab').hide();
        $('#label_notas_vinculadas_tab').hide();
    });
})(jQuery);

/**
 * Inicialize
 */
(function ($) {

    var atualiza_saldo_compras = function () {
        var limiteCredito = $("#valor_limite_credito").numberValue();
        var compras = "0";
        $("#saldo_para_compras").val(limiteCredito - compras).numberFormat();
    }

    /* DECLARAÇÃO DE VARIAVEIS */
    var tipo = $("#field_tipo");
    var legend = $("#field_tipo").children("legend").children(".legend");
    var pf = $("#fisica");
    var pj = $("#juridica");
    var cpf = $('#cpf');
    var cnpj = $('#cnpj');
    var conjuge = $('#op_conjuge');
    var label_razao_social = $("label[for=razaoSocial]");
    var valor = $("[name=tipo]:checked").val();
    var radioTipoPessoaSelecionada = $("[name=tipo][value=" + valor + "]")


    function exibirDadosPessoaFisica(){
        pf.show();
        pj.hide();
        $('#fisica_dados').show();
        $('#juridica_dados').hide();
        legend.html("Dados de Pessoa F&iacute;sica");
        legend.attr('class', 'legend_label');
        label_razao_social.text("Nome");
        $("#suframa").parents('p').hide();
        $("#tab_dados_gerais").css('width', '240px');
        $('#responsavel').val('');
    }
    function exibirDadosPessoaJurica(){
        $('#fisica_dados').hide();
        $('#juridica_dados').show();
        pf.hide();
        pj.show();
        $("#suframa").parents('p').show();
        legend.html("Dados de Pessoa Jur&iacute;dica");
        legend.attr('class', 'legend_label');
        label_razao_social.text("Razão Social");
        $("#tab_dados_gerais").css('width', '');
        // campo_razao_social.parents('p').css('width', '685px');
        if ($('#razaoSocial').val() == '' && $('#id').val() == '') {
            $('[name="button_consulta_cnpj"].document_properties').click();
        }
    }
    function ocultaExibiConjuge(){
        if ($("#estadoCivil").val() == '1') {
            $('#op_conjuge').show();
        } else {
            $("#conjugeDataNascimento").val('');
            $('#op_conjuge').hide();
            $("#conjuge").removeClass('required');
            $("#conjugeDataNascimento").removeClass('validate');
        }
    }

    $(document).ready(function () {

        //activate_contatos_aux();

        //calculando saldo para compras
        //atualiza_saldo_compras();
        //$("#valor_limite_credito").blur(function () {
        //    atualiza_saldo_compras();
        //});



        // esconde box de cadastro do tipo de pessoa
        tipo.hide();
        // escode box dados do
        conjuge.hide();

        // se for um cadastro esconde botao de enviar gmail
        if ($('#id').val() == ''){$("#enviar_gmail").hide();}

        // esconde aba de tributação
        $('#tab_tributacao_tab').hide();

        //adiciona confirm message se estiver finalizando
        $('input[type=submit]').bind('beforeSubmit.cliente', function (evt, ret) {ret.val = beforeSubmit();});

        // Ao selecionar pessoa fisica ou juridica
        $("[name=tipo]").click(function () {
            var tipoPessoa = $(this).val();
            tipo.show();
            if (tipoPessoa == "0")
                exibirDadosPessoaFisica();
            else if (tipoPessoa == "1")
                exibirDadosPessoaJurica();
            else
                tipo.hide();
        });

        // Ao clicar no checkbox de isento de ie e im
        $('#ieIsento, #imIsento').change( function () {
            if ($(this).is(":checked")) {
                $('#' + $(this).attr('campo')).attr('disabled', 'disabled').val('ISENTO').addClass('disabled');
            } else {
                if ($('#' + $(this).attr('campo')).val().length == 0 || $('#' + $(this).attr('campo')).attr('disabled') == true) {
                    $('#' + $(this).attr('campo')).removeAttr('disabled').val('').removeClass('disabled');
                }
            }
        });
        $('#ieIsento, #imIsento').change();

        radioTipoPessoaSelecionada.click();
        ocultaExibiConjuge();
        $("#estadoCivil").change(function () {ocultaExibiConjuge();});

        // Instala gerador de Ean
        $("#ean").click(function () {$('#codigoCliente').val(gera_ean());});

        // Antes de excluir
        $(".delete").bind("beforeDelete", function () {
            $this = $(this);
            $.ajax({
                url: '/senna/clientes/clientes/antes_remover/' + $("#id").val(),
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data == 1) {
                        $this.unsetConfirmMessage("Tem certeza que deseja apagar este registro?");
                        $this.addConfirmMessage("Este cliente não pode ser removido pois possui vínculos no sistema. Deseja desativar este cliente?");
                    }
                }
            });
        });


        /* CONTATOS  E ENDEREÇOS */
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
        /* FIM CONTATOS  E ENDEREÇOS */

        // CLASSIFICAÇÃO DE CLIENTES
        MooStarRatingImages.defaultImageFolder ='/images/ratting/';
        var simpleRating = new MooStarRating({ div: 'simple', width: 20 });
        simpleRating.setValue('1');
        //alert(simpleRating.getValue())
        function myCallback(value) {$('#simpleTip').html("Cliente "+value+" Estrelas.");}
        simpleRating.addEvent('click', myCallback);

        parent.Sexy.info("Voce esta alterando a classificação do clientes");

    });

})(jQuery);

/*************************************
 DatePicker e validações
 *************************************/
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
