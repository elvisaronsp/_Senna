if(window.jQuery && jQuery.i18n) jQuery.i18n.load({"intro_button_continuar":"Continuar","intro_button_avancar":"Avan\u00e7ar","intro_button_entendi":"<i class=\"icon-ok\"><\/i> Entendi","intro_button_ok":"<i class=\"icon-ok\"><\/i> Ok","intro_button_concluir":"<i class=\"icon-thumbs-up\"><\/i> Concluir","intro_button_voltar":"Voltar","intro_button_fechar":"Fechar","intro_button_cancelar":"<i class=\"icon-remove\"><\/i> Cancelar Tutorial","lang_range_separator":"a","lang_range_periodo_vazio":"Todo o Per\u00edodo","lang_range_date_format":"dd mmm","lang_range_date_format_dia":"dd de mmmm yyyy","lang_range_date_format_mes":"mmmm yyyy","lang_range_date_format_ano":"yyyy","lang_date_format":"dd\/mm\/yyyy","lang_start_date":"01\/01\/2011"});

jQuery(document).ready(function(){jQuery.extend(jQuery.validator.messages, {accept: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.'/> ", cnpj: "<img src='/images/alert.png' class='tooltip' title='Informe um CNPJ válido.'/> ", cpf: "<img src='/images/alert.png' class='tooltip' title='Informe um CPF válido.'/> ", creditcard: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.'/> ", date: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma data v&aacute;lida.'/> ", digits: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a somente d&iacute;gitos.'/> ", email: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.'/> ", equalTo: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a o mesmo valor novamente.'/> ", max: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor menor ou igual a {0}.'/> "), maxlength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a n&atilde;o mais que {0} caracteres.'/> "), min: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior ou igual a {0}.'/> "), minlength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a ao menos {0} caracteres.'/> "), number: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um n&uacute;mero v&aacute;lido.'/> ", range: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor entre {0} e {1}.'/> "), rangelength: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor contendo de {0} a {1} caracteres.'/> "), required: "<img src='/images/alert.png' class='tooltip' title='Este campo é obrigatório.'/> ", requiredIf: "<img src='/images/alert.png' class='tooltip' title='Este campo deve ser preenchido.'/> ", remote: "<img src='/images/alert.png' class='tooltip' title='Por favor, corrija este campo.'/> ", url: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma URL v&aacute;lida.'/> ", time: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a uma hora válida'/> ", code: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um código válido'/> ", price: "<img src='/images/alert.png' class='tooltip' title='Forne&ccedil;a um valor maior que 0'/> ", cidade: "<img src='/images/alert.png' class='tooltip' title='Cidade não cadastrada no sistema.'/> ", pais: "<img src='/images/alert.png' class='tooltip' title='País não 'cadastrado no sistema.'/> ", requiredCep: "<img src='/images/alert.png' class='tooltip' title='CEP e ou Logradouro não cadastrados no sistema.'/> ", transporte: "<img src='/images/alert.png' class='tooltip' title='O valor deste campo deve ser definido.'/> ", positive: "<img src='/images/alert.png' class='tooltip' title='Forneça um valor maior que 0,00.'/> ", cfop: "<img src='/images/alert.png' class='tooltip' title='CFOP inválido'/> ", cfop_transp: "<img src='/images/alert.png' class='tooltip' title='CFOP inválido'/> ", code_ean: "<img src='/images/alert.png' class='tooltip' title='Caso seja preenchido, este campo deve ser um EAN válido e possuir 8, 12,13 ou 14 caracteres.'/> ", number_letter: "<img src='/images/alert.png' class='tooltip' title='Por favor insirá apenas números ou letras, não será permitido caracteres especiais'/> ", cod_ncm: "<img src='/images/alert.png' class='tooltip' title='Caso seja preenchido ,este campo deve possuir 2 ou 8 caracteres.'/> ", max_vr_cupom: jQuery.validator.format("<img src='/images/alert.png' class='tooltip' title='O valor neste campo deve ser inferior a {0}'/> "), autosuggest: "<img src='/images/alert.png' class='tooltip' title='Este campo não possui um valor válido selecionado'/> ", password: "<img src='/images/alert.png' class='tooltip' title='Senha deve conter pelo menos 6 caracteres utilizando letras e números'/> "}); });

Date.monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
Date.abbrMonthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
Date.dayNames = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
jQuery.dpText = { TEXT_PREV_YEAR:'Ano Anterior', TEXT_PREV_MONTH:'Mês Anterior', TEXT_NEXT_YEAR:'Próximo Ano', TEXT_NEXT_MONTH:'Próximo Mês', TEXT_CLOSE:'Fechar', TEXT_CHOOSE_DATE:'Escolha a Data', HEADER_FORMAT:'mmmm yyyy'};
Date.firstDayOfWeek=0;
Date.format = jQuery.i18n._('lang_date_format');

(function ($){
    function get_parent(el){
        return el.parents("div:first").prevAll('p:first').find('input[type=checkbox]');
    }

    function get_children(el){
        return el.parents('p:first').next('div').find('input[type=checkbox]');
    }

    function check_parents(el){
        $p = get_parent(el);
        $p.attr('checked','true');
        if ($p.length > 0) check_parents($p);
    }

    function check_children(el){
        $c = get_children(el);
        if($c.length > 0) {
            $c.each(function(i,el){
                jQuery(el).attr('checked','true');
            });
        }
    }

    function verify_siblings(el){
        $el = jQuery(el);
        $check = false;
        $s = $el.parents("div:first").find('input[type=checkbox]');
        $s.each(function(i,el){
            if(jQuery(this).attr('checked')) $check = true;
        });
        if($check == false)	uncheck_parents($el);
    }

    function uncheck_parents(el){
        $p = get_parent(el);
        $p.removeAttr('checked');
        if($p.length > 0) verify_siblings($p);
    }

    function uncheck_children(el){
        $c = get_children(el);
        if ($c.length > 0) {
            $c.each(function(i, el){
                jQuery(el).removeAttr('checked');
            });
        }
    }

    function check(el){
        check_children(el);
        check_parents(el);
    }

    function uncheck(el){
        uncheck_children(el);
        verify_siblings(el);
    }

    function checkbox_tree(){
        jQuery("input[type=checkbox]").each(function(i, el){
            jQuery(el).click(function(){
                $el = jQuery(this);
                if($el.attr('checked')) check($el);
                else uncheck($el);
            });
        });
    }

    function toggleCheckBox(){
        if('0' == 1){
            $('#indicar_valor_abertura_caixa, #indicar_valor_fechamento_caixa, #realiza_devolucoes, #info_ultimos_caixa, #info_produtos, #trocar_metodo_sangria_suprimento').attr('disabled', 'disabled');
            $('#indicar_valor_abertura_caixa, #indicar_valor_fechamento_caixa, #realiza_devolucoes, #info_ultimos_caixa, #info_produtos, #trocar_metodo_sangria_suprimento').parents('p').hide();

            //Se for igual a são paulo para habilitar as opções do novo webservice
            if('3.7' != '1.6')
                $('#info_produtos').removeAttr('disabled').parents('p').show();

        }else{
            $('#indicar_valor_abertura_caixa, #indicar_valor_fechamento_caixa, #realiza_devolucoes, #info_ultimos_caixa, #info_produtos, #trocar_metodo_sangria_suprimento').parents('p').show();
        }
    }

    /**
     * Trigger executado antes da mensagem de sucesso para perguntar se o usuario deseja recarregar a página com as novas permissões
     */
    function beforeSuccess(btn, text){
        var p = window.parent;
        var d = parent.document;
        if(text.session_updated && text.session_updated!=''){
            parent.Sexy.confirm("Seu perfil de acesso foi alterado com sucesso!<br/><br/>Contanto, é necessário recarregar o sistema para que as novas permissões tenham efeito.<br/><br/><b>ATENÇÃO:</b> Você perderá todas as informações que não estejam salvas.", {
                textBoxBtnOk:'Atualizar Sessão Agora',
                textBoxBtnCancel:'Deixar para depois',
                onComplete: function(val) {
                    if(val){
                        jQuery(d).find("#loader").show();
                        p.location.reload();
                    }
                }
            });
        }
    }

    jQuery(document).ready(function(){
        checkbox_tree();
        toggleCheckBox();

        // veridica se e perfil administrador
        $el = jQuery("#permitir_acesso_total");
        if($el.val()=="1")
            $el.attr('checked', 'true');
        else
            $el.removeAttr('checked');

        // verifica as permissoes do perfil
        jQuery(".liberdades").each(function(i, el){
            $el = jQuery(this);
            $id = $el.val();
            $ele = jQuery($id);
            $ele.attr('checked', 'true');

        });

        $$('#form').addEvent('beforeSuccess', beforeSuccess);
    });
})(jQuery);

