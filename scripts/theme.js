window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js
// =require bootstrap.min.js

// =require flexslider/jquery.flexslider-min.js
// =require fancybox/jquery.fancybox.min
// =require lettering/jquery.lettering.js
// =require easytimer/easytimer.min.js
// =require instagram/lodash.js
// =require instagram/instafeed.min.js


/*================ Sections ================*/
// =require sections/product.js
// =require fancybox/jquery.fancybox.min.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js





/*instagram*/
theme.Instagram = (function() {
  function Instagram(container) {
    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var instafeedEl = this.instagram = $('#Instafeed-' + id);
    var instafeedId = this.instagram = 'Instafeed-' + id;

    var userFeed = new Instafeed({
      get: 'user',
      userId: 'self',
      target: instafeedId,
      accessToken: instafeedEl.attr('data-access-token'),
      sortBy: 'most-recent',
      resolution: 'standard_resolution',
      limit: instafeedEl.attr('data-count'),
      template: '<a href="{{link}}" target="_blank" style="background-image: url({{image}});" class="col-md-2 col-sm-2 col-xs-6 instagram--square '+instafeedEl.attr('data-grid')+'"><span class="icon icon-instagram"></span></a>'
    });
    if( !_.isUndefined( userFeed.options.accessToken) ){
      userFeed.run();
    }
  }
  Instagram.prototype = _.assignIn({}, Instagram.prototype, {});

  return Instagram;
})();

/*end instagram*/


$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);
  sections.register('instagram', theme.Instagram);



  /*begin megamenu*/
  $(".top-header .dropdown").hover(            
    function() {
      $('.dropdown-menu-open', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
      $(this).toggleClass('open');        
    },
    function() {
      $('.dropdown-menu-open', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
      $(this).toggleClass('open');       
    }
    );
  $('.navbar-nav').prepend($('.dropdown .mega-dropdown'));
  /*end*/



  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });



  // Wrap videos in div to force responsive layout.
  slate.rte.wrapTable();
  slate.rte.iframeReset();

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }
});


/*begin flexslider*/
$('.main.flexslider').flexslider({
  animation: "slide"
});
/*end flexslider*/

/*begin lettering*/
$("#main-menu li>a ").lettering('words');
/*end lettering*/

/*begin easytimer*/
var timer = new Timer();
timer.start({countdown: true, startValues: {seconds: 66}});
$('.time-counter .values').html(timer.getTimeValues().toString());
timer.addEventListener('secondsUpdated', function (e) {
  $('.time-counter .values').html('Ends in: ' + timer.getTimeValues().toString());
});
timer.addEventListener('targetAchieved', function (e) {
  $('.time-counter .values').html('Offer ' +  'Inactive!!');
});
/*end easytimer*/

// begin carousel slider
(function() {

  // store the slider in a local variable
  var $window = $(window),
  flexslider = { vars:{} };

  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 1 :
    (window.innerWidth < 900) ? 2 : 4;
  }

  $window.load(function() {

   initflexsliders();   
 }); 

  $('.myTab a').hover(function (e) {
    e.preventDefault();
    $(this).tab('show'); 
    $('.carousel1.flexslider').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 300,
      itemMargin: 0,
      controlNav: false,
      directionNav: true,
      slideshow: true,
    minItems: getGridSize(), // use function to pull in initial value
    maxItems: getGridSize()
  });

  })  


  $(window).load(function(){
   initflexsliders();   
   initflexsliderstwoItems();   

 }); 


  function initflexsliders(){
   $('.carousel2.flexslider').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 300,
    itemMargin: 0,
    controlNav: false,
    directionNav: true,
    slideshow: true,
    minItems: getGridSize(), // use function to pull in initial value
    maxItems: getGridSize()
  });

 }function initflexsliderstwoItems(){
   $('.carousel-two-items.flexslider').flexslider({
    animation: "slide",
    animationLoop: true,
    itemWidth: 300,
    itemMargin: 0,
    controlNav: false,
    directionNav: true,
    slideshow: true,
    minItems: 2, // use function to pull in initial value
    maxItems: 2
  });

 }





  // check grid size on resize event
  $window.resize(function() {
    var gridSize = getGridSize();

    flexslider.vars.minItems = gridSize;
    flexslider.vars.maxItems = gridSize;
  });
}());

// end carousel slider

/*product  flexslider*/


 $(window).load(function(){

//   $('.product_gallery').flexslider({
//   animation: "slide",
//         controlNav: false,
//         animationLoop: false,
//         slideshow: false,
//         controlNav: "thumbnails",
//         sync: "#carousel"
// });

      $('#carousel').flexslider({
       animation: "slide",
       controlNav: false,
       animationLoop: false,
       direction: "vertical",
       slideshow: false,
       itemWidth: 80,
       itemMargin: 5,
       asNavFor: '#product-slider'
     });

     //  $('#carousel-2').flexslider({
     //   animation: "slide",
     //   controlNav: false,
     //   animationLoop: false,
     //   direction: "vertical",
     //   slideshow: false,
     //   itemWidth: 210,
     //   itemMargin: 5,
     //   asNavFor: '#slider'
     // });

      $('#product-slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        controlNav: "thumbnails",
        sync: "#carousel"
      });

    });
/*end flexslider*/

/*begin fancybox*/
$(document).ready(function() {
$().fancybox({
  selector : '[data-fancybox="filter"]:visible',
  thumbs   : {
    autoStart : true
  }
});
});
/*end fancybox*/