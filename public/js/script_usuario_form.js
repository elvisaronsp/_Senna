if(window.jQuery && jQuery.i18n) jQuery.i18n.load({"intro_button_continuar":"Continuar","intro_button_avancar":"Avan\u00e7ar","intro_button_entendi":"<i class=\"icon-ok\"><\/i> Entendi","intro_button_ok":"<i class=\"icon-ok\"><\/i> Ok","intro_button_concluir":"<i class=\"icon-thumbs-up\"><\/i> Concluir","intro_button_voltar":"Voltar","intro_button_fechar":"Fechar","intro_button_cancelar":"<i class=\"icon-remove\"><\/i> Cancelar Tutorial","lang_range_separator":"a","lang_range_periodo_vazio":"Todo o Per\u00edodo","lang_range_date_format":"dd mmm","lang_range_date_format_dia":"dd de mmmm yyyy","lang_range_date_format_mes":"mmmm yyyy","lang_range_date_format_ano":"yyyy","lang_date_format":"dd\/mm\/yyyy","lang_start_date":"01\/01\/2011","label_upload_error":"<b>Erro !<\/b>","label_conf_remover":"Deseja realmente excluir este arquivo?<br\/>Esta opera\u00e7\u00e3o n\u00e3o poder\u00e1 ser desfeita.","label_conf_sim":"Apagar Arquivo","label_conf_nao":"Cancelar"});


/*************************************************
 cadastro/complementos_cadastros/form_enderecos.js
 *************************************************/

/**
 * @author Bruno
 */
//montando autocomplete para seleção de fornecedores
(function($){

    var preencheForm = function ($parent, json)
    {
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
            function ()
            {
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
        var address = rua+','+num+'-'+bairro+','+cidade+'-'+estado+','+cep+','+pais;

        // Valida dados necessários para exibição do mapa
        var ret = false;
        var vars = ['rua','cidade','estado','pais'];
        $.each(vars, function (i,val) {
            if (!eval(val)){
                ret = true;
                return false;
            }
        });
        if (ret){
            parent.Sexy.alert('Favor informar os dados do endereço a ser exibido.');
            return false;
        }
        // Instancia geocoder da API
        var geocoder = new google.maps.Geocoder();

        // Recupera longitude e latitude, recebendo o endereço como paramentro
        geocoder.geocode( { 'address': address},
            // Callback do pedido de latitude e longitude
            function(results, status)
            {
                // Se resultado é válido
                if (status == google.maps.GeocoderStatus.OK)
                {
                    alert('http://127.0.0.1:8080/senna/usuario/funcionarios/mapa');
                    // Abre modal com o mapa
                    parent.MochaUI.openWindow({
                        id:'http://127.0.0.1:8080/senna/usuario/funcionarios/mapa',
                        title:'Mapa',
                        onContentLoaded:function ()
                        {
                            // Armazena objeto para latitude e longitude
                            var myLatlng = results[0].geometry.location;
                            alert(myLatlng);
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
                            map = new google.maps.Map(janela.find('#content').css({'width':'100%','height':'100%','padding':'0','margin':'0'}).get(0), myOptions);
                            // Cria marcador
                            var marker = new google.maps.Marker({
                                map: map,
                                position: myLatlng
                            });
                            // Adiciona evento "Click" para o marcador
                            google.maps.event.addListener(marker, 'click', function() {
                                map.setZoom(17);
                            });
                        }
                    });
                }
                else
                {
                    Sexy.alert("Não foi possível encontrar o endereço informado");
                }
            }
        );
    };

    var exist_principal = function(){
        var retorno = false;
        var fields = $('#endereco .clonedField:not(.hiddenClone)').find('[name*=principal_radio]');
        fields.each(function(){
            if($(this).is(':checked'))
                retorno =  true;
        });
        return retorno;
    };

    var set_principal_padrao = function(){
        var visibles= $('#endereco .clonedField:not(.hiddenClone):first');
        var inserido_ultimo = $('#endereco .clonedField:not(.hiddenClone):last');
        if(inserido_ultimo.find('[name*=endereco_entidade__id]').val() == ''){
            $('#endereco .clonedField:not(.hiddenClone):last').find('[name*=btn_mapa]').attr('disabled','disabled');
        }
        if(!exist_principal()){
            visibles.find('[name*=principal_radio]').attr('checked','checked');
            visibles.find('[name*=__principal]').val(1);
        }
    };

    jQuery(document).ready(function(){

        // Habilita botoes de mapa
        $('[name=btn_mapa]').each(
            function ()
            {
                if($(this).parents('.clonedField').find('[name*=endereco_entidade__id]').val() != '')
                {
                    $(this).removeAttr('disabled');
                }
            }
        ).click(
            function ()
            {
                showMap($(this).parents('.clonedField'));
            }
        );


        // Trata cadastro de endereço principal
        $('#endereco .clonedField').each(
            function ()
            {
                /*acao_novo_endereco($(this));
                 auto_comlepete_endereco($(this));*/

                if ($(this).find('[name*=__principal]').val() == 1)
                {
                    $(this).find('[name*=principal_radio]').attr('checked','checked');
                }
                $(this).find('[name*=principal_radio]').click(
                    function ()
                    {
                        $('[name*=endereco_entidade__principal]').val('0');
                        $(this).parents('.clonedField').find('[name*=__principal]').val($(this).is(':checked') ? 1 : 0);
                    }
                );
            }
        );

        //verifica se existe algum campo marcado como principal na hora de remover um clone
        $(".removeClone").click(function(){
            set_principal_padrao();
        });
        //verifica se existe algum campo marcado como principal na hora de inserir um clone
        $(".cloneable").click(function(){
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
        $("[id*=btn_cep]").click(function(evt, el){ get_cep_ws($(this).parents('.clonedField')) });
        $("[name*=endereco__cep]").blur(function(evt, el){
            if($('#flag_exterior').val() != '1')
                get_cep_ws($(this).parents('.clonedField'))
        });


        $("[id*=endereco__id_cidade]").change(function(evt, el, json){
            container = $(this).parents('.clonedField');
            $(container).find("[name*=endereco__id_cidade]").val(json.id);
            $(container).find("[name*=localidade_cidade__nome]").val(json.nome);
            $(container).find("[name*=cidade_cod]").val(json.cod);
            $(container).find("[name*=estado_cod]").val(json.cod_estado);
            $(container).find("[name*=estado]").val(json.sigla);
        });

        $("[id*=btn_correio]").click(function(evt, el){
            window.open('http://www.buscacep.correios.com.br/');
        });


    });


    var get_cep_ws = function (container) {
        //Carregando
        $("#loader").show().find(".carregando").hide();
        $("#loader").find(".enviando").show();

        var cep = $(container).find("[name*=endereco__cep]").val();
        var url = '{url_ws_cep}';

        if (!cep){
            Sexy.alert('Por favor, informe o CEP.');
            $("#loader").hide();
        }
        else{
            //Faz uma requisição pra verificar se o cep ja foi cadastrado
            $.ajax({
                type: "POST",
                url: 'http://app.tagplus.com.br/empresariamkk/cadastro/enderecos/get_endereco_by_cep/'+cep,
                dataType: 'json',
                async:false,
                success: function(data){
                    if(data.length != 0){
                        //Se tem só 1 endereço
                        if(data.length == 1){
                            var json =  data[0];
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
                        }else{
                            Sexy.confirm('Foi encontrado mais de um endereço para o mesmo CEP. Deseja selecionar estes endereços?',{
                                textBoxBtnOk:"Sim",
                                textBoxBtnCancel:"Não",
                                onComplete:function (ret) {
                                    if (ret){
                                        // Abre modal com o mapa
                                        var data_end = false;
                                        var url = 'http://app.tagplus.com.br/empresariamkk/cadastro/enderecos/form_enderecos_mult';
                                        parent.MochaUI.openWindow({
                                            id:url,
                                            title: 'Endereço',
                                            type:'modal',
                                            //Id de onde foi clicado enviado como parametro.
                                            contentURL: url,
                                            width:700,
                                            height:486,
                                            onContentLoaded:function () {

                                                var janela = this.iframeEl;
                                                janela = $(janela).contents();

                                                janela.find("[id*=_endereco__id]").attr('source','http://app.tagplus.com.br/empresariamkk/autocomplete/enderecos/index/'+cep);
                                            },
                                            onClose:function (){
                                                var janela = this.iframeEl;
                                                janela = $(janela).contents();
                                                var id_endereco = janela.find('[id*=_endereco__id]').val();

                                                if((id_endereco) && (id_endereco != undefined)){
                                                    $.getJSON("http://app.tagplus.com.br/empresariamkk/cadastro/enderecos/get_endereco_by_id/"+id_endereco,{},function(json){
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
                                        });//Modal
                                    }
                                }
                            });//SexyConfirm
                        }

                        $("#loader").hide();
                    }else{
                        //Procura no WS
                        $.getJSON("http://app.tagplus.com.br/empresariamkk/cadastro/enderecos/get_cep_ws/" + cep,{},function(json){
                            if (!json || json.resultado == ''){
                                $("#loader").hide();
                                Sexy.alert("Não foi possível pesquisar este CEP. Por favor tente novamente em alguns instantes");
                                return false;
                            }

                            if (!json || json.resultado == 0){
                                $("#loader").hide();
                                Sexy.alert("CEP não encontrado.");
                                return false;
                            }

                            //Erro ao recuperar CEP
                            if(json.cod_error){
                                $("#loader").hide();
                                Sexy.alert("Não foi possível pesquisar este CEP. Por favor tente novamente em alguns instantes");
                                return false;

                            }

                            //Verificando se houve retorno no webservice caso não manda editar direto
                            if(json.logradouro != '' && json.bairro != '' && json.id_cidade != ''){
                                // Criando string contendo o endereço completo e adicionando conteúdo ao campo próprio
                                var endereco_completo = '['+json.cep+'] '+json.logradouro+', '+json.bairro+' - '+json.cidade+'/'+json.uf_nome;
                                var msg = ('O Endereço: \$s%1, foi encontrado.<br /><br /> O que você deseja fazer?').replace('$s%1',endereco_completo);

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
                            }else{
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
                    }//Else
                }//Success
            });//Ajax
        }
    }
})(jQuery);


/************************************************
 cadastro/complementos_cadastros/form_contatos.js
 ************************************************/

/**
 * @author Eduardo
 */
//montando autocomplete para seleção de fornecedores
(function($){

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
            if ($(this).val() == id_contato || (id_contato == 0 && $(this).val() == '') ||  (id_contato == '' && $(this).val() == 0)) {
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
                $(this).parents('.clonedField').find('[name*=contato__principal]').attr('checked','checked');
            }
            else {
                // Se não possui nenhum marcado, marca o primeiro
                var ja_possui_principal = false;
                $.each(contatos_com_principal,function (i,v){
                    if (v == id_tipo_contato) {
                        ja_possui_principal = true;
                        return false;
                    }
                });
                // Marca principal em quem não tiver
                if (!ja_possui_principal) {
                    $(this).parents('.clonedField').find('[name*=contato__principal]').removeAttr('checked');
                    contatos_iguais[0].parents('.clonedField').find('[name*=contato__principal]').attr('checked','checked');
                }
            }
        });
    }

    var tratamento_change_tipo_contato = function(el) {
        if(tipo_contato[$(el).val()] == "T"){
            $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('email','true');
            $(el).parents('div:first').find('[name*=contato__descricao]').attr('maxlength','14').attr('minlength','4');
        }else{
            if(tipo_contato[$(el).val()] == "E"){
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('maxlength','14').removeAttr('minlength','4');
                $(el).parents('div:first').find('[name*=contato__descricao]').attr('email','true');
            }else{
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('email','true');
                $(el).parents('div:first').find('[name*=contato__descricao]').removeAttr('maxlength','14').removeAttr('minlength','4');
                $(el).parents('div:first').find('[name*=contato__descricao]').attr('maxlength','50');
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
    $(document).ready(function(){

        $('[id*=contato].clonedField').each(function (){
            if ($(this).find('[name*=contato__editavel]').val() == '0'){
                $(this).find('input').attr('disabled',true);
                $(this).find('select').attr('disabled','disabled');
                $(this).find('.removeClone').remove();
            }

            $('[id*=contato].clonedField').find('[name*=contato__id_tipo_contato]').each(function(){
                if(tipo_contato[$(this).val()] == "T"){
                    $(this).parents('div:first').find('[name*=contato__descricao]').attr('maxlength','14').attr('minlength','4');
                }else{
                    if(tipo_contato[$(this).val()] == "E"){
                        $(this).parents('div:first').find('[name*=contato__descricao]').attr('email','true');
                    }
                    else{
                        $(this).parents('div:first').find('[name*=contato__descricao]').attr('maxlength','50');
                    }
                }

            });//end each();

            //adicinando comportamento no checkbox principal
            $(this).find('[name*=contato__principal]').click(function(){
                // Não permite desmarcar
                if (!$(this).is(':checked')) {
                    $(this).attr('checked','checked');
                    return;
                }
                var $tipo = $(this).parents("div:eq(1)").find('[name*=contato__id_tipo_contato]');

                $('[id*=contato].clonedField').each(function(){
                    $tipo_atual = $(this).find('[name*=contato__id_tipo_contato]');
                    //verifica se  a div que esta sendo verificada nao e a propria div do click
                    if($tipo_atual.parents('div').attr('id') != $tipo.parents('div').attr('id')){
                        //verifica se o tipo de contato procurado e igual o tipo de contato do principal marcado.
                        if(($tipo.val() == $tipo_atual.val()) || ($tipo.val()==0 && $tipo_atual.val()=='') || ($tipo.val()=='' && $tipo_atual.val()==0)){
                            $tipo_atual.parents('div:first').find('[name*=contato__principal]').removeAttr('checked');
                        }
                    }
                });//end each();
            });//end click();

            // Ao remover um contato
            $('#contato').bind('onHideClone.trataprincipal',verifica_marca_contatos_principais)
                .bind('onShowClone.trataprincipal',verifica_marca_contatos_principais);

            //adicionando comportamento ao evento click no tipo de contato.
            $(this).find('[name*=contato__id_tipo_contato]').change(function () {
                $(this).parents('.clonedField').find('[name*=contato__principal]').removeAttr('checked');
                tratamento_change_tipo_contato($(this));
            }).bind('clear',function () {
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


/************************************
 usuario/funcionarios/form_cliente.js
 ************************************/

(function($){

    var autocompleteCliente = function(table, container){
        // Trata o comportamento do autosuggest de produtos
        $(container).find("[name*=cliente_vendedor__id_cliente]").change(function(evt, el, json){
            if(json.flag_exterior == 1){
                $(container).find("[name*=cpf_cnpj_cliente]").val("");
            }
            else{
                $(container).find("[name*=cpf_cnpj_cliente]").val(json.cpfcnpj);
            }
            $(container).find("[name*=cliente_vendedor__id_cliente]").val(json.id);
        });

        $(container).find("[name*=cliente_vendedor__id_cliente]").bind("clear", function(evt){
            $(container).find("[name*=cliente_vendedor__id_cliente]," +
            "[name*=cliente_vendedor__id_cliente]," +
            "[name*=cliente_vendedor__id_funcionario]," +
            "[name*=cpf_cnpj_cliente],").val("");

            $(this).bestupper();
        });
    };

    var validaLinhas = function(){
        if($("#clientes_vendedores tbody tr:last").find("[name*=cliente_vendedor__id_cliente]").val() ==''){
            return false;
        }
        return true;
    };


    $(document).ready(function(){

        if( $("[name=vendas_restritas]").val() == 0)
            $("#table_clientes_vendedores").hide();

        //insere os eventos antes do focus ser dado na primeira linha no autocomplete.
        $("#clientes_vendedores").clonetable({
            addButtonLabel: 'Novo',
            onCreateClone: autocompleteCliente,
            onBeforeCreateClone: validaLinhas
        });

        //Insere autocomplete e efetua tratamentos para lançamentos
        $("#clientes_vendedores tbody tr").each(function (){
            autocompleteCliente("#clientes_vendedores", $(this), true);
        });

        $("[name=vendas_restritas]").change(function(){
            if( $(this).val() == 1){
                $("#table_clientes_vendedores").show();
            }else{
                $("#table_clientes_vendedores").hide();
            }
        });

    });
})(jQuery);
jQuery(document).ready(function(){jQuery.extend(jQuery.validator.messages, {accept: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.'/> ", cnpj: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Informe um CNPJ válido.'/> ", cpf: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Informe um CPF válido.'/> ", creditcard: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.'/> ", date: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma data v&aacute;lida.'/> ", digits: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a somente d&iacute;gitos.'/> ", email: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.'/> ", equalTo: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a o mesmo valor novamente.'/> ", max: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor menor ou igual a {0}.'/> "), maxlength: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a n&atilde;o mais que {0} caracteres.'/> "), min: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior ou igual a {0}.'/> "), minlength: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a ao menos {0} caracteres.'/> "), number: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um n&uacute;mero v&aacute;lido.'/> ", range: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor entre {0} e {1}.'/> "), rangelength: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor contendo de {0} a {1} caracteres.'/> "), required: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Este campo é obrigatório.'/> ", requiredIf: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Este campo deve ser preenchido.'/> ", remote: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Por favor, corrija este campo.'/> ", url: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma URL v&aacute;lida.'/> ", time: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma hora válida'/> ", code: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um código válido'/> ", price: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior que 0'/> ", cidade: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Cidade não cadastrada no sistema.'/> ", pais: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='País não 'cadastrado no sistema.'/> ", requiredCep: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='CEP e ou Logradouro não cadastrados no sistema.'/> ", transporte: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='O valor deste campo deve ser definido.'/> ", positive: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Forneça um valor maior que 0,00.'/> ", cfop: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ", cfop_transp: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ", code_ean: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido, este campo deve ser um EAN válido e possuir 8, 12,13 ou 14 caracteres.'/> ", number_letter: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Por favor insirá apenas números ou letras, não será permitido caracteres especiais'/> ", cod_ncm: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido ,este campo deve possuir 2 ou 8 caracteres.'/> ", max_vr_cupom: jQuery.validator.format("<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='O valor neste campo deve ser inferior a {0}'/> "), autosuggest: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Este campo não possui um valor válido selecionado'/> ", password: "<img src='http://app.tagplus.com.br/empresariamkk/resources/images/icons/alert.png' class='tooltip' title='Senha deve conter pelo menos 6 caracteres utilizando letras e números'/> "}); });

Date.monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
Date.abbrMonthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
Date.dayNames = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
jQuery.dpText = { TEXT_PREV_YEAR:'Ano Anterior', TEXT_PREV_MONTH:'Mês Anterior', TEXT_NEXT_YEAR:'Próximo Ano', TEXT_NEXT_MONTH:'Próximo Mês', TEXT_CLOSE:'Fechar', TEXT_CHOOSE_DATE:'Escolha a Data', HEADER_FORMAT:'mmmm yyyy'};
Date.firstDayOfWeek=0;
Date.format = jQuery.i18n._('lang_date_format');



/****************************
 usuario/funcionarios/form.js
 ****************************/

(function ($){

    /**
     * Retorna o campo do email principal
     */
    function get_telefone_principal(){

        //seleciona todos as divs que sao do tipo telefone
        var telefone_principal = "";
        var telefones = $("#contato").find("[name*=contato__id_tipo_contato][value=1]");

        $(telefones).each(function(){
            if($(this).parents("div:first").find("[name*=contato__principal]:checked").val() == "1"){
                telefone_principal = $(this).parents("div:first").find("[name*=contato__descricao]");
                return false;
            }
        });

        return telefone_principal;
    }

    /**
     * Retorna o campo do email principal
     */
    function get_email_principal(){

        //seleciona todos as divs que sao do tipo email
        var email_principal = "";
        var emails = $("#contato").find("[name*=contato__id_tipo_contato][value=2]");
        $(emails).each(function(){
            if($(this).parents("div:first").find("[name*=contato__principal]:checked").val() == "1"){
                email_principal = $(this).parents("div:first").find("[name*=contato__descricao]");
                return false;
            }
        });

        return email_principal;
    }

    function activate_contatos_aux(){

        $("#button_open_endereco").click(function(){
            $("#tab_enderecos_tab a").click();
        });

        //copiando os dados do telefone e email principal para tela de dados pessoais
        $("#tab_perfil_acesso_tab").bind("activate.dados_pessoais",function(){

            var telefone_principal= get_telefone_principal();
            var email_principal = get_email_principal();

            if(telefone_principal){
                $("#telefone_principal_aux").val($(telefone_principal).val());
            }
            else{
                $("#telefone_principal_aux").val("");
            }

            if(email_principal){
                $("#email_principal_aux").val($(email_principal).val());
            }
            else{
                $("#email_principal_aux").val("");
            }
        });

        $("#telefone_principal_aux").blur(function(){

            //seleciona todos as divs que sao do tipo telefone
            var telefone_principal = get_telefone_principal();

            if(telefone_principal){

                if($(this).val()){
                    $(telefone_principal).val($(this).val());
                }
                else{
                    $(telefone_principal).parents("div:first").find(".removeClone").click();
                    //roda evento de ativar a aba novamente
                    $("#tab_perfil_acesso_tab").trigger("activate.dados_pessoais");
                }
            }
            else{
                if($(this).val()){
                    var botao_inserir_novo = $("#contato .cloneable");
                    var field_contato = $("#contato .hiddenClone:first");
                    $(botao_inserir_novo).click();
                    $(field_contato).find("[autosuggest*=contato__id_tipo_contato]").val("telefone");
                    $(field_contato).find("[name*=contato__id_tipo_contato]").val("1").change();
                    $(field_contato).find("[name*=contato__descricao]").val($(this).val());
                }
            }
        });

        $("#email_principal_aux").blur(function(){
            //seleciona todos as divs que sao do tipo email
            var email_principal = get_email_principal();

            if(email_principal){
                if($(this).val()){
                    $(email_principal).val($(this).val());
                }
                else{
                    $(email_principal).parents("div:first").find(".removeClone").click();
                    //roda evento de ativar a aba novamente
                    $("#tab_dados_pessoais_tab").trigger("activate.dados_pessoais");
                }
            }
            else{
                if($(this).val()){
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


    $(document).ready(function(){
        if($("#id").val() ==''){
            var botao_inserir_novo = $("#contato .cloneable");
            var field_contato = $("#contato .hiddenClone:first");
            $(botao_inserir_novo).click();
            $(field_contato).find("[autosuggest*=contato__id_tipo_contato]").val("email");
            $(field_contato).find("[name*=contato__id_tipo_contato]").val("2").change();
            $(field_contato).find("[name*=contato__descricao]").val($('#email_principal_aux').val());
        }
        activate_contatos_aux();

        $("#ean").click(function () { $('#codigo_acesso').val(gera_ean()) });

        $('#pass_pdv').click(function(){
            var pass_pdv = "22867326";
            Sexy.info('Senha do PDV: '+pass_pdv);
        });

        if($("#id").val() !=""){
            if($("#cpf").val() != ""){
                $("#cpf").addClass("required");
            }
        }
        // Novo usuário
        else{
            $('input[type=submit]').addConfirmMessage('Caso o Funcionário criado realize Login no sistema, não poderá ser apagado. Tem certeza que deseja criar este Funcionário?','Sim','Não');
        }

        $(".delete").bind("beforeDelete",function(){
            $this = $(this);
            $.ajax({
                url: 'http://app.tagplus.com.br/empresariamkk/usuario/funcionarios/before_delete/'+$("#id").val(),
                dataType: 'json',
                async:false,
                success: function(data){
                    if(data == 1){
                        $this.unsetConfirmMessage("Tem certeza que deseja apagar este registro?");
                        $this.addConfirmMessage("Este Funcionário não pode ser removido pois já efetuou login ou possui vínculos no sistema. Deseja desativá-lo?",'Sim','Não');
                    }
                }
            });
        });

    });
})(jQuery);