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
// =require currencies/currencies.js
// =require currencies/jquery.currencies.min.js
// =require currencies/jquery-customselect.js


/*================ Sections ================*/
// =require sections/product.js
// =require fancybox/jquery.fancybox.min.js
// =require cloudzoom/cloudzoom.js

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



  /*custom select currencies*/
  var showText = false;
  showText = true;
  $('#currencies').customSelect({
    showText: showText
  });
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

$( '.template-collection .dropdown-submenu .dropdown-menu' ).hover(function() {
    $('.dropdown-submenu').addClass("current");
});




$('.template-collection #nav-second').affix({ offset: { top: 720 } });
$(".template-collection").scrollspy({target: "#nav-second"});

// hidden li in collection 
$(".template-collection .subnav li:contains('popular')").remove();
 


  $(window).load(function(){
   initflexsliders();   
   initflexsliderstwoItems();   

 }); 


/*begin subcollection sort*/
Shopify.queryParams = {};
if (location.search.length) {
  for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
      Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}
jQuery('#sort-by')
  .val('{{ collection.sort_by | default: collection.default_sort_by | escape }}')
  .bind('change', function() {
    Shopify.queryParams.sort_by = jQuery(this).val();
    location.search = jQuery.param(Shopify.queryParams).replace(/\+/g, '%20');
  });

/*end subcollection sort*/

/*begin  */
  $('.item-swatch li label').hover(function(){
            var newImage = $(this).parent().find('.hidden a').attr('href');
            $(this).parents('.product-item').find('.product-grid-image img').attr({ src: newImage }); 
            return false;
          });
/*end */


/*begin subcollection grid/list view */
  function replaceUrlParam(url, paramName, paramValue) {
    var pattern = new RegExp('('+paramName+'=).*?(&|$)'),
        newUrl = url.replace(pattern,'$1' + paramValue + '$2');
    if ( newUrl == url ) {
      newUrl = newUrl + (newUrl.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
    }
    return newUrl;
  }

  $(function() {
    $('.change-view').on('click', function() {
      var view = $(this).data('view'),
          url = document.URL,
          hasParams = url.indexOf('?') > -1;

      if (hasParams) {
        window.location = replaceUrlParam(url, 'view', view);
      } else {
        window.location = url + '?view=' + view;
      }
    });
  });
/*end subcollection grid/list view */
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
$('#product-slider').flexslider({
  animation: "fade",
  controlNav: false,
  animationLoop: false,
  pauseOnHover: true,
  slideshow: false,
  touch: "false",
  controlNav: "thumbnails",
  start: function(slider){
$('.loading-gif').remove();;
}
      });
/*end flexslider*/

/*begin fancybox*/
$().fancybox({
  selector : '[data-fancybox="filter"]:visible',
  thumbs   : {
    autoStart : true
  }
});
/*end fancybox*/

/*begin product zoom image*/ 
CloudZoom.quickStart();
/*end product zoom image*/ 


<<<<<<< HEAD
/*swatches*/
jQuery(function() {
=======








 /*swatches*/
 jQuery(function() {
>>>>>>> andre
  jQuery('.swatch :radio').change(function() {
    var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
    var optionValue = jQuery(this).val();
    jQuery(this)
    .closest('form')
    .find('.single-option-selector')
    .eq(optionIndex)
    .val(optionValue)
    .trigger('change');
  });
});

$('.single-option-selector').trigger('change');
/*end swatches*/

// Find the current product ID
var currentProductID = $('#AddToCartForm').attr("data-productid"),
isStickerProduct =  currentProductID;

$('.product-details__qty-adjust').on('click', function(e) {
  e.preventDefault();
  var currentValue = parseFloat($('.product-details__qty-input').val()),
  qtyInput = $('.product-details__qty-input');

  if($(this).hasClass('product-details__qty-adjust--minus')) {
    if((currentValue - 1) == 0){
      return;
    } else {
      qtyInput.val(currentValue -1);
    }
  }
  else if($(this).hasClass('product-details__qty-adjust--plus')) {
    if(isStickerProduct && (currentValue >= 2)){
      // Limit stickers input to 2 maximum
      console.log('Stickers input limited on adjust button');
      qtyInput.val(2);
    } else {
      qtyInput.val(currentValue + 1);
    }
  }
  qtyInput.trigger('change');
});


