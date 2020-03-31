// (function($) {
//   $(function() {
//     $("ul.report-tabs__caption").on("click", "li:not(.active)", function() {
//       $(this)
//         .addClass("active")
//         .siblings()
//         .removeClass("active")
//         .closest("div.report-tabs")
//         .find("div.report-tabs__content")
//         .removeClass("active")
//         .eq($(this).index())
//         .addClass("active");
//     });
//   });
// })(jQuery);

$(document).ready(function(){

   $('select').select2({
        width: '100%',
        minimumResultsForSearch: -1
   });



  $('.carousel').slick({
      dots: false,
      slidesPerRow: 3,
      arrows: true,
      infinity: false,
      rows: 2,
      responsive: [
      {
        breakpoint: 560,
        settings: {
          slidesPerRow: 1,
          rows: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesPerRow: 2,
          rows: 1
        }
      }
    ]
  });

  $('[data-toggle="datepicker"]').datepicker();



  
}); 