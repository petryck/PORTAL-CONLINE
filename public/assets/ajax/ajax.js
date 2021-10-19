$(document).on("click", ".main-sidebar .nav li a, .mobile-main-header a", function (e) {
	
	e.preventDefault(); // Sidemenu and horizontal menu class
	'use strict';
	var page = $(this).attr("href");

	if ($(this).attr("target") == "_self") { window.location.href = page; return true };
	if ($(this).attr("target") == "_blank") window.open(page, "_blank");

	if (page == "javascript: void(0);") return false;

	window.location.hash = page;

	$(".main-sidebar .nav li, .main-sidebar .nav li a").removeClass("active");

	$(".main-sidebar .nav a").each(function () {
		var pageUrl = window.location.hash.substr(1);
		if ($(this).attr("href") == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active");
			$(this).parent().parent().prev().addClass("active");
			$(this).parent().parent().parent().addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active");
		}
	});

	$(".main-navbar .nav a").removeClass("active");
	$(".main-navbar .nav li").removeClass("active");
	$(".main-navbar .nav li a").each(function () {
		var pageUrl = window.location.hash.substr(1);
		if ($(this).attr('href') == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active");
			$(this).parent().parent().prev().addClass("active");
			$(this).parent().parent().parent().addClass("active");
			$(this).parent().parent().parent().parent().parent().addClass("active");
		}
	});


	if (page == "javascript: void(0);") return false;
	call_ajax_page(page+'.html');
});

function call_ajax_page(page) {

	var title = page.replace(".html", "");
	var title1 = title.replace("-", " ");
	
	document.title = title1.charAt(0).toUpperCase() + title1.slice(1) + " | ConLine Serviços de Logística";

	$.ajax({
		url: "ltr/" + page,
		cache: false,
		dataType: "html",
		type: "GET",
		async: true,
		success: function (data) {
			$("#content").empty();
			$("#content").html(data);
			// window.location.hash = page;
			$(window).scrollTop(0);
		}
	});

}

$(document).ready(function () {
	// var path = window.location.hash.substr(1);
	// if (path == "home") {
	// 	call_ajax_page("home"+'.html');
	// } else {
	// 	call_ajax_page("home"+'.html');
	// }


	call_ajax_page("estatisticas.html");


});