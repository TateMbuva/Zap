$(window).scroll(function(){
	if($(document).scrollTop() > 50){
		$('nav').addClass('scrolled');
		$('.zap-link').addClass('zap-nav-link');
		$('.navbar-brand').removeClass('zap-brand');
		$('.navbar-brand').addClass('zap-brand-color');


	}else {
		$('nav').removeClass('scrolled');
		$('.zap-link').removeClass('zap-nav-link');
		$('.navbar-brand').removeClass('zap-brand-color');
		$('.navbar-brand').addClass('zap-brand');
	}
});


