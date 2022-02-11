$(function() {
	'use strict'

console.log(window.innerWidth)




$( window ).resize(function() {
	if(window.innerWidth < 1920){
		$('body').css('zoom', '75%');
		
	}else{
		$('body').css('zoom', '100%');
	}
})


if(!localStorage.getItem("info_users_plataforma") || localStorage.getItem("info_users_plataforma") == null){
	// localStorage.removeItem("token")
	window.location.href = "./login";
	
}else{
	
	const db_local = JSON.parse(localStorage.getItem("info_users_plataforma"))[0];

	$('#nome_usuario_logado').text(db_local['nome'])

$.ajax({
	type: 'GET',
	url: '/query_empresa',
	data: {empresa:db_local['empresa']},
	contentType: 'application/json',
	success: function (data) {
	
		
		localStorage.setItem("info_empresa_plataforma",JSON.stringify(data));
		
		$('#nome_empresa_user').text(data['Nome_Fantasia'])
		
		var firstName = data['Nome_Fantasia']
		var nome = firstName.split(" ")[0];
		var sobrenome = firstName.split(" ")[1];
		// var lastName = $('#lastName').text();
		var intials = nome.charAt(0);
		var profileImage = $('#avatar_empresa').text(intials);
		// $('#avatar_empresa').attr('src', data['img'])
	}
})







// var acessos = db_local.acesso.split(',');

    
// for(var i=0; i<acessos.length; i++) { acessos[i] = +acessos[i]; } 

// // ACESSO GERAL - 1
// // ACESSO ADM - 2
// // ACESSO TI - 3


// acessos.forEach(element => {

//     if(element == 3 && acessos.indexOf(3) > -1){
//         // $('#menu_ti_btn').css('display', 'block');
      
//       }else if(element == 2 && acessos.indexOf(2) > -1){
    
//       }else if(element == 1 && acessos.indexOf(1) > -1){
      
//       }

// });
}


$(document).on('click', '.btn_ver', function(e) {
	e.preventDefault()
    var id = $(this).attr('id');

	$.ajax({
		type: 'GET',
		url: '/info_acessos',
		data: {id:id},
		contentType: 'application/json',
		success: function (data) {


			$(".formulario_usuarios input[name=primeiro_nome]").val(data[0]['nome']);
			$(".formulario_usuarios input[name=email]").val(data[0]['email']);
			$(".formulario_usuarios input[name=funcao]").val(data[0]['funcao']);
			$(".formulario_usuarios input[name=ultimo_nome]").val(data[0]['ultimo_nome']);
			$(".formulario_usuarios input[name=telefone]").val(data[0]['telefone']);

			if(data[0]['acesso_comercial'] == 1){
				$("input[name=comercial]").prop( "checked", true );
			 }else{
				$("input[name=comercial]").prop( "checked", false ); 
			 }

			 if(data[0]['acesso_operacional'] == 1){
				$("input[name=operacional]").prop( "checked", true );
			 }else{
				$("input[name=operacional]").prop( "checked", false ); 
			 }

			 if(data[0]['acesso_documental'] == 1){
				$("input[name=documental]").prop( "checked", true );
			 }else{
				$("input[name=documental]").prop( "checked", false ); 
			 }

			 if(data[0]['acesso_financeiro'] == 1){
				$("input[name=financeiro]").prop( "checked", true );
			 }else{
				$("input[name=financeiro]").prop( "checked", false ); 
			 }

			 if(data[0]['acesso_adminstrativo'] == 1){
				$("input[name=administrador]").prop( "checked", true );
			 }else{
				$("input[name=administrador]").prop( "checked", false ); 
			 }


			 if(data[0]['status'] == 1){
				$("input[name=ativo]").prop( "checked", true );
			 }else{
				$("input[name=ativo]").prop( "checked", false ); 
			 }


			 
			
			 $("#btn_salvar_usuario").data('id', data[0]['idusuarios']);
			$("#btn_desativar_conta").attr('id', data[0]['idusuarios']);
			
			$('#modaldemo6').modal('show');

		}
		})

	
});
	
	// ______________ PAGE LOADING
	$("#global-loader").fadeOut("slow");
	
	// ______________ Card
	const DIV_CARD = 'div.card';
	
	// ______________ Function for remove card
	$(document).on('click', '[data-toggle="card-remove"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});
	
	// ______________ Functions for collapsed card
	$(document).on('click', '[data-toggle="card-collapse"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________ Card full screen
	$(document).on('click', '[data-toggle="card-fullscreen"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________Main-navbar
	if (window.matchMedia('(min-width: 992px)').matches) {
		$('.main-navbar .active').removeClass('show');
		$('.main-header-menu .active').removeClass('show');
	}
	$('.main-header .dropdown > a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	$('.mobile-main-header .dropdown > a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	$('.main-navbar .with-sub').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	$('.dropdown-menu .main-header-arrow').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.dropdown').removeClass('show');
	});
	$('#mainNavShow').on('click', function(e) {
		e.preventDefault();
		$('body').toggleClass('main-navbar-show');
	});
	$('#mainContentLeftShow').on('click touch', function(e) {
		e.preventDefault();
		$('body').addClass('main-content-left-show');
	});
	$('#mainContentLeftHide').on('click touch', function(e) {
		e.preventDefault();
		$('body').removeClass('main-content-left-show');
	});
	$('#mainContentBodyHide').on('click touch', function(e) {
		e.preventDefault();
		$('body').removeClass('main-content-body-show');
	})
	$('body').append('<div class="main-navbar-backdrop"></div>');
	$('.main-navbar-backdrop').on('click touchstart', function() {
		$('body').removeClass('main-navbar-show');
	});

	
	// ______________Dropdown menu
	$(document).on('click touchstart', function(e) {
		e.stopPropagation();
		var dropTarg = $(e.target).closest('.main-header .dropdown').length;
		if (!dropTarg) {
			$('.main-header .dropdown').removeClass('show');
		}
		if (window.matchMedia('(min-width: 992px)').matches) {
			var navTarg = $(e.target).closest('.main-navbar .nav-item').length;
			if (!navTarg) {
				$('.main-navbar .show').removeClass('show');
			}
			var menuTarg = $(e.target).closest('.main-header-menu .nav-item').length;
			if (!menuTarg) {
				$('.main-header-menu .show').removeClass('show');
			}
			if ($(e.target).hasClass('main-menu-sub-mega')) {
				$('.main-header-menu .show').removeClass('show');
			}
		} else {
			if (!$(e.target).closest('#mainMenuShow').length) {
				var hm = $(e.target).closest('.main-header-menu').length;
				if (!hm) {
					$('body').removeClass('main-header-menu-show');
				}
			}
		}
	});
	
	// ______________MainMenuShow
	$('#mainMenuShow').on('click', function(e) {
		e.preventDefault();
		$('body').toggleClass('main-header-menu-show');
	})
	$('.main-header-menu .with-sub').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	})
	$('.main-header-menu-header .close').on('click', function(e) {
		e.preventDefault();
		$('body').removeClass('main-header-menu-show');
	})
	
	// ______________Tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// ______________Toast
	$(".toast").toast();
	
	// ______________Back-top-button
	$(window).on("scroll", function(e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function(e) {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	// ______________Full screen
	$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
		$('html').addClass('fullscreen');
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			$('html').removeClass('fullscreen');
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})
	
	// ______________Cover Image
	$(".cover-image").each(function() {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});
	
	$('.select2').select2({
		placeholder: 'Choose one',
		searchInputPlaceholder: 'Search',
		minimumResultsForSearch: Infinity,
		width: '100%'
	});
	
	// ______________Horizontal-menu Active Class
	function addActiveClass(element) {
		if (current === "") {
		  if (element.attr('href').indexOf("#") !== -1) {
			element.parents('.main-navbar .nav-item').last().removeClass('active');
			if (element.parents('.main-navbar .nav-sub').length) {
			  element.parents('.main-navbar .nav-sub-item').last().removeClass('active');
			}
		  }
		} else {
			if (element.attr('href').indexOf(current) !== -1) {
				element.parents('.main-navbar .nav-item').last().addClass('active');
				if (element.parents('.main-navbar .nav-sub').length) {
				   element.parents('.main-navbar .nav-sub-item').last().addClass('active');
				}
			}
		}
	}
	var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
	$('.main-navbar .nav li a').each(function() {
	  var $this = $(this);
	  addActiveClass($this);
	})
	
	
	// ______________ SWITCHER-toggle ______________//
	
		$(document).on("click", '#myonoffswitch51', function () {    
		if (this.checked) {
			$('body').addClass('icon-style');
			$('body').removeClass('light-leftmenu');
			$('body').removeClass('dark-leftmenu');
			$('body').removeClass('color-leftmenu');
			$('body').removeClass('light-header');
			$('body').removeClass('color-header');
			$('body').removeClass('header-dark');
			localStorage.setItem("icon-style", "True");
		}
		else {
			$('body').removeClass('icon-style');
			localStorage.setItem("icon-style", "false");
		}
	});



	$(document).on("keyup", '.input_search', function () {  
		var texto = $(this).val();
		console.log(texto)

		$(".lista_processos .teteu_e_o_brabo").css("display", "block");

		$(".lista_processos .teteu_e_o_brabo").each(function(){
			if($(this).text().toUpperCase().indexOf(texto.toUpperCase()) < 0)
			   $(this).css("display", "none");
		});
	});

	
	$(document).on("click", '#myonoffswitch52', function () {    
		if (this.checked) {
			$('body').addClass('theme-style');;
			$('body').removeClass('light-leftmenu');
			$('body').removeClass('dark-leftmenu');
			$('body').removeClass('color-leftmenu');
			$('body').removeClass('light-header');
			$('body').removeClass('color-header');
			$('body').removeClass('header-dark');
		}
		else {
			$('body').removeClass('theme-style');
			localStorage.setItem("theme-style", "false");
		}
	});
	
	
	
	$('#background1').on('click', function() {
	  $('body').addClass('color-leftmenu');
	  $('body').removeClass('light-leftmenu');
	  $('body').removeClass('dark-leftmenu');
	  $('body').removeClass('light-header');
	  $('body').removeClass('color-header');
	  $('body').removeClass('header-dark');
	  return false;
	});
	
	$('#background2').on('click', function() {
	  $('body').addClass('light-leftmenu');
	  $('body').removeClass('color-leftmenu');
	  $('body').removeClass('dark-leftmenu');
	  $('body').removeClass('light-header');
	  $('body').removeClass('color-header');
	  $('body').removeClass('header-dark');
	  return false;
	});
	
	
	$('#background3').on('click', function() {
	  $('body').addClass('header-dark');
	  $('body').removeClass('light-horizontal');
	  $('body').removeClass('color-leftmenu');
	  $('body').removeClass('light-leftmenu');
	  $('body').removeClass('color-horizontal');
	  $('body').removeClass('color-header');
	  return false;
	});
	
	$('#background4').on('click', function() {
	  $('body').addClass('color-header');
	  $('body').removeClass('light-horizontal');
	  $('body').removeClass('color-leftmenu');
	  $('body').removeClass('light-leftmenu');
	  $('body').removeClass('color-horizontal');
	  $('body').removeClass('header-dark');
	  return false;
	});
	
	$('#background5').on('click', function() {
	  $('body').addClass('dark-theme');
	   $('body').removeClass('light-theme');
	    $('body').removeClass('light-leftmenu');
	    $('body').removeClass('light-horizontal');
	  $('body').removeClass('color-header');
	  $('body').removeClass('header-dark');
	  $('body').removeClass('color-leftmenu');
	  return false;
	});
	
	$('#background6').on('click', function() {
	   $('body').addClass('light-theme');
	    $('body').removeClass('light-leftmenu');
	    $('body').removeClass('light-horizontal');
	  $('body').removeClass('color-header');
	  $('body').removeClass('header-dark');
	  $('body').removeClass('color-leftmenu');
	  $('body').removeClass('dark-theme');
	  return false;
	});
	
	$('#background7').on('click', function() {
	  $('body').addClass('color-horizontal');
	    $('body').removeClass('light-horizontal');
	    $('body').removeClass('header-dark');
	    $('body').removeClass('color-header');
	  return false;
	});

	$('.select2-search').select2({
		placeholder: 'Escolha um',
		searchInputPlaceholder: 'Pesquisar',
		 width: '100%'
	});
	
	$('#background8').on('click', function() {
	  $('body').addClass('light-horizontal');
	   $('body').removeClass('color-horizontal');
	    $('body').removeClass('header-dark');
	    $('body').removeClass('color-header');
	  return false;
	});
	  
	 
	$("a[data-theme]").click(function() {
		$("head link#theme").attr("href", $(this).data("theme"));
		$(this).toggleClass('active').siblings().removeClass('active');
	});


	$(document).on('click', '.teteu_e_o_brabo', function(e){
		e.preventDefault()
	
		var id_ref = $(this).attr('id');
		
		
		
		  $.ajax({
			url: '/pages_processos',
			data : {ref : id_ref},
			success: function(data) {
			  
			  $('.page_processo').html(data)
			 
			}
		  });
		
		})

$(document).on('click', '#btn_logout', function(e){
			e.preventDefault()
	

			// window.location.href = "./login";


			localStorage.removeItem("info_users_plataforma");

window.location.href = "./login";
		

	})




 

$(document).on('submit', '#form_pesquisa', function(e){
  e.preventDefault()
  $('.btn_filtro').text('Filtrando')
// var opcoes = $(this).serialize();

let result = moment($('input[name=data_de]').val(), 'DD/MM/YYYY', true).isValid();
let result2 = moment($('input[name=data_ate]').val(), 'DD/MM/YYYY', true).isValid();
var data_de = '';
var data_ate = '';


if(result == false || result2 == false){
	data_de = '';
	data_ate = '';
}else{
	data_de = $('input[name=data_de]').val();
	data_ate = $('input[name=data_ate]').val();
	
}




var opcoes = {
  tipo_filtro:$('input[name=tipo_filtro]:checked').val(),
  data_de:data_de,
  data_ate:data_ate,
  referencia:$('select[name=referencia]').val(),
  origem:$('select[name=origem]').val(),
  armador:$('select[name=armador]').val(),
  destino:$('select[name=destino]').val(),
  importador:$('select[name=importador]').val(),
  navio_viagem:$('select[name=navio_viagem]').val(),
  exportador:$('select[name=exportador]').val(),
  status:$('select[name=status]').val(),
  mercadoria:$('select[name=mercadoria]').val(),
  equipamento:$('select[name=equipamento]').val(),
  hbl:$('select[name=hbl]').val(),
  booking:$('select[name=booking]').val(),
}


  $.ajax({
          url : "/headrcargo_filtros",
          type : 'get',
          data : {
            opcoes : opcoes,
            empresa : db_local.empresa
          },
          dataType: "json",
          beforeSend : function(){
          }
      }).done(function(msg){
        
        $('.lista_processos').html('')
        // $('.btn_filtro').html('')
          $('.btn_filtro').html('<i class="fe fe-search"></i>')
        msg.forEach(element => {
          

          if(element.Situacao_Embarque_Codigo == 0){
          situacao = 'Pré-processo';
        }else if(element.Situacao_Embarque_Codigo == 1){
          situacao = 'Ag. embarque';
        }else if(element.Situacao_Embarque_Codigo == 2){
          situacao = 'Embarcado';
        }else if(element.Situacao_Embarque_Codigo == 3){
          situacao = 'Desembarque';
        }else if(element.Situacao_Embarque_Codigo == 4){
          situacao = 'Cancelado';
        }else if(element.Situacao_Embarque_Codigo == 5){
          situacao = 'Pendente';
        }else if(element.Situacao_Embarque_Codigo == 6){
          situacao = 'Autorizado';
        }else if(element.Situacao_Embarque_Codigo == 7){
          situacao = 'Coletado';
        }else if(element.Situacao_Embarque_Codigo == 8){
          situacao = 'Entregue';
        }else if(element.Situacao_Embarque_Codigo == 9){
          situacao = 'Ag. prontidão';
        }else if(element.Situacao_Embarque_Codigo == 10){
          situacao = 'Ag. booking finalizado';
        }else if(element.Situacao_Embarque_Codigo == 11){
          situacao = 'Ag. coleta';
        }else if(element.Situacao_Embarque_Codigo == 12){
          situacao = 'Ag. entrega';
        }else{
          situacao = element.Situacao_Embarque_Codigo;
        }



          var campo = '<a href="#" id="'+element.Numero_Processo+'" class="teteu_e_o_brabo list-group-item list-group-item-action flex-column align-items-start border-0">';
            campo += '<div class="d-flex w-100 justify-content-between">';
            campo += '<h6 class="mb-1 font-weight-bold">'+element.Numero_Processo+'</h6>';
            campo += '<h6 class="mb-0 font-weight-semibold tx-15" data-placement="top" data-toggle="tooltip" title="Data de Abertura">'+element.Data_Abertura+'</h6>';
            campo += '</div>';
            campo += '<div class="d-flex w-100 justify-content-between">';
            campo += '<span class="text-muted">';
            campo += '<i class="ti-alarm-clock  text-danger "></i> '+situacao+'</span>';
            campo += '<span class="text-muted tx-11">'+element.Rota+'</span>';
            campo += '</div>';
            campo += '</a>';

            $('.lista_processos').append(campo)
        });

        $('[data-toggle="tooltip"]').tooltip()







      })

})



  




});
