// plagin opredeleniya max visoti i ee ustanovki u odinakovih elementov
jQuery.fn.equalHeight = function() {
	var group = this;
	var tallest = 0;
	jQuery(group).each(function() {
		tallest = Math.max(tallest, jQuery(this).height());
	}).height(tallest);
};

function setCompare (el,wFirst,w) {
	var w = wFirst + w*(jQuery('#'+el).find('tr:first td').length-1);
	jQuery('#'+el).parent().width(w);		
	var h = parseFloat(jQuery('#'+el).height()) + parseFloat(jQuery('#'+el).parent().css('padding-bottom'));
	jQuery('#'+el).parent().parent().height(h+40);
};

function setTabs () {
	if (jQuery('.tabs-box').length) {
		jQuery('.tabs-box').tabs({ fx: { height: 'toggle', opacity: 'toggle' } });
	};
};


function reloadCart() {
  $.get("/ajax_cart/", {ajax: 1 }, function(data){
    var $cart = $('#shopcart').html(data);
    
    if ($.trim(data).length)
      $cart.slideDown("fast");
    else
      $cart.hide();
  });
}

jQuery(document).ready(function() {
  
/* Wrap Horisontal Menu with Divs*/
if ( $('.menu_hasSlash').length > 0)  {
  $('#header .navigation li a').contents().wrap("<div class='r_slash' />").wrap("<div class='l_slash' />");
}
  
/* BxSlider. If SuppaText need */
    if(jQuery().bxSlider != undefined) {
$('.visual .suppa_text').css('bottom', '-500px');
  $('.visual .slides.both').bxSlider({
  mode: 'fade',
  captions: true,
    pager: true,
    slideWidth: 960,
    pagerSelector: '.pager_slide',
    nextSelector: '.pager_next',
    prevSelector: '.pager_prev',
    prevText: '',
    nextText: '',
    auto: true,
    pause: 5000,
    onSliderLoad: function() {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 800)
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 300).stop(false, false)
      $('.visual .suppa_text').css('bottom', '-500px');
    },
    onSlideBefore: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '-500px'
      }, 600)
    }
});
  
  $('.visual .slides.pager').bxSlider({
  mode: 'fade',
  captions: false,
    pager: true,
    slideWidth: 960,
    pagerSelector: '.pager_slide',
    nextSelector: '.pager_next',
    prevSelector: '.pager_prev',
    prevText: '',
    nextText: '',
    auto: true,
    pause: 5000,
    onSliderLoad: function() {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 800)
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 300).stop(false, false)
      $('.visual .suppa_text').css('bottom', '-500px');
    },
    onSlideBefore: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '-500px'
      }, 600)
    }
});
  
  $('.visual .slides.captions').bxSlider({
  mode: 'fade',
  captions: true,
    pager: false,
    slideWidth: 960,
    pagerSelector: '.pager_slide',
    nextSelector: '.pager_next',
    prevSelector: '.pager_prev',
    prevText: '',
    nextText: '',
    auto: true,
    pause: 5000,
    onSliderLoad: function() {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 800)
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '0px'
      }, 300).stop(false, false)
      $('.visual .suppa_text').css('bottom', '-500px');
    },
    onSlideBefore: function($slideElement, oldIndex, newIndex) {
      $('.visual .suppa_text').animate({
        'bottom': '-500px'
      }, 600)
    }
});
}
/* BxSlider END */	
	
    jQuery(window).load(function() {
    if (jQuery('#slider').length) {
    jQuery('#slider').nivoSlider({
        effect:'random', // Specify sets like: 'fold,fade,sliceDown'
        slices:15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed:500, // Slide transition speed
        pauseTime:3000, // How long each slide will show
        startSlide:0, // Set starting Slide (0 index)
        directionNav:false, // Next & Prev navigation
        directionNavHide:true, // Only show on hover
        controlNav:true, // 1,2,3... navigation
        controlNavThumbs:false, // Use thumbnails for Control Nav
        controlNavThumbsFromRel:false, // Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', // Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
        keyboardNav:true, // Use left & right arrows
        pauseOnHover:true, // Stop animation while hovering
        manualAdvance:false, // Force manual transitions
        captionOpacity:0.8, // Universal caption opacity
        prevText: 'Prev', // Prev directionNav text
        nextText: 'Next', // Next directionNav text
        beforeChange: function(){}, // Triggers before a slide transition
        afterChange: function(){}, // Triggers after a slide transition
        slideshowEnd: function(){}, // Triggers after all slides have been shown
        lastSlide: function(){}, // Triggers when last slide is shown
        afterLoad: function(){} // Triggers when slider has loaded
		});
    }
	});

	jQuery('.top-menu li a').addClass('font');
	jQuery('.top-menu li li a').removeClass('font');

	navigation();
	setTabs();

    // Hover table
	jQuery('table.hover-table tr').bind('mouseenter',function(){
		jQuery(this).addClass('hover');
	}).bind('mouseleave',function(){
		jQuery(this).removeClass('hover');
	});
	
	if (jQuery('a[rel=img-popup]').length) {
		jQuery("a[rel=img-popup]").fancybox({
			'transitionIn'		: 'elastic',
			'transitionOut'		: 'elastic'
		});
	};	
	
	if (jQuery('#datepicker').length) {
		jQuery.datepicker.setDefaults(jQuery.datepicker.regional['']);
		jQuery('#datepicker').datepicker( $.datepicker.regional['ru']);
	};
	
	if (jQuery('.qty-box').length) {

    function checkIcRedirect(data) {
        if(data.url){
            window.location = data["url"];
        }
    };

    function changeQty(btn, delta) {
        var $parent = $(btn).parent().parent();
				var $control = $parent.find('input[name=qty]');

				var qty = parseInt($control.val()) || 0;
				var max_qty = parseInt($parent.find('input[name=max_qty]').val()) || 100000;
        var min_qty = parseInt($parent.find('input[name=min_qty]').val()) || 1;
        
        qty += delta;
        if (qty > max_qty)
          qty = max_qty
        else if (qty < min_qty)
          qty = 0;
                          
				$control.val(qty);

				if (qty==0 && !$parent.hasClass('not-hide')) {
					$parent.hide(200).parent().find('.btn-order').addClass('no-display').parent().find('.add-to-cart').removeClass('no-display');
				}

        var stuff_id = $parent.parent().find('.good_id').text();
        
        // this will prevent to send multiple requests per many clicks
        if (window.qtyTimer)
          window.clearTimeout(window.qtyTimer);
          
        window.qtyTimer = window.setTimeout(function(){
          var icqueryString = $('.ic_params_form').formSerialize();
          icqueryString = icqueryString + "&stuff_id="+ stuff_id + "&qty="+qty;
          $.get("/ajax_add_to_cart/?"+ icqueryString, function(data){
              checkIcRedirect(data)
              reloadCart();
          });
        }, 300)
    }
     
		jQuery('.qty-box .btn-up').click(function(){
      changeQty(this, 1);
      return false;
    }); 
		
		jQuery('.qty-box .btn-down').click(function(){
      changeQty(this, -1);
      return false;
		})
		
    jQuery('.add-to-cart').click(function(){
      var val = parseInt(jQuery(this).parent().find('.qty-box input[name=qty]').val())+1;
      var min_val = parseInt(jQuery(this).parent().find('.qty-box input[name=min_qty]').val());
      if (val < min_val)
        val = min_val;
             
      jQuery(this).parent().find('.f-left').show(200).parent().find('.qty-box input[name=qty]').val(val);
      jQuery(this).addClass('no-display').parent().find('.btn-order').removeClass('no-display');
  
      var stuff_id = (jQuery(this).parent().find('.good_id').html());
      var icqueryString = $('.ic_params_form').formSerialize();
      icqueryString = icqueryString + "&stuff_id="+ stuff_id;
      $.get("/ajax_add_to_cart/?"+ icqueryString, function(data){
          checkIcRedirect(data)
          reloadCart();
      });
		});		
	
	};
	
	if (jQuery('.one-product-box').length) {
		jQuery('.one-product-box').each(function() {
			if (!jQuery(this).find('.images-box').length) {
				jQuery(this).find('.box-filter').css('margin-left', 0);
			};
		});
	};
	
		
	if (jQuery('.list-img-thumb').length) {		
		jQuery('.left_side .list-img-thumb').each(function() {
			var i=1;			
			var wBox = jQuery(this).width();
			var wItem = jQuery(this).find('.item').outerWidth();
			var col = Math.round(wBox/wItem);
			jQuery(this).find('.item').each(function() {
				if (i==col) {
					jQuery(this).addClass('lastinline');
					i=0;
				};
				i++;
			});
		});
	};
	
	if (jQuery('.img-box').length) {		
		jQuery('.img-box img').each(function () {
			jQuery('.img-box img').load(function () {
				var hBox = jQuery(this).parent().height();	
				var hImg = jQuery(this).height();
				jQuery(this).css('padding-top', (hBox-hImg)/2);
			});
		});	
		
		jQuery('.img-box img').each(function() {					
			var hBox = jQuery(this).parent().height();	
			var hImg = jQuery(this).height();
			if (hImg>10) {
				jQuery(this).css('padding-top', (hBox-hImg)/2);		
			};
		});
	};	
	
	if (jQuery('#header h1.logo').length) {
		jQuery('#header h1.logo img').load(function () {
			hLogo = jQuery(this).height();		
			hText = jQuery('#header .text').height();
			if ((hText-hLogo)<0) {
				jQuery('#header h1.logo').css('top', -(hLogo-hText)/2);
			} else {
				jQuery('#header h1.logo').css('top', (hText-hLogo)/2);
			};
		});	
		jQuery('#header h1.logo img').each(function () {
			hLogo = jQuery(this).height();		
			hText = jQuery('#header .text').height();
			if ((hText-hLogo)<0) {
				jQuery('#header h1.logo').css('top', -(hLogo-hText)/2);
			} else {
				jQuery('#header h1.logo').css('top', (hText-hLogo)/2);
			};
		});	
	};

    //Goods compare
    jQuery('.add_to_compare').click(
		function(){

            var stuff_id = jQuery(this).parent().parent().find('.good_id').html();
            $.get("/ajax_add_compare/", {gid:stuff_id,act:"add"},
            function(data){
//               alert('Товар добавлен в сравнение');

            });
            jQuery(this).parent().addClass('no-display');
            jQuery(this).parent().parent().find(".compare_added").removeClass('no-display');


			return false;
		}
	);

    jQuery('.remove_from_compare').click(
		function(){

            var stuff_id = jQuery(this).parent().parent().find('.good_id').html();
            $.get("/ajax_add_compare/", {gid:stuff_id,act:"remove"},
            function(data){
//               alert('Товар убран из сравнения');
            });
            jQuery(this).parent().addClass('no-display');
            jQuery(this).parent().parent().find(".compare_removed").removeClass('no-display');
			return false;
		}
	);

    //Leave distinct compares
    jQuery('.distinct_compare').click(
		function(){
            var lent = $('.params').length;
//            var objs_total = parseInt($('#total-objs').html());
            $('.params').each(function(i){
                var objs_total = $(this).children('td').length;
                var eqs = $(this).find('.equal').length;
                if (eqs + 2 == objs_total){
                    $(this).addClass('no-display');
                    $('.all_compare').removeClass('no-display');
                    $('.distinct_compare').addClass('no-display');
                }
            });


			return false;
		}
	);

    jQuery('.all_compare').click(
            function(){
                $('.all_compare').addClass('no-display');
                $('.distinct_compare').removeClass('no-display');
                $('.params').removeClass('no-display');
            return false;
		}
	);

	 // show/hide all
	jQuery('.show-link').click( 
		function(){
			if (!jQuery(this).parent().hasClass('no-hide'))
        jQuery(this).parent().slideToggle(600);
  		jQuery(this).parent().parent().find('.hide-box').stop(true,true).slideToggle(600);
			return false;			
		}
	);
	 
	jQuery('.hide-link').click( 
		function(){
			jQuery(this).parent().parent().parent().find('.hide-box').slideToggle(600);
			jQuery(this).parent().parent().parent().find('.show-link').parent().slideToggle(600);
			return false;			
		}
	);
	
	jQuery('.list-comments .show-link-form').click( 
		function(){

            var id = jQuery(this).parent().find('.span_id').html();

            jQuery(this).parent().parent().parent().parent().find('.hide-box:first').slideToggle(100);

            var form_str = $("#add-link").html();
            var form_str = form_str.replace('<!--ppost-->','<input type="hidden" name="ppost" value="'+id+'">');
            $("#add_comment_"+id).html(form_str);
            close_all(id);
            return false;
		}
	);
	
	jQuery('.link-href').click( 
		function(){
			jQuery(jQuery(this).attr('href')).slideToggle(600);			
			return false;
		}
	);
	
});

function close_all(id){
		$("div[id^='add_comment']").hide();
		$("#add_comment_"+id).show();
}


function ModerPost(id){
	$.get("/shops_admin/ajax_comment_moder/", {postid: id },
	function(data){
		$("#moder_"+ id).html('');
	});
}

function DelPost(id){
	$.get("/shops_admin/ajax_comment_del/", {postid: id },
	function(data){
		$("#comment_div_"+ id).html('');
	});
}

function injectPayRow(id, m_id){
    $('.specrow').remove();
    $('#pay_row_'+id).after('<tr class="specrow"><td colspan="7" id="paydata"></td></tr>');
    $.get("/ajax_payment_data/", {go_id: id, m_id: m_id },
	function(data){
		$('#paydata').html(data);
	});
}

function post_form(){
    var queryString = $('.ic_params_form').formSerialize();
    $.get("/ajax_count_price/", queryString,
        function(data){
            $(".new-price").html(data);
        });
    $.get("/ajax_check_ic_uniq/", queryString,
        function(data){
            if(data != '-1'){
                old_val = $('.qty').val();
                $('.qty').val(data);
                if (old_val == 0 && data != '0'){
                    $('.add-to-cart').parent().find('.f-left').show(200).parent().find('.qty-box input[name=qty]').val(data);
                    $('.add-to-cart').addClass('no-display').parent().find('.btn-order').removeClass('no-display');
                }else if(data == '0' && old_val != 0){
                    $('.add-to-cart').parent().find('.f-left').hide().parent().find('.qty-box input[name=qty]').val(data);
                    $('.add-to-cart').removeClass('no-display').parent().find('.btn-order').addClass('no-display');
                }
            }
        });
}

