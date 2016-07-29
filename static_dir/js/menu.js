jQuery.fn.navigation = function(options){
    
	// nastroiki po umolchaniyu
	var options = jQuery.extend({
		position  : 'horizontal',
		view      : 'list', //accordion
		color     : '',
		centering : 'yes',
		effect    : 'slide',
		easing    : 'Quad',
		duration  : 400,
		event     : 'hover',
		direction : 'down',
		textAlign : 'left'		
	},options);
	
	return this.each(function() {		
		jQuery(this).addClass('custom-menu').find('.navigation').show();
		jQuery(this).addClass(options.position+'-menu');
		if (options.view != '') jQuery(this).addClass(options.view+'-menu');
		if (options.centering == 'yes') jQuery(this).addClass('centering').css({'width': '100%'});		
		if (options.textAlign != '') jQuery(this).addClass('text-'+options.textAlign);
		if (options.color != '') jQuery(this).addClass(options.color);
		if (options.direction != '')jQuery(this).addClass('dir-'+options.direction);
		jQuery(this).find('ul').each(
			function (){
				jQuery(this).children('li:first').addClass('first');  
				jQuery(this).children('li:last').addClass('last'); 
			}
		);
		jQuery(this).find('li ul').addClass('sub').parent('li').addClass('parent').find('a:first').addClass('parent_link');	
		var w = jQuery(this).find('ul.sub:first').outerWidth();		
		var h = jQuery(this).find('.navigation').outerHeight();	
		var wn = jQuery(this).find('.navigation').outerWidth();
		
		if (options.position == 'vertical') {
			w = jQuery(this).parent().width();
			wn = w;
		}
		
		if (options.view == 'accordion') {
			if (wn>w) w=wn;
			jQuery(this).width(w);
			jQuery(this).find('li.active').each(function() {
				jQuery(this).find('ul:first').show();
			});			
			jQuery(this).find('li.active_tree').each(function() {
				jQuery(this).find('ul').show();
			});			
			jQuery(this).find('li.active_tree_up').each(function() {
				jQuery(this).parents('ul.sub').show();
			});			
		} else {
			jQuery(this).find('ul.sub').css('width', w).find('ul.sub').css({'top': 0, 'left': w, 'width': w});
			if (options.position == 'horizontal'){			
				jQuery(this).find('ul.sub').css('top', h).find('ul.sub').css('top', 0);
				if(options.direction == 'down'){
					jQuery(this).find('ul.sub').css({'top': 'auto','bottom': h}).find('ul.sub').css({'top': 'auto','bottom': 0});
				}
			}		
			if (options.position == 'vertical'){
				jQuery(this).find('ul.sub').css({'left': wn,'top': 0}).find('ul.sub').css({'left': w,'top': 0});
				if(options.direction == 'right') {
					jQuery(this).find('ul.sub').css({'right': wn, 'left': 'auto', 'top':0}).find('ul.sub').css({'right': w, 'left': 'auto', 'top':0});
				}
			}
		}
		
		function posUl(el) {
			var wBody = jQuery('body').width();
			if (jQuery(el).parent('ul').hasClass('sub') && (wBody-jQuery(el).offset().left-jQuery(el).width())<jQuery(el).children('ul.sub').width()) {jQuery(el).children('ul.sub').css({'right': jQuery(el).width(), 'left': 'auto'})};
		}
 		
		if (options.event == 'hover' && options.view == 'list') {
			if (options.effect == 'slide') {
				jQuery(this).find('li').hover(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).slideDown(options.duration);						
					},
					function () {
						jQuery(this).children('ul.sub').stop(true, true).slideUp(options.duration);
						jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
					}
				) 
			}
			if (options.effect == 'fade') {
				jQuery(this).find('li').hover(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');						
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).fadeIn(options.duration);
					},
					function () {
						jQuery(this).children('ul.sub').fadeOut(options.duration);
						jQuery(this).removeClass('hover').stop(true, true).find('a:first').removeClass('hover');
					}
				) 
			}
			if (options.effect == 'show') {
				jQuery(this).find('li').hover(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).show(options.duration); 				
					},
					function () {
						jQuery(this).children('ul.sub').stop(true, true).hide(options.duration);
						jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
					}
				)
			}		
		}
		if (options.event == 'click' && options.view == 'list') {
			if (options.effect == 'slide') {
				jQuery(this).find('li.parent').click(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).slideDown(options.duration);
						return false;
					}					
				);
				jQuery(this).find('li').mouseleave(
					function () {
						jQuery(this).children('ul.sub').stop(true, true).slideUp(options.duration);
						jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
					}
				)				  
			}
			if (options.effect == 'fade') {
				jQuery(this).find('li').click(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).fadeIn(options.duration); 
						return false;
					}					
				);
				jQuery(this).find('li').mouseleave(
					function () {
						jQuery(this).children('ul.sub').stop(true, true).fadeOut(options.duration);
						jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
					}
				)  
			}
			if (options.effect == 'show') {
				jQuery(this).find('li').click(
					function (){	
						jQuery(this).addClass('hover').find('a:first').addClass('hover');
						posUl(this);
						jQuery(this).children('ul.sub').stop(true, true).show(options.duration);
						return false;
					}
				);
				jQuery(this).find('li').mouseleave(
					function () {
						jQuery(this).children('ul.sub').stop(true, true).hide(options.duration);
						jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
					}
				)  
			}	
		}
		if (options.event == 'click' && options.view == 'accordion') {
			jQuery(this).find('li a.parent_link').click(
				function (){
					if (jQuery(this).parent().children('ul.sub:first').css('display') == 'none') {						
						jQuery(this).parent().parent().find('ul.sub').stop(true, true).slideUp(400,'jswing');
						jQuery(this).parent().parent().find('.hover').removeClass('hover');
						jQuery(this).addClass('hover').parent().addClass('hover');
						jQuery(this).parent().children('ul.sub').stop(true, true).slideDown(options.duration,'easeIn'+options.easing);			
					} else {
						jQuery(this).parent().children('ul.sub').stop(true, true).slideUp(options.duration,'easeOut'+options.easing);
						jQuery(this).removeClass('hover').parent().removeClass('hover');
					}
					return false;
				}
			);		
		}
		
		if (options.event == 'hover' && options.view == 'accordion') {
			jQuery(this).find('li').hover(
				function (){	
					jQuery(this).addClass('hover').find('a:first').addClass('hover');
					jQuery(this).children('ul.sub').stop(true, true).slideDown(options.duration,'easeIn'+options.easing); 				
				},
				function () {
					jQuery(this).children('ul.sub').stop(true, true).slideUp(options.duration,'easeOut'+options.easing);
					jQuery(this).removeClass('hover').find('a:first').removeClass('hover');
				}
			);		
		};
		
	});
};
