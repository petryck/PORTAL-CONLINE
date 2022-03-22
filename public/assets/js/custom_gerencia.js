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
        { "data": "empresa_temp" },
        { "data": "cnpj_temp" },
        { "data": "criacao_temp" }
    ]
} );