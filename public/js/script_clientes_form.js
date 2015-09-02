
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


/************************************
 cadastro/clientes/form_vendedores.js
 ************************************/

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

/*************************************************
 cadastro/complementos_cadastros/form_enderecos.js
 *************************************************/

/**
 * @author Bruno
 */
    //montando autocomplete para seleção de fornecedores
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

    /**
     * Mostra Mapa do endereço informado
     */
    var map;
    var showMap = function (container) {
        // Armazena dados
        var rua = container.find("[name*=endereco__logradouro]").val();
        var bairro = container.find("[id*=endereco__bairro]").val();
        var cidade = container.find("[id*=cidade_nome]").val();
        var estado = container.find("[id*=estado_nome]").val();
        var pais = container.find("[id*=pais_nome]").val();
        // Trata exterior
        if (!pais)
            pais = container.find("[id*=ext_endereco__id_pais]").val();
        var cep = container.find("[name*=endereco__cep]").val();
        var num = container.find("[name*=endereco_entidade__numero]").val();
        var address = rua + ',' + num + '-' + bairro + ',' + cidade + '-' + estado + ',' + cep + ',' + pais;

        // Valida dados necessários para exibição do mapa
        var ret = false;
        var vars = ['rua', 'cidade', 'estado', 'pais'];
        $.each(vars, function (i, val) {
            if (!eval(val)) {
                ret = true;
                return false;
            }
        });
        if (ret) {
            parent.Sexy.alert('Favor informar os dados do endereço a ser exibido.');
            return false;
        }
        // Instancia geocoder da API
        var geocoder = new google.maps.Geocoder();

        // Recupera longitude e latitude, recebendo o endereço como paramentro
        geocoder.geocode({
                'address': address
            },
            // Callback do pedido de latitude e longitude
            function (results, status) {
                // Se resultado é válido
                if (status == google.maps.GeocoderStatus.OK) {
                    alert('http://app.tagplus.com.br/capitalponto/cadastro/clientes/mapa');
                    // Abre modal com o mapa
                    parent.MochaUI.openWindow({
                        id: 'http://app.tagplus.com.br/capitalponto/cadastro/clientes/mapa',
                        title: 'Mapa',
                        onContentLoaded: function () {
                            // Armazena objeto para latitude e longitude
                            var myLatlng = results[0].geometry.location;

                            // Armazena elemento da janela (modal)
                            var janela = this.iframeEl;
                            janela = $(janela).contents();

                            // Opções do mapa
                            var myOptions = {
                                zoom: 15,
                                center: myLatlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };

                            // Criar o mapa na div "content" da janela
                            map = new google.maps.Map(janela.find('#content').css({
                                'width': '100%',
                                'height': '100%',
                                'padding': '0',
                                'margin': '0'
                            }).get(0), myOptions);
                            // Cria marcador
                            var marker = new google.maps.Marker({
                                map: map,
                                position: myLatlng
                            });
                            // Adiciona evento "Click" para o marcador
                            google.maps.event.addListener(marker, 'click', function () {
                                map.setZoom(17);
                            });
                        }
                    });
                } else {
                    Sexy.alert("Não foi possível encontrar o endereço informado");
                }
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

        // Habilita botoes de mapa
        $('[name=btn_mapa]').each(
            function () {
                if ($(this).parents('.clonedField').find('[name*=endereco_entidade__id]').val() != '') {
                    $(this).removeAttr('disabled');
                }
            }
        ).click(
            function () {
                showMap($(this).parents('.clonedField'));
            }
        );


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

        /*
         //Tratando cadastro de novos enderecos
         $("[id*=endereco__id]").bind('onWindowLoad', function(evt, newDocument, val){
         //OBtendo os dados da tela que abriu.
         var logradouro	= $(newDocument).find("#endereco__logradouro").val();
         var bairro		= $(newDocument).find("#endereco__bairro").val();
         var cidade		= $(newDocument).find("#endereco__id_cidade").val();

         if(logradouro == '' || bairro == '' || cidade == ''){
         //Retirando os espaços
         val = val.replace(/^s+|s+$/g, '').replace('.', '');
         // Caso o CEP não esteja nesse formato ele vai ser inserido no campo de logradouro
         var objER = /^[0-9]{5}[-]?[0-9]{3}$/;
         //Verficando se foi inserido um conteúdo
         if(val.length > 0){
         if(objER.test(val)){
         $(newDocument).find("#endereco__cep").val(val);
         $(newDocument).find("#btn_cep").click();
         }
         else
         $(newDocument).find("#endereco__logradouro").val(val);
         }
         }

         });
         */
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


    var get_cep_ws = function (container) {
        //Carregando
        $("#loader").show().find(".carregando").hide();
        $("#loader").find(".enviando").show();

        var cep = $(container).find("[name*=endereco__cep]").val();
        var url = '{url_ws_cep}';

        if (!cep) {
            Sexy.alert('Por favor, informe o CEP.');
            $("#loader").hide();
        } else {
            //Faz uma requisição pra verificar se o cep ja foi cadastrado
            $.ajax({
                type: "POST",
                url: 'http://app.tagplus.com.br/capitalponto/cadastro/enderecos/get_endereco_by_cep/' + cep,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.length != 0) {
                        //Se tem só 1 endereço
                        if (data.length == 1) {
                            var json = data[0];
                            $(container).find('[name*=endereco__cep]').val(json.cep);
                            $(container).find('[name*=endereco__logradouro]').val(json.logradouro);
                            $(container).find('[name*=endereco__bairro]').val(json.bairro);
                            $(container).find('[name*=endereco__id_cidade]').val(json.id_cidade);
                            $(container).find('[autosuggest*=endereco__id_cidade]').val(json.cidade);
                            $(container).find('[name*=estado]').val(json.sigla_estado);
                            $(container).find('[name*=pais]').val(json.pais);
                            $(container).find('[name*=endereco__id_pais]').val(json.id_pais);
                            $(container).find('[name*=cidade_cod]').val(json.cidade_cod);
                            $(container).find('[name*=estado_cod]').val(json.estado_cod);
                            $(container).find('[name*=pais_cod]').val(json.pais_cod);
                            //Se tem mas de 1 pergunto
                        } else {
                            Sexy.confirm('Foi encontrado mais de um endereço para o mesmo CEP. Deseja selecionar estes endereços?', {
                                textBoxBtnOk: "Sim",
                                textBoxBtnCancel: "Não",
                                onComplete: function (ret) {
                                    if (ret) {
                                        // Abre modal com o mapa
                                        var data_end = false;
                                        var url = 'http://app.tagplus.com.br/capitalponto/cadastro/enderecos/form_enderecos_mult';
                                        parent.MochaUI.openWindow({
                                            id: url,
                                            title: 'Endereço',
                                            type: 'modal',
                                            //Id de onde foi clicado enviado como parametro.
                                            contentURL: url,
                                            width: 700,
                                            height: 486,
                                            onContentLoaded: function () {

                                                var janela = this.iframeEl;
                                                janela = $(janela).contents();

                                                janela.find("[id*=_endereco__id]").attr('source', 'http://app.tagplus.com.br/capitalponto/autocomplete/enderecos/index/' + cep);
                                            },
                                            onClose: function () {
                                                var janela = this.iframeEl;
                                                janela = $(janela).contents();
                                                var id_endereco = janela.find('[id*=_endereco__id]').val();

                                                if ((id_endereco) && (id_endereco != undefined)) {
                                                    $.getJSON("http://app.tagplus.com.br/capitalponto/cadastro/enderecos/get_endereco_by_id/" + id_endereco, {}, function (json) {
                                                        $(container).find('[name*=endereco__id]').val(id_endereco);
                                                        $(container).find('[name*=endereco__cep]').val(json.cep);
                                                        $(container).find('[name*=endereco__logradouro]').val(json.logradouro);
                                                        $(container).find('[name*=endereco__bairro]').val(json.bairro);
                                                        $(container).find('[name*=endereco__id_cidade]').val(json.id_cidade);
                                                        $(container).find('[autosuggest*=endereco__id_cidade]').val(json.nome_cidade);
                                                        $(container).find('[name*=estado]').val(json.sigla_estado);
                                                        $(container).find('[name*=pais]').val(json.pais);
                                                        $(container).find('[name*=endereco__id_pais]').val(json.id_pais);
                                                        $(container).find('[name*=cidade_cod]').val(json.cod_cidade);
                                                        $(container).find('[name*=estado_cod]').val(json.cod_estado);
                                                        $(container).find('[name*=pais_cod]').val(json.cod_pais);
                                                    });
                                                }
                                            }
                                        }); //Modal
                                    }
                                }
                            }); //SexyConfirm
                        }

                        $("#loader").hide();
                    } else {
                        //Procura no WS
                        $.getJSON("http://app.tagplus.com.br/capitalponto/cadastro/enderecos/get_cep_ws/" + cep, {}, function (json) {
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
                                // Criando string contendo o endereço completo e adicionando conteúdo ao campo próprio
                                var endereco_completo = '[' + json.cep + '] ' + json.logradouro + ', ' + json.bairro + ' - ' + json.cidade + '/' + json.uf_nome;
                                var msg = ('O Endereço: \$s%1, foi encontrado.<br /><br /> O que você deseja fazer?').replace('$s%1', endereco_completo);

                                json.uf_nome = json.uf;
                                $(container).find('[name*=endereco__cep]').val(json.cep);
                                $(container).find('[name*=endereco__logradouro]').val(json.logradouro);
                                $(container).find('[name*=endereco__bairro]').val(json.bairro);
                                $(container).find('[name*=endereco__id_cidade]').val(json.id_cidade);
                                $(container).find('[autosuggest*=endereco__id_cidade]').val(json.cidade);
                                $(container).find('[name*=estado]').val(json.uf_nome);
                                $(container).find('[name*=pais]').val(json.pais);
                                $(container).find('[name*=endereco__id_pais]').val(json.id_pais);
                                $(container).find('[name*=cidade_cod]').val(json.cod_ibge_municipio);
                                $(container).find('[name*=estado_cod]').val(json.cod_ibge_estado);
                                $(container).find('[name*=pais_cod]').val(json.pais_cod);
                            } else {
                                $(container).find('[name*=endereco__cep]').val(json.cep);
                                $(container).find('[name*=endereco__id_cidade]').val(json.id_cidade);
                                $(container).find('[autosuggest*=endereco__id_cidade]').val(json.cidade);
                                $(container).find('[name*=estado]').val(json.uf);
                                $(container).find('[name*=pais]').val(json.pais);
                                $(container).find('[name*=cidade_cod]').val(json.cod_ibge_municipio);
                                $(container).find('[name*=estado_cod]').val(json.cod_ibge_estado);

                            }
                            $("#loader").hide();
                        });
                    } //Else
                } //Success
            }); //Ajax
        }
    }
})(jQuery);


/**********************************************************
 cadastro/complementos_cadastros/form_enderecos_exterior.js
 **********************************************************/

/**
 * @author Glucas
 */
    //montando autocomplete para seleção de fornecedores
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

    var trataOrigem = function () {
        //trata origem quando estiver editando.
        if ($("#id").val() != "") {
            $("[name=exterior]").attr('disabled', true);
        }
        //esconde clones referentes a endereço nacional
        if ($("[name=exterior]:checked").val() == 1) {
            $('#endereco .clonedField:not(.hiddenClone)').each(function () {
                $(this).find(".removeClone").click();
            });
            $("#endereco").hide();
            $("#endereco_exterior").show();
            $('[name=btn_mapa]').hide();
        }
        //esconde clones referentes a endereço exterior
        else {
            $('#endereco_exterior .clonedField:not(.hiddenClone)').each(function () {
                $(this).find(".removeClone").click();
            });
            $("#endereco_exterior").hide();
            $("#endereco").show();
            $('[name=btn_mapa]').show();
        }
    };

    var exist_principal = function () {
        var retorno = false;
        var fields = $('#endereco_exterior .clonedField:not(.hiddenClone)').find('[name*=ext_principal_radio]');
        fields.each(function () {
            if ($(this).is(':checked'))
                retorno = true;
        });
        return retorno;
    };

    var set_principal_padrao = function () {
        var visibles = $('#endereco_exterior .clonedField:not(.hiddenClone):first');
        if (!exist_principal()) {
            visibles.find('[name*=ext_principal_radio]').attr('checked', 'checked');
            visibles.find('[name*=__principal]').val(1);
        }
    };

    jQuery(document).ready(function () {

        $('[name*=endereco__id_pais]').change(function (evt, el, obj) {
            jQuery.getJSON("http://app.tagplus.com.br/capitalponto/autocomplete/enderecos/get_pais_vinculos/" + obj.id, function (json) {
                $(el).parents('.clonedField').find('[name*=cidade_nome]').val(json.cidade_nome);
                $(el).parents('.clonedField').find('[name*=estado_nome]').val(json.estado_nome);
                $(el).parents('.clonedField').find('[name*=cidade_cod]').val(json.cod_cidade);
                $(el).parents('.clonedField').find('[name*=estado_cod]').val(json.cod_estado);
                $(el).parents('.clonedField').find('[name*=pais_cod]').val(json.cod_pais);
                $(el).parents('.clonedField').find("[name*=endereco__id_cidade]").val(json.id_cidade);
            });
        });
        // Trata cadastro de endereço principal
        $('#endereco_exterior .clonedField').each(
            function () {
                if ($(this).find('[name*=__principal]').val() == 1) {
                    $(this).find('[name*=ext_principal_radio]').attr('checked', 'checked');
                }
                $(this).find('[name*=ext_principal_radio]').click(
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

        //mostra ou oculta os clones de endereço ou endereco exterior e mostra mensagem caso já existam endereços cadastrados caso haja mudança de origem.
        $("[name=exterior]").change(function () {
            var cpf = $("#cpf").val();
            var cnpj = $("#cnpj").val();
            //if para selecionar cada clonefield correto para tratar na hora de procurar se existem clones visiveis
            if ($(this).val() == 0) {
                var qtd_clone_visible = $("[id=endereco_exterior] .clonedField").length;
                var qtd_clone_hidden = $("[id=endereco_exterior] .hiddenClone").length;
            } else {
                var qtd_clone_visible = $("[id=endereco] .clonedField").length;
                var qtd_clone_hidden = $("[id=endereco] .hiddenClone").length;
            }
            //so mostra mensagem que os endereços foram apagados se existirem endereços para serem apagados.
            if (qtd_clone_visible != qtd_clone_hidden) {
                Sexy.confirm("Ao mudar a Origem, todos os endereço vinculados serão apagados. Deseja realmente alterar a Origem?", {
                    textBoxBtnOk: 'Sim',
                    textBoxBtnCancel: 'Não',
                    onComplete: function (res) {
                        //se confirmado
                        if (res) {

                            if ($("[name=exterior]:checked").val() == 1) {
                                $("#cpf").val("").attr("disabled", true);
                                $("#cnpj").val("").attr("disabled", true);
                            } else {
                                if ($("[name=tipo]:checked").val() == 'F') {
                                    $("#cpf").val(cpf).removeAttr("disabled");
                                } else {
                                    $("#cnpj").val(cnpj).removeAttr("disabled");
                                }
                            }
                            trataOrigem();
                        } else {

                            $("[name=exterior]:not(:checked)").attr('checked', 'checked');


                            if ($("[name=exterior]:checked").val() == 1) {
                                $("#cpf").val("").attr("disabled", true);
                                $("#cnpj").val("").attr("disabled", true);
                            } else {

                                if ($("[name=tipo]:checked").val() == 'F') {
                                    $("#cpf").val(cpf).removeAttr("disabled");
                                } else {
                                    $("#cnpj").val(cnpj).removeAttr("disabled");
                                }
                            }
                        }
                    }
                });
            } else {
                trataOrigem();
            }
        });

        trataOrigem();

    });
})(jQuery);


/************************************************
 cadastro/complementos_cadastros/form_contatos.js
 ************************************************/

/**
 * @author Eduardo
 */
    //montando autocomplete para seleção de fornecedores
(function ($) {

    /**
     * Retorna os elementos id_tipo_contato com contato igual ao informado
     * @author jdrummond
     * @since  22/11/12
     * @param  {string}  id_contato
     * @return {obj}
     */
    var get_contatos_iguais = function (id_contato) {
        var retorno = [];

        $('#contato .clonedField:not(.hiddenClone) input[name*=contato__id_tipo_contato]').each(function () {
            if ($(this).val() == id_contato || (id_contato == 0 && $(this).val() == '') || (id_contato == '' && $(this).val() == 0)) {
                retorno.push($(this));
            }
        });

        return retorno;
    };

    /**
     * Trata marcação de principal
     * @author jdrummond
     * @since  22/11/12
     * @return void
     */
    var verifica_marca_contatos_principais = function () {
        // Aponta quais IDs de tipo de contato já possuem principal marcado
        var contatos_com_principal = [];
        $('#contato .clonedField:not(.hiddenClone) [name*=contato__principal]:checked').each(function () {
            var id_tipo_contato = $(this).parents('.clonedField').find('input[name*=contato__id_tipo_contato]').val();
            if (id_tipo_contato == 0)
                id_tipo_contato = "";
            contatos_com_principal.push(id_tipo_contato);
        });

        // Percorre todos os tipos de contato verificando se já possuem principal marcado, e, caso negativo, marca
        $('#contato .clonedField:not(.hiddenClone) input[name*=contato__id_tipo_contato]').each(function () {
            var id_tipo_contato = $(this).val();
            if (id_tipo_contato == 0)
                id_tipo_contato = "";
            var contatos_iguais = get_contatos_iguais(id_tipo_contato);
            // Se possui apenas um com esse ID, marca checked
            if (contatos_iguais.length == 1) {
                $(this).parents('.clonedField').find('[name*=contato__principal]').attr('checked', 'checked');
            } else {
                // Se não possui nenhum marcado, marca o primeiro
                var ja_possui_principal = false;
                $.each(contatos_com_principal, function (i, v) {
                    if (v == id_tipo_contato) {
                        ja_possui_principal = true;
                        return false;
                    }
                });
                // Marca principal em quem não tiver
                if (!ja_possui_principal) {
                    $(this).parents('.clonedField').find('[name*=contato__principal]').removeAttr('checked');
                    contatos_iguais[0].parents('.clonedField').find('[name*=contato__principal]').attr('checked', 'checked');
                }
            }
        });
    }

    var tratamento_change_tipo_contato = function (el) {
        if (tipo_contato[$(el).val()] == "T") {
            $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('email', 'true');
            $(el).parents('div:first').find('[name*=contato__descricao]').attr('maxlength', '20').attr('minlength', '4');
        } else {
            if (tipo_contato[$(el).val()] == "E") {
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('maxlength', '20').removeAttr('minlength', '4');
                $(el).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
            } else {
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('email', 'true');
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('maxlength', '20').removeAttr('minlength', '4');
                $(el).parents('div:first').find('[name*=contato__descricao]').attr('maxlength', '50');
            }
        }
        verifica_marca_contatos_principais();
    };

    var tipo_contato = new Array();

    tipo_contato["1"] = "T";

    tipo_contato["2"] = "E";

    tipo_contato["3"] = "O";

    tipo_contato["4"] = "O";

    tipo_contato["5"] = "O";

    //Principal
    $(document).ready(function () {

        $('[id*=contato].clonedField').each(function () {
            if ($(this).find('[name*=contato__editavel]').val() == '0') {
                $(this).find('input').attr('disabled', true);
                $(this).find('select').attr('disabled', 'disabled');
                $(this).find('.removeClone').remove();
            }

            $('[id*=contato].clonedField').find('[name*=contato__id_tipo_contato]').each(function () {
                if (tipo_contato[$(this).val()] == "T") {
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('maxlength', '20').attr('minlength', '4');
                } else {
                    if (tipo_contato[$(this).val()] == "E") {
                        $(this).parents('div:first').find('[name*=contato__descricao]').attr('email', 'true');
                    } else {
                        $(this).parents('div:first').find('[name*=contato__descricao]').attr('maxlength', '50');
                    }
                }

            }); //end each();

            //adicinando comportamento no checkbox principal
            $(this).find('[name*=contato__principal]').click(function () {
                // Não permite desmarcar
                if (!$(this).is(':checked')) {
                    $(this).attr('checked', 'checked');
                    return;
                }
                var $tipo = $(this).parents("div:eq(1)").find('[name*=contato__id_tipo_contato]');

                $('[id*=contato].clonedField').each(function () {
                    $tipo_atual = $(this).find('[name*=contato__id_tipo_contato]');
                    //verifica se  a div que esta sendo verificada nao e a propria div do click
                    if ($tipo_atual.parents('div').attr('id') != $tipo.parents('div').attr('id')) {
                        //verifica se o tipo de contato procurado e igual o tipo de contato do principal marcado.
                        if (($tipo.val() == $tipo_atual.val()) || ($tipo.val() == 0 && $tipo_atual.val() == '') || ($tipo.val() == '' && $tipo_atual.val() == 0)) {
                            $tipo_atual.parents('div:first').find('[name*=contato__principal]').removeAttr('checked');
                        }
                    }
                }); //end each();
            }); //end click();

            // Ao remover um contato
            $('#contato').bind('onHideClone.trataprincipal', verifica_marca_contatos_principais)
                .bind('onShowClone.trataprincipal', verifica_marca_contatos_principais);

            //adicionando comportamento ao evento click no tipo de contato.
            $(this).find('[name*=contato__id_tipo_contato]').change(function () {
                $(this).parents('.clonedField').find('[name*=contato__principal]').removeAttr('checked');
                tratamento_change_tipo_contato($(this));
            }).bind('clear', function () {
                $(this).parents('.clonedField').find('[name*=contato__principal]').removeAttr('checked');
                tratamento_change_tipo_contato($(this));
            });
        });

        //insere autocomplete
        //        autocompleteProduto("#lancamentos", "#lancamentos tbody tr:first");

        //coloca o foco sempre no botao de add um novo contato.
        $('[rel=contato]').focus();
    });

})(jQuery);


/**********************************
 cadastro/clientes/form_tributos.js
 **********************************/

(function ($) {

    /**
     * Metodo para inserir autocomplete de seleção de produtos
     * Executado logo apos o carregamento da página e sempre que uma linha é adicionada na tabela de lancamentos
     */
    var autocompleteTrib = function (table, container) {
        //seleciona o segundo elemento da linha
        //$(container).find("input:visible").eq(1).focus();

        // Trata o comportamento do autosuggest de produtos
        $(container).find("[name*=tributo_ncm__cod_ncm]").change(function (evt, el, json) {
            $(container).find('[name*=tributo_ncm__id]').val(json.id);
            $(container).find('[name*=tributo_ncm__descricao]').val(json.info);
            // Uppercases
            $el.bestupper();

            verifica_required_ncm_cfop();
        }).bind('clear', verifica_required_ncm_cfop).blur(verifica_required_ncm_cfop);

        $(container).find('[name*=tributo_detalhe__cod_cfop],[autosuggest*=tributo_ncm__cod_ncm]').blur(verifica_required_ncm_cfop);

        // Numera coluna
        numeraLinhas();

        verifica_required_ncm_cfop();

        //abre janela ao clicar no botao tributacao
        $(container).find('[id*=btn_tributacao]').click(function (evt) {
            if ($("#flag_exterior").val() == 1) {
                var cod_localidade = $("#endereco_exterior").find("[name*=principal_radio]:checked").parents('div:eq(1)').find('div [name*=ext_endereco__id_pais]').val();
            } else {
                var cod_localidade = $("#endereco").find("[name*=principal_radio]:checked").parents('div:eq(1)').find('[name*=estado_cod]').val();
            }
            var idLancamento = $(evt.target).parents("tr").find("[name*='tributo_ncm__id[' ]").val();
            var idField = $(evt.target).parents("tr").find("[name*='json_tributos[' ]").attr('id');
            var cfop = $(evt.target).parents("tr").find("[name*='cod_cfop[' ]").val();
            var cstA = $(evt.target).parents("tr").find("[name*='cst_a[' ]").val();
            if (idLancamento == '') {
                //significa que nao esta editando
                idLancamento = 0;
                Sexy.alert('É necessário indicar o NCM');
                return false;
            }

            if (cod_localidade === undefined || cod_localidade === '') {
                Sexy.alert('Por favor,indique um Endereço');
                return false;
            }
            if (cfop == '') {
                Sexy.alert('Por favor,indique um CFOP');
                return false;
            }

            parent.MochaUI.openModal({
                id: "Tributacao",
                //Nome do produto como titulo
                title: 'Detalhamento de Tributos',
                //Id de onde foi clicado enviado como parametro.
                contentURL: "http://app.tagplus.com.br/capitalponto/cadastro/clientes/vincular_tributo/" + idField + "/" + cfop + "/" + cstA + "/" + idLancamento + "/" + cod_localidade
            });
        });

        //completa o cod_cfop e a natureza da operacao  e trata os campos quando se insere os dados do cfop.
        $(container).find('[name*=cod_cfop]').blur(function (e) {
            var $this = $(this);

            var natureza = $(this).parents('tr').find('[name*=natureza_operacao]');
            var cod_cfop = $(this).parents('tr').find('[name*=cod_cfop]');
            var cod_ncm = $(this).parents('tr').find('[name*=cod_ncm]');
            var cod_ncm_autocomplete = $(this).parents('tr').find('[autosuggest*=cod_ncm]');
            var descricao_ncm = $(this).parents('tr').find('[name*=descricao]');
            var idTributo = $(this).parents('tr').find('[name*=id_tributo_cfop]');

            if (this.value.replace(new RegExp('[._]', "g"), '') == "") {
                $(cod_cfop).val('');
                $(natureza).val('');
                return;
            }

            var jsonTributos = $(this).parents('tr').find("[name*='json_tributos[' ]");
            $('input[type="submit"]').attr('disabled', 'disabled');
            jQuery.getJSON(
                "http://app.tagplus.com.br/capitalponto/autocomplete/tributos/get_cfop/" + this.value,
                function (json) {
                    jsonTributos.val('');
                    if (json.length == 0) {
                        Sexy.alert('CFOP Inválido', {
                            onComplete: function () {
                                $(cod_cfop).val('');
                                $(natureza).val('');
                                $('input[type="submit"]').removeAttr('disabled');
                                if ($this.is(':visible'))
                                    $this.focus();
                            }
                        });
                        return;
                    }
                    $(natureza).val(json.nome);
                    $(idTributo).val(json.id);
                    $('input[type="submit"]').removeAttr('disabled');
                }
            );
        });
    };

    // Numera linhas
    var numeraLinhas = function () {

        if ($('#tributos tbody tr:first [name*=item]').length == 1 && $('#tributos tbody tr:first [name*=item]').val() == '') {
            $('#tributos tbody tr:first [name*=tributo_detalhe__cst_a]').val(0);
        }
        $('#tributos').find('tbody tr [name^=item]').each(function (i) {
            $(this).val(i + 1);
        });
        verifica_required_ncm_cfop();
    };

    /**
     * Tratamentos antes de confirmar tributação
     * @author jdrummond
     * @since  27/11/12
     * @return {void}
     */
    var before_submit_trata_tributacao = function (ev, ret) {
        var erros = [];
        var possui_erro = false;
        // Verifica as tributações que estão vazias
        $('[name^="json_tributos["]').each(function () {
            var cfop_correspondente = $(this).parents('tr').find('[name*=tributo_detalhe__cod_cfop]').val();
            var ncm_correspondente = $(this).parents('tr').find('[name*=tributo_ncm__cod_ncm]').val();
            if ((cfop_correspondente || ncm_correspondente != '') && $(this).val() == '') {
                erros.push($(this).parents('tr').find('[name^=item]').val());
                ret.val = false;
                possui_erro = true;
            }
        });
        // Se ocorreram erros, monta mensagem
        if (possui_erro) {
            var msg = '<br />';
            var label_item = erros.length > 1 ? 'Itens' : 'Item';
            msg = msg + label_item + ' <b>' + erros.join(', ') + '</b><br />';
            Sexy.alert(('Não é possível salvar os dados de Tributação pois alguns itens não possuem tributação definida. Estes itens são:<br />$s%1<br />Localize os itens, clique no botão <b>Tributação</b> respectivo, indique os dados e clique em <b>Salvar e Fechar</b>.').replace('$s%1', msg), {
                onComplete: function () {
                    // Selecionando aba e primeira linha com erro
                    $('#tab_tributacao_tab a').click();
                }
            });
        }
    };

    var verifica_required_ncm_cfop = function () {
        $('#tributos [name^=tributo_detalhe__cod_cfop]').each(function () {
            var $parent_tr_el = $(this).parents('tr');
            var $ncm_el = $parent_tr_el.find('[autosuggest^=tributo_ncm__cod_ncm]');
            $ncm_el.removeClass('required');
            $(this).removeClass('required');
            var cfop_val = $(this).val().replace(new RegExp('[._]', "g"), '');
            var ncm_val = $ncm_el.val().replace(new RegExp('[._]', "g"), '');
            if (cfop_val && !ncm_val) {
                $ncm_el.addClass('required');
            } else if (ncm_val && !cfop_val) {
                $(this).addClass('required');
            }
        });
    };

    var carregar_tributacao = function () {
        //Ação do botão ao clicar em carregar
        $('#carregar_tributacao').click(function () {
            parent.MochaUI.openModal({
                id: "Carregar",
                //Nome do produto como titulo
                title: 'Carregar Tributação de Cliente',
                //Id de onde foi clicado enviado como parametro.
                contentURL: "http://app.tagplus.com.br/capitalponto/cadastro/clientes/carregar_tributacao/",
                width: 480,
                height: 350
            });
        });
    };

    jQuery(document).ready(function () {

        carregar_tributacao();

        $('[type=submit]').bind('beforeSubmit.trataTributacao', before_submit_trata_tributacao);

        jQuery("#tributos").clonetable({
            addButtonLabel: 'Inserir',
            onCreateClone: autocompleteTrib,
            onRemoveClone: numeraLinhas,
            enterLikeTab: true
        });
        //Insere autocomplete
        $("#tributos tbody tr").each(function () {
            autocompleteTrib("#tributos", $(this));
        });

        $('[name*=tributo_ncm__cod_ncm]').unbind('clear').bind('clear', function (evt, el, data) {
            $(el).parents('tr').find("[name*='tributo_ncm__id[']").val('');
            $(el).parents('tr').find("[name*='tributo_ncm__descricao[']").val('');
        });

        verifica_required_ncm_cfop();

    });

})(jQuery);
jQuery(document).ready(function () {
    jQuery.extend(jQuery.validator.messages, {
        accept: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.'/> ",
        cnpj: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Informe um CNPJ válido.'/> ",
        cpf: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Informe um CPF válido.'/> ",
        creditcard: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.'/> ",
        date: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma data v&aacute;lida.'/> ",
        digits: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a somente d&iacute;gitos.'/> ",
        email: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.'/> ",
        equalTo: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a o mesmo valor novamente.'/> ",
        max: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor menor ou igual a {0}.'/> "),
        maxlength: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a n&atilde;o mais que {0} caracteres.'/> "),
        min: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior ou igual a {0}.'/> "),
        minlength: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a ao menos {0} caracteres.'/> "),
        number: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um n&uacute;mero v&aacute;lido.'/> ",
        range: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor entre {0} e {1}.'/> "),
        rangelength: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor contendo de {0} a {1} caracteres.'/> "),
        required: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo é obrigatório.'/> ",
        requiredIf: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo deve ser preenchido.'/> ",
        remote: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Por favor, corrija este campo.'/> ",
        url: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma URL v&aacute;lida.'/> ",
        time: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma hora válida'/> ",
        code: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um código válido'/> ",
        price: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior que 0'/> ",
        cidade: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Cidade não cadastrada no sistema.'/> ",
        pais: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='País não 'cadastrado no sistema.'/> ",
        requiredCep: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CEP e ou Logradouro não cadastrados no sistema.'/> ",
        transporte: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='O valor deste campo deve ser definido.'/> ",
        positive: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forneça um valor maior que 0,00.'/> ",
        cfop: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ",
        cfop_transp: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ",
        code_ean: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido, este campo deve ser um EAN válido e possuir 8, 12,13 ou 14 caracteres.'/> ",
        number_letter: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Por favor insirá apenas números ou letras, não será permitido caracteres especiais'/> ",
        cod_ncm: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido ,este campo deve possuir 2 ou 8 caracteres.'/> ",
        max_vr_cupom: jQuery.validator.format("<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='O valor neste campo deve ser inferior a {0}'/> "),
        autosuggest: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo não possui um valor válido selecionado'/> ",
        password: "<img src='http://app.tagplus.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Senha deve conter pelo menos 6 caracteres utilizando letras e números'/> "
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


/*************************
 cadastro/clientes/form.js
 *************************/

/**
 * @author Bruno
 */
(function ($) {

    var trataOrigem = function () {
        //trata origem quando estiver editando.
        if ($("#id").val() != "") {

            if ($("[name=exterior]:checked").val() == 1) {
                $("#cpf, #cnpj").attr('disabled', true);
                $("#grupo_ie").hide();
                $("#pesquisar_cnpj").hide();
                $('#ident_estrangeiro').parents('p').show();
            } else {
                $('#ident_estrangeiro').parents('p').hide();
                $('#ident_estrangeiro').removeClass("required").val('');
                $("#grupo_ie").show();
                if ($("[name=tipo]:checked").val() != 'F') {
                    $("#pesquisar_cnpj").show();
                }
            }
            if ($("[name=tipo]:checked").val() == 'F') {
                if ('' != "" || '' != "") {
                    $("#cnpj").removeClass('required');
                    $("#cpf").addClass("required");
                }
            } else {
                if ('' != "" || '' != "") {
                    $("#cpf").removeClass('required');
                    $("#cnpj").addClass("required");
                }
            }

        } else {
            $('input:radio[name=recebe_email][value=1]').click();
            if ($("[name=exterior]:checked").val() == 1) {
                $("#pesquisar_cnpj").hide();
                $('#ident_estrangeiro').parents('p').show();
                $("#grupo_ie").hide();
                $("#flag_exterior").val('1');
                if ($("[name=tipo]:checked").val() == 'F') {
                    $("#cpf").val("").attr("disabled", true);
                } else {
                    $("#cnpj").val("").attr("disabled", true);
                }
            } else {
                $('#ident_estrangeiro').removeClass("required").val('');
                $('#ident_estrangeiro').parents('p').hide();
                $("#grupo_ie").show();
                $("#flag_exterior").val('0');
                if ($("[name=tipo]:checked").val() == 'F') {
                    $("#cpf").val("").removeAttr("disabled");
                } else {
                    $("#cnpj").val("").removeAttr("disabled");
                    $("#pesquisar_cnpj").show();
                }
            }
        }
    };

    var atualiza_saldo_compras = function () {
        var limiteCredito = $("#valor_limite_credito").numberValue();
        var compras = "0";
        $("#saldo_para_compras").val(limiteCredito - compras).numberFormat();
    }

    var beforeSubmit = function () {
        if ($("#flag_exterior").val() == 1) {
            var cod_localidade = $("#endereco_exterior").find("[name*=principal_radio]:checked").parents('div:eq(1)').find('[name*=estado_cod]').val();
        } else {
            var cod_localidade = $("#endereco").find("[name*=principal_radio]:checked").parents('div:eq(1)').find('[name*=estado_cod]').val();
        }

        if (cod_localidade === undefined && $('#tributos tbody tr:first').find('[name*=cod_ncm]').val()) {
            Sexy.alert('Para salvar informações de tributação, é necessário indicar um Endereço');
            //			Sexy.alert('Por favor, indique um Endereço Principal');
            return false;
        } else
            return true;
    }

    /**
     * Retorna o campo do email principal
     */
    function get_telefone_principal() {

        //seleciona todos as divs que sao do tipo telefone
        var telefone_principal = "";
        var telefones = $("#contato").find("[name*=contato__id_tipo_contato][value=1]");

        $(telefones).each(function () {
            if ($(this).parents("div:first").find("[name*=contato__principal]:checked").val() == "1") {
                telefone_principal = $(this).parents("div:first").find("[name*=contato__descricao]");
                return false;
            }
        });

        return telefone_principal;
    }

    /**
     * Retorna o campo do email principal
     */
    function get_email_principal() {

        //seleciona todos as divs que sao do tipo email
        var email_principal = "";
        var emails = $("#contato").find("[name*=contato__id_tipo_contato][value=2]");
        $(emails).each(function () {
            if ($(this).parents("div:first").find("[name*=contato__principal]:checked").val() == "1") {
                email_principal = $(this).parents("div:first").find("[name*=contato__descricao]");
                return false;
            }
        });

        return email_principal;
    }

    function activate_contatos_aux() {

        $("#button_open_endereco").click(function () {
            $("#tab_enderecos_tab a").click();
        });

        //copiando os dados do telefone e email principal para tela de dados pessoais
        $("#tab_dados_pessoais_tab").bind("activate.dados_pessoais", function () {

            var telefone_principal = get_telefone_principal();
            var email_principal = get_email_principal();

            if (telefone_principal) {
                $("#telefone_principal_aux").val($(telefone_principal).val());
            } else {
                $("#telefone_principal_aux").val("");
            }

            if (email_principal) {
                $("#email_principal_aux").val($(email_principal).val());
            } else {
                $("#email_principal_aux").val("");
            }
        });

        $("#telefone_principal_aux").blur(function () {

            //seleciona todos as divs que sao do tipo telefone
            var telefone_principal = get_telefone_principal();

            if (telefone_principal) {

                if ($(this).val()) {
                    $(telefone_principal).val($(this).val());
                } else {
                    $(telefone_principal).parents("div:first").find(".removeClone").click();
                    //roda evento de ativar a aba novamente
                    $("#tab_dados_pessoais_tab").trigger("activate.dados_pessoais");
                }
            } else {
                if ($(this).val()) {
                    var botao_inserir_novo = $("#contato .cloneable");
                    var field_contato = $("#contato .hiddenClone:first");
                    $(botao_inserir_novo).click();
                    $(field_contato).find("[autosuggest*=contato__id_tipo_contato]").val("telefone");
                    $(field_contato).find("[name*=contato__id_tipo_contato]").val("1").change();
                    $(field_contato).find("[name*=contato__descricao]").val($(this).val());
                }
            }
        });

        $("#email_principal_aux").blur(function () {

            //seleciona todos as divs que sao do tipo email
            var email_principal = get_email_principal();

            if (email_principal) {
                if ($(this).val()) {
                    $(email_principal).val($(this).val());
                } else {
                    $(email_principal).parents("div:first").find(".removeClone").click();
                    //roda evento de ativar a aba novamente
                    $("#tab_dados_pessoais_tab").trigger("activate.dados_pessoais");
                }
            } else {
                if ($(this).val()) {
                    var botao_inserir_novo = $("#contato .cloneable");
                    var field_contato = $("#contato .hiddenClone:first");
                    $(botao_inserir_novo).click();
                    $(field_contato).find("[autosuggest*=contato__id_tipo_contato]").val("email");
                    $(field_contato).find("[name*=contato__id_tipo_contato]").val("2").change();
                    $(field_contato).find("[name*=contato__descricao]").val($(this).val());
                }
            }
        });

    }

    $(document).ready(function () {

        activate_contatos_aux();

        //calculando saldo para compras
        atualiza_saldo_compras();
        $("#valor_limite_credito").blur(function () {
            atualiza_saldo_compras();
        });

        var tipo = $("#field_tipo");
        var legend = $("#field_tipo").children("legend").children(".legend");
        var pf = $("#fisica");
        var pj = $("#juridica");
        var cpf = $('#cpf');
        var cnpj = $('#cnpj');
        var label_razao_social = $("label[for=razao_social]");
        var campo_razao_social = $("#razao_social");

        var valor = $("[name=tipo]:checked").val();
        tipo.hide();
        $("#op_conjuge").hide();
        if ($('#id').val() == '') {
            $("#enviar_gmail").hide();
        }
        //Verificando a exibição da aba tributação, condiciona as mesmas regras para abrir nfe
        if ('1' == '1')
            $('#tab_tributacao_tab').hide();
        else
            $('#tab_tributacao_tab').show();

        //adiciona confirm message se estiver finalizando
        $('input[type=submit]').bind('beforeSubmit.cliente', function (evt, ret) {
            ret.val = beforeSubmit();
        }); //end beforeSubmit

        $("[name=tipo]").click(function () {
            var val = $(this).val();
            tipo.show();
            if (val == "F") {
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
            } else if (val == "J") {
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
                if ($('#razao_social').val() == '' && $('#id').val() == '') {
                    $('[name="button_consulta_cnpj"].document_properties').click();
                }
            } else {
                tipo.hide();
            }
            //chama função que habilita ou desabilita dados relativos a a origem
            trataOrigem();
        });

        $('#isento_ie, #isento_im').change(
            function () {
                if ($(this).is(":checked")) {
                    $('#' + $(this).attr('campo')).attr('disabled', 'disabled').val('ISENTO').addClass('disabled');
                } else {
                    if ($('#' + $(this).attr('campo')).val().length == 0 || $('#' + $(this).attr('campo')).attr('disabled') == true) {
                        $('#' + $(this).attr('campo')).removeAttr('disabled').val('').removeClass('disabled');
                    }
                }
            }
        );
        $('#isento_ie, #isento_im').change();
        $("[name=tipo][value=" + valor + "]").click();
        if ($("#estado_civil").val() == 'C') {
            $("#op_conjuge").show();
        } else {
            $("#conjuge_data_nascimento").val('');
            $("#op_conjuge").hide();
            $("#conjuge").removeClass('required');
        }
        $("#estado_civil").change(function () {
            if ($("#estado_civil").val() == 'C') {
                $("#op_conjuge").show();
            } else {
                $("#conjuge_data_nascimento").val('');
                $("#op_conjuge").hide();
                $("#conjuge").removeClass('required');
                $("#conjuge_data_nascimento").removeClass('validate');
            }
        });

        if ($('#div_notas_vinculadas').length > 0) {
            $('#label_notas_vinculadas_tab').show();
        } else {
            $('#label_notas_vinculadas_tab').hide();
        }


        $("[name=recebe_email]").change(function () {
            if ($("[name=recebe_email]:checked").val() == 1) {
            }
        });

        //gera codigo de barras
        /** Instala evento para geracao do codigo de barras **/
        $("#ean").click(function () {
            $('#cod_barra').val(gera_ean());
        });

        //mostra ou oculta os clones de endereço ou endereco exterior e mostra mensagem caso já existam endereços cadastrados caso haja mudança de origem.
        $("[name=exterior]").change(function () {
            trataOrigem();
        });

        trataOrigem();


        $(".delete").bind("beforeDelete", function () {
            $this = $(this);
            $.ajax({
                url: 'http://app.tagplus.com.br/capitalponto/cadastro/clientes/before_delete/' + $("#id").val(),
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

        /**** AÇÃO AO CLICAR NO BOTÃO DE ENVIAR GMAIL****/
        $("#enviar_gmail").click(function () {
            //verifica o saldo do cliente
            var id = $("#id_entidade").val();
            $.ajax({
                url: 'http://app.tagplus.com.br/capitalponto/cadastro/clientes/get_emails/' + id,
                success: function (response) {
                    var emails = eval("(" + response + ")");
                    var principal = "";
                    var secundario = "";
                    if (emails.length > 0) {
                        for (var i = 0; i < emails.length; i++) {
                            if (emails[i].principal == 1) {
                                principal = emails[i].descricao_contato;
                            } else {
                                if (secundario != "") {
                                    secundario = secundario + ',' + emails[i].descricao_contato;
                                } else {
                                    secundario = emails[i].descricao_contato;
                                }
                            }
                        }
                    }
                    var url = 'https://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&to=' + principal + '&cc=' + secundario;
                    window.open(url);
                } //success
            }); //ajax

        });

        //abre o form de saldo devedor
        $('#button_saldo_devedor').click(function (e) {
            var id_entidade = $('#id_entidade').val();

            var url = 'http://app.tagplus.com.br/capitalponto/cadastro/clientes/form_saldo_devedor/' + id_entidade;
            parent.MochaUI.openModal({
                id: url,
                title: 'Consulta Saldo Devedor',
                contentURL: url,
                height: 360,
                width: 640
            });
        });

        /**** AÇÃO DO BOTÃO CONSULTAR CNPJ ****/
        $('[name=button_consulta_cnpj], #pesquisar_cnpj').click(function () {
            if ($("[name=exterior]:checked").val() == 0) {
                var url = 'http://app.tagplus.com.br/capitalponto/cadastro/clientes/form_consultar_cnpj/';
                parent.MochaUI.openModal({
                    id: url,
                    title: 'Importar dados via Receita Federal Brasileira',
                    contentURL: url,
                    height: 220,
                    width: 400
                });
            }
        });

        //Aba Gestão de saldo
        if ('' != true) {
            $('#label_saldos_tab').hide();
        }

    });
})(jQuery);

