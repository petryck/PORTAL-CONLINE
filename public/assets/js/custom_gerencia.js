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
            $("input[type=text][name=telefone_temp]").val(data[0]['telefone_temp'])
            $('#modal_info').modal('show')
            $('.modal-backdrop').remove()  
         
        }
      });


       
})

