var pageStack;
(function(window, $) {
	pageStack = [];
	function initialize() {
		$('div[data-role="page"]').each(function(i,v){
			if (i > 0){ $(this).hide(); }
		});

		$('a, area').on('click', function(e){
			e.preventDefault();

			var hrefTarget = $(e.target).attr("href").substring(1);
			var transitionEffect = $(e.target).attr("data-transition");
			showWithTransition(hrefTarget, transitionEffect);
		});

		pageStack.push('home');
		// setTimeout(function(){ showWithTransition('login','sr') }, 1000);
	}

	function showWithTransition(page, transition, back = false){
		// console.log(page, transition);
		// console.log(pageStack);
		
		$('div[data-role="page"]').hide();
		
		if (!back) pageStack.push(page);

		if (page != 'home'){
			$('#goBackButton').show();
		}else{
			$('#goBackButton').hide();
		}

		window.scrollTo(0, 0);
		
		switch(transition){
			case 'sr':
				$('div[data-role="page"][id="'+page+'"]').css({'left':'100%'}).show().animate({left: '0%'}, 200);
			break;
			case 'sl':
				$('div[data-role="page"][id="'+page+'"]').css({'left':'-100%'}).show().animate({left: '0%'}, 200);
			break;
			case 'su':
				$('div[data-role="page"][id="'+page+'"]').css({'top':'100%'}).show().animate({top: '0%'}, 200);
			break;
			case 'sd':
				$('div[data-role="page"][id="'+page+'"]').css({'top':'-100%'}).show().animate({top: '0%'}, 200);
			break;
			case 'fade':
				$('div[data-role="page"][id="'+page+'"]').fadeIn(500);
			break;
			default:
				$('div[data-role="page"][id="'+page+'"]').show();
			break;
		}

		$('div[data-role="page"][id="'+page+'"]').trigger('smht.pageshow');
	}

	function goBack(){
		if (pageStack.length == 1) return;
		pageStack.pop()
		showWithTransition(pageStack[pageStack.length-1], 'sl', true);
	}
	
	window.smht = {};
	window.smht.initialize = initialize;
	window.smht.goTo = showWithTransition;
	window.smht.goBack = goBack;
})(window, jQuery);