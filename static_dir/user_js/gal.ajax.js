/***
 * Biggo carousel
 */

(function($){

/***
 * @param {Object} options Carousel options
 * @param {Array} options.items 
 */  
$.fn.biggoCarousel = function(options){
 return this.each(function(){
   var $elem = $(this);

   function mycarousel_itemLoadCallback(carousel, state) {
     for (var i = carousel.first; i <= carousel.last; i++) {
       if (carousel.has(i)) {
         continue;
       }
   
       if (i > options.items.length) {
         break;
       }
   
       carousel.add(i, mycarousel_getItemHTML(options.items[i-1]));
     }     
   
     $elem.find('.jcarousel-item img').each(function() {         
       var hBox = $(this).parent().parent().height(); 
       var hImg = $(this).height();
       if (hImg>10) {
         $(this).css('padding-top', (hBox-hImg)/2);   
       };
     });
     
     $elem.find('.jcarousel-item img').load(function () {
       var hBox = $(this).parent().parent().height(); 
       var hImg = $(this).height();
       $(this).css('padding-top', (hBox-hImg)/2);
     }); 
     
   };  
   
   function mycarousel_getItemHTML(item) {
     return '<a href="'+item.url_full+'"><img src="' + item.url + '" alt="' + item.title + '" /></a>';
   };
   
   function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
        $elem.find(".jcarousel-next .jcarousel-control").html(options.items.length-idx);
        $elem.find(".jcarousel-prev .jcarousel-control").html(idx-1);
        $elem.find(".url-title").html('<a href="' + options.items[idx-1].url_full + '">' + options.items[idx-1].title + '</a>');
    }; 
   
   function mycarousel_initCallback(carousel) {
     // Pause autoscrolling if the user moves with the cursor over the clip.
     carousel.container.hover(function() {
       carousel.stopAuto();
     }, function() {
       carousel.startAuto();
     });
     
     // Scroll carousel on mousewheel
     carousel.container.bind('mousewheel', function(event, delta) {
       carousel[ delta > 0 ? 'prev' : 'next']();
       return false;
     });
   
   };
   
   // init
   $elem.jcarousel({
     start: 1,
     scroll:1,
     visible:1,
     wrap: 'both',
     itemFirstInCallback: {
       onBeforeAnimation: mycarousel_itemFirstInCallback
     },
     initCallback: mycarousel_initCallback,
     size: options.items.length,
     itemLoadCallback: {onBeforeAnimation: mycarousel_itemLoadCallback},
     auto: 3,
     easing: 'easeOutBack',
     animation: 600,
     buttonNextHTML: null,
     buttonPrevHTML: null
   });     
 })
}

}(jQuery));
