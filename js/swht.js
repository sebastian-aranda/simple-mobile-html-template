(function(window, $) {
	var pageStack = [];
	function initialize() {
		$('div[data-role="page"]').each(function(i,v){
			if (i > 0){ $(this).hide(); }
		});

		$('a').on('click', function(e){
			e.preventDefault();

			var hrefTarget = $(e.target).attr("href").substring(1);
			var transitionEffect = $(e.target).attr("data-transition");
			showWithTransition(hrefTarget, transitionEffect);
		});

		setTimeout(function(){ showWithTransition('login','sr') }, 3000);
	}

	function showWithTransition(page, transition){
		// console.log(page, transition);
		console.log(pageStack);
		
		$('div[data-role="page"]').hide();
		
		pageStack.push(page);
		
		switch(transition){
			case 'sr':
				$('div[data-role="page"][id="'+page+'"]').css({'left':'100%'}).show().animate({left: '0%'}, 200);
			break;
			case 'sl':
				$('div[data-role="page"][id="'+page+'"]').css({'left':'-100%'}).show().animate({left: '0%'}, 200);
			break;
			case 'fade':
				$('div[data-role="page"][id="'+page+'"]').fadeIn(500);
			break;
			default:
				$('div[data-role="page"][id="'+page+'"]').show();
			break;
		}
	}

	function goBack(){
		if (pageStack.length == 1) return;

		pageStack.pop();
		showWithTransition(pageStack.pop(), 'sl');
	}
	
	window.swht = {};
	window.swht.initialize = initialize;
	window.swht.goTo = showWithTransition;
	window.swht.goBack = goBack;
})(window, jQuery);