if(window.jQuery && jQuery.i18n) jQuery.i18n.load({"intro_button_continuar":"Continuar","intro_button_avancar":"Avan\u00e7ar","intro_button_entendi":"<i class=\"icon-ok\"><\/i> Entendi","intro_button_ok":"<i class=\"icon-ok\"><\/i> Ok","intro_button_concluir":"<i class=\"icon-thumbs-up\"><\/i> Concluir","intro_button_voltar":"Voltar","intro_button_fechar":"Fechar","intro_button_cancelar":"<i class=\"icon-remove\"><\/i> Cancelar Tutorial","label_sim":"Sim","label_nao":"N\u00e3o","lang_range_separator":"a","lang_range_periodo_vazio":"Todo o Per\u00edodo","lang_range_date_format":"dd mmm","lang_range_date_format_dia":"dd de mmmm yyyy","lang_range_date_format_mes":"mmmm yyyy","lang_range_date_format_ano":"yyyy","lang_date_format":"dd\/mm\/yyyy","lang_start_date":"01\/01\/2011","intro_button_cadastrar_produto":"Cadastrar Produto","intro_inicio_title":"Cadastro de Cliente","intro_inicio_text":"Estamos agora no menu <b>Clientes<\/b> onde vamos aprender a cadastrar nosso primeiro Cliente.","intro_lista_title":"Listagem de Cliente","intro_lista_text":"Aqui ser\u00e3o listados alguns clientes cadastrados.<br\/> Em cada p\u00e1gina podem ser exibidos de 25 a 200 clientes.","intro_lista_cliente_title":"P\u00e1gina\u00e7\u00e3o","intro_lista_cliente_text":"Aqui voc\u00ea escolhe quantos clientes ser\u00e3o exibidos por p\u00e1gina.","intro_lista_paginacao_title":"P\u00e1gina\u00e7\u00e3o","intro_lista_paginacao_text":"Aqui voc\u00ea navegar\u00e1 entre as p\u00e1ginas.","intro_filtrar_title":"Filtrar","intro_filtrar_text":"Aqui voc\u00ea pode pesquisar os clientes por <b>palavras-chaves<\/b>, como nome, email, telefone.","intro_filtro_avancado_title":"Filtro Avan\u00e7ado","intro_filtro_avancado_text":"Aqui voc\u00ea encontra fun\u00e7\u00f5es mais avan\u00e7adas para<br\/> buscar o cliente como, cidade ou estado.","intro_form_cliente_title":"Nome","intro_form_cliente_text":"Agora por favor digite o <b>nome<\/b> do seu primeiro cliente","intro_form_cliente_email_title":"Email","intro_form_cliente_email_text":"Agora por favor digite o <b>Email<\/b> do seu primeiro cliente","intro_form_cliente_tel_title":"Telefone","intro_form_cliente_tel_text":"Agora por favor digite o <b>Telefone<\/b> do seu primeiro cliente","intro_form_cliente_save_title":"Salvar","intro_form_cliente_save_text":"Para <b>salvar<\/b> o cliente basta clicar em cima do bot\u00e3o e pronto. ","intro_form_cliente_fim_title":"Fim do Cadastro","intro_form_cliente_fim_text":"Parab\u00e9ns!<br\/> Voc\u00ea j\u00e1 aprendeu como cadastrar seu primeiro cliente com sucesso. Agora, vamos cadastrar um produto?","intro_novo_item_title":"Novo","intro_novo_item_text":"Neste bot\u00e3o poder\u00e1 cadastrar um novo Cliente "});


Date.monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
Date.abbrMonthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
Date.dayNames = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
jQuery.dpText = { TEXT_PREV_YEAR:'Ano Anterior', TEXT_PREV_MONTH:'Mês Anterior', TEXT_NEXT_YEAR:'Próximo Ano', TEXT_NEXT_MONTH:'Próximo Mês', TEXT_CLOSE:'Fechar', TEXT_CHOOSE_DATE:'Escolha a Data', HEADER_FORMAT:'mmmm yyyy'};
Date.firstDayOfWeek=0;
Date.format = jQuery.i18n._('lang_date_format');


jQuery(document).ready(function(){jQuery.extend(jQuery.validator.messages, {accept: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.'/> ", cnpj: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Informe um CNPJ válido.'/> ", cpf: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Informe um CPF válido.'/> ", creditcard: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.'/> ", date: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma data v&aacute;lida.'/> ", digits: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a somente d&iacute;gitos.'/> ", email: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.'/> ", equalTo: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a o mesmo valor novamente.'/> ", max: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor menor ou igual a {0}.'/> "), maxlength: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a n&atilde;o mais que {0} caracteres.'/> "), min: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior ou igual a {0}.'/> "), minlength: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a ao menos {0} caracteres.'/> "), number: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um n&uacute;mero v&aacute;lido.'/> ", range: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor entre {0} e {1}.'/> "), rangelength: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor contendo de {0} a {1} caracteres.'/> "), required: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo é obrigatório.'/> ", requiredIf: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo deve ser preenchido.'/> ", remote: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Por favor, corrija este campo.'/> ", url: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma URL v&aacute;lida.'/> ", time: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a uma hora válida'/> ", code: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um código válido'/> ", price: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior que 0'/> ", cidade: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Cidade não cadastrada no sistema.'/> ", pais: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='País não 'cadastrado no sistema.'/> ", requiredCep: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CEP e ou Logradouro não cadastrados no sistema.'/> ", transporte: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='O valor deste campo deve ser definido.'/> ", positive: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Forneça um valor maior que 0,00.'/> ", cfop: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ", cfop_transp: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='CFOP inválido'/> ", code_ean: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido, este campo deve ser um EAN válido e possuir 8, 12,13 ou 14 caracteres.'/> ", number_letter: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Por favor insirá apenas números ou letras, não será permitido caracteres especiais'/> ", cod_ncm: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Caso seja preenchido ,este campo deve possuir 2 ou 8 caracteres.'/> ", max_vr_cupom: jQuery.validator.format("<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='O valor neste campo deve ser inferior a {0}'/> "), autosuggest: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Este campo não possui um valor válido selecionado'/> ", password: "<img src='http://app.capitalponto.com.br/capitalponto/resources/images/icons/alert.png' class='tooltip' title='Senha deve conter pelo menos 6 caracteres utilizando letras e números'/> "}); });
var confirmation = function(a,b){b=$extend({'textBoxBtnOk':'Sim','textBoxBtnCancel':'Não'},b||{});Sexy.confirm(a,b);};

/********************************
 cadastro/clientes/list_filter.js
 ********************************/

(function($){
    jQuery(document).ready(function(){
        prepareForm();

        //ao clicar em limpar filtro
        $("#clean_button").click(function(){
            $('#data_considerada option').each(function(i){
                $(this).show();
            });
        });
    });

    /**Troca de campos de data. Desabilitando campos**/
    var toggleData = function(){
        if($('[name=data_periodo]:checked').val() == '0'){
            $('#data_inicial').removeAttr('disabled');
            $('#data_final').removeAttr('disabled');
            $('.dp-choose-date').show();
        }
        else{
            $('#data_inicial').attr('disabled','disabled');
            $('#data_final').attr('disabled','disabled');
            $('.dp-choose-date').hide();
        }
    };

    /** Prepara formulário **/
    var prepareForm = function(){
        $('[name=data_periodo]').unbind('click').click(toggleData);
    };

})(jQuery);

/*************************
 cadastro/clientes/list.js
 *************************/

window.addEvent('domready',function (){
    list.datagrid.addEvent('loaddata',function (evt) {
        // Desabilita onload
        $$('input[name=button_enviar_gmail]').set('disabled',true).addClass("disabled");
        $$('input[name=saldo_devedor]').set('disabled',true).addClass("disabled");
        $(document.body).getElementById('emails_clientes').set('value', evt.data.emails_clientes);
    });
    list.datagrid.addEvent('click',function (row) {
        //habilita onclick
        $$('input[name=button_enviar_gmail]').removeProperties("disabled").removeClass("disabled");
        $$('input[name=saldo_devedor]').removeProperties("disabled").removeClass("disabled");
        // callback onclick
        set_url_gmail();
    });

    function set_url_gmail(){
        var id = list.datagrid.getDataByRow(list.datagrid.getSelectedIndices()).id_entidade;
        new Request({
            url: 'http://app.capitalponto.com.br/capitalponto/cadastro/clientes/get_emails/'+id,
            onComplete: function(response){
                if(response){
                    var emails 		= eval("(" + response + ")");
                    var principal	= "";
                    var secundario	= "";

                    if(emails.length > 0){
                        for (var i = 0; i < emails.length; i++) {
                            if(emails[i].principal == 1){
                                principal = emails[i].descricao_contato;
                            }else{
                                if(secundario != ""){
                                    secundario = secundario +','+emails[i].descricao_contato;
                                }else{
                                    secundario = emails[i].descricao_contato;
                                }
                            }
                        }
                    }
                    var url = 'https://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&to='+principal+'&cc='+secundario;
                    $$('#enviar_gmail').set('href',url);
                }
            }
        }).send();
    }

    list.onBeforeDeleteRow = function(row){

    };
});

jQuery.noConflict();
(function($){

    $(document).ready(function(){
        //abre o form de saldo devedor
        $('#button_saldo_devedor').click(function(e){

            var id_cliente = list.datagrid.getDataByRow(list.datagrid.getSelectedIndices()).id_entidade;
            var nome_cliente = list.datagrid.getDataByRow(list.datagrid.getSelectedIndices()).nome_cliente;

            var url = 'http://app.capitalponto.com.br/capitalponto/cadastro/clientes/form_saldo_devedor/'+id_cliente+'/'+nome_cliente;
            parent.MochaUI.openModal({
                id:url,
                title:'Consulta Saldo Devedor',
                contentURL: url,
                height:360,
                width:640
            });

        });

        /**** AÇÃO DO BOTÃO EXPORTAR CSV ****/
        $('#exportar_csv').click(function(event){
            var filter = $('#filter').serializeArray();
            var arr 	= "";
            var uf  	= "";
            var cidade  = "";
            $.each(filter, function(i, field){


                if(field.name == 'filter_form')
                    return;

                //Formatando a busca
                if(field.name == 'busca' && field.value != ''){
                    var str = field.value;
                    arr += field.name+":"+btoa(str)+"/";
                }else
                //Formatando a Data Inicial
                if(field.name == 'data_inicial' && field.value != ''){
                    var data 		= field.value
                    var format_data = data.split('/');

                    arr += field.name+":"+format_data[2]+'-'+format_data[1]+'-'+format_data[0]+"/";
                }
                //Formatando Data Final
                else if(field.name == 'data_final' && field.value != ''){
                    var data 		= field.value
                    var format_data = data.split('/');

                    arr += field.name+":"+format_data[2]+'-'+format_data[1]+'-'+format_data[0]+"/";
                }
                //Tratamento do multisuggest UF
                else if(field.name == 'uf[]'){
                    var obj =  $.parseJSON(field.value);
                    uf += obj.id+"_";
                }
                //Tratamento Multisuggest Cidade
                else if(field.name == 'cidade[]'){
                    var obj =  $.parseJSON(field.value);
                    cidade += obj.id+"_";
                }
                else
                    arr += field.name+":"+field.value+"/";

                arr += "uf:"+uf+"/";
                arr += "cidade:"+cidade+"/";
            });

            Sexy.confirm("Deseja realmente exportar os e-mails? Serão exportado todos os emails aplicados pelo filtro",{
                textBoxBtnOk:"Sim",
                textBoxBtnCancel:"Não",
                onComplete: function(val){
                    if(val){
                        toggleLoading(true);
                        /*var ids = $('#emails_clientes').val();
                         ids = ids.replace(/,/g,"_");
                         var url = "http://app.capitalponto.com.br/capitalponto/cadastro/clientes/exportar_emails/"+ids;*/


                        var url = "http://app.capitalponto.com.br/capitalponto/cadastro/clientes/exportar_emails/"+arr;
                        toggleLoading(false);
                        window.open(url);
                    }
                }
            });//sexy
        });
    });
})(jQuery);
