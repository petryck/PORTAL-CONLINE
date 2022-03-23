$( window ).resize(function() {
	if(window.innerWidth < 1920){
		$('body').css('zoom', '75%');
		
	}else{
		$('body').css('zoom', '100%');
	}
})

$("#global-loader").fadeOut("slow");

// $('#tabela_liberacoes').DataTable({
//     "url": "/permissoes",
//     "type": "GET",
//     "columns": [
//         { "data": "nome_temp" },
//         { "data": "email_temp" },
//         { "data": "empresa_temp" },
//         { "data": "cnpj_temp" },
//         { "data": "criacao_temp" }
//     ]
// });


$('#tabela_liberacoes').DataTable( {
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "permissoes",
        "type": "GET"
    },
    "columns": [
        { "data": "nome_temp" },
        { "data": "email_temp" },
        { "data": "telefone" },
        { "data": "empresa_temp" },
        { "data": "cnpj_temp" },
        { "data": "criacao_temp" },
        { "data": "acao","width": "28px" }
    ]
} );



$(document).on('click', '.abri_infos', function(e){
    id = $(this).attr('id');

    $.ajax({
        url: '/infos_temp',
        data : {id : id},
        success: function(data) {
          
            $("input[type=text][name=cad_nome]").val(data[0]['nome_temp'])
            $("input[type=text][name=cad_email]").val(data[0]['email_temp'])
            $("input[type=text][name=cad_empresa_nome]").val(data[0]['empresa_temp'])
            $("input[type=text][name=cad_cnpj]").val(data[0]['cnpj_temp'])
            $("input[type=text][name=cad_telefone]").val(data[0]['telefone_temp'])
            $("input[type=text][name=senha]").val(data[0]['senha_temp'])
            $("input[type=text][name=id_usuario]").val(data[0]['id_usuarios_temp'])

            // $('select[name=empresa_vinculada]').val(0)


            $('select[name=empresa_vinculada]').val('0').trigger('change');
           
            $('#modal_info').modal('show')
            $('.modal-backdrop').remove()  
         
        }
      });


       
})

  $.ajax({
    url : "/lista_todas_empresas",
    type : 'get',
    dataType: "json",
    beforeSend : function(){
    }
}).done(function(msg){
    
    msg.forEach(element => {
        option = '<option value="'+element.IdPessoa+'" >'+element.Nome+' <span style="opacity:0">'+element.Cpf_Cnpj+' </span> </option>';
    
        $("select[name=empresa_vinculada]").append(option); 

      });
});


$(document).on('click', '.transferir_infos', function(e){
    e.preventDefault()


    var form_cliente = $('#form_tranferencia')



    if($('input[name=cad_comercial]:checked').length != 0){
        if($('select[name=empresa_vinculada]').val() != 0){
            transferir()
        }else{
            alert('Selecione uma empresa para vincular')
        }
    }else if($('input[name=cad_operacional]:checked').length != 0){
        if($('select[name=empresa_vinculada]').val() != 0){
            transferir()
        }else{
            alert('Selecione uma empresa para vincular')
        }
    }else if($('input[name=cad_documental]:checked').length != 0){
        if($('select[name=empresa_vinculada]').val() != 0){
            transferir()
        }else{
            alert('Selecione uma empresa para vincular')
        }
    }else if($('input[name=cad_financeiro]:checked').length != 0){
        if($('select[name=empresa_vinculada]').val() != 0){
            transferir()
        }else{
            alert('Selecione uma empresa para vincular')
        }
    }else if($('input[name=cad_administrador]:checked').length != 0){

        if($('select[name=empresa_vinculada]').val() != 0){
            transferir()
        }else{
            alert('Selecione uma empresa para vincular')
        }
        
    }else{
        alert('você precisa selecionar um nível de acesso')
    }
     
   

    setTimeout(() => {
        $('#tabela_liberacoes').ajax.reload();
        console.log('atualizou')
    }, 10000);


})



function transferir(){
    $('#modal_info').modal('hide')
    var opcoes = {
        comercial:$('input[name=cad_comercial]:checked').length,
        operacional:$('input[name=cad_operacional]:checked').length,
        documental:$('input[name=cad_documental]:checked').length,
        financeiro:$('input[name=cad_financeiro]:checked').length,
        administrador:$('input[name=cad_administrador]:checked').length,
        cad_nome:$('input[name=cad_nome]').val(),
        cad_email:$('input[name=cad_email]').val(),
        empresa_vinculada:$('input[name=empresa_vinculada]').val(),
        cad_telefone:$('input[name=cad_telefone]').val(),
        cad_senha:$('input[name=senha]').val(),
        id_usuario:$('input[name=id_usuario]').val(),
        empresa_vinculada:$('select[name=empresa_vinculada]').val() 
     }
     
    
        $.ajax({
            url : "/transferir_usuario",
            type : 'get',
            data: opcoes,
            dataType: "json",
            beforeSend : function(){
            }
        }).done(function(msg){

            if(msg == 'okay'){

            }else{
                alert(msg)
            }
            console.log(msg)
    
        })
}