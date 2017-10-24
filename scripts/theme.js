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
// =require lettering/jquery.lettering.js


/*================ Sections ================*/
// =require sections/product.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js




$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);

/*begin main menu*/
$('.navbar-nav').prepend($('.dropdown .mega-dropdown'));
/*end main menu*/

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
$('.flexslider').flexslider({
  animation: "slide"
});
/*end flexslider*/

/*begin lettering*/
$("#main-menu li>a ").lettering('words');
  /*end lettering*/



