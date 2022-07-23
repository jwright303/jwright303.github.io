jQuery.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.x + rect.width) < 0 
             || (rect.y + rect.height) < 0
             || (rect.x > window.innerWidth || rect.y > window.innerHeight)
         );
};

jQuery.expr.filters.onscreen = function(el) {
  var rect = el.getBoundingClientRect();
  //console.log("sliver pos", rect.y)
  return (rect.y >= -window.innerHeight/2);
};

jQuery.expr.filters.scroll_percentage = function(el) {
  var rect = el.getBoundingClientRect();
  return (Math.floor(window.innerHeight / (-rect.y)));
};

var cur_im = $('.slides').children();
var fix_im = $('.fixed');
var im_name = ["Me_Arches.jpg", "Fat_Arch.jpg", "Long_Arch.jpg", "Friends.jpg", "Arches_Pillars.jpg", "Wisconsin_Capitol.jpg"] 
var i = 1;
var stick = true;
var limit = 300
$(window).scroll(function(){
   var pos = cur_im.position();
   //console.log("percent", pos) 
   if (stick && cur_im.first().is(':offscreen')) {
   	//console.log("offscreen")
   	cur_im.css('background-image', "url(./Images/" + im_name[i % im_name.length] + ")")
   	stick = false;
   	console.log("is offscreen");
   	window.scrollTo(0,0); 
   	fix_im.css('background-image', "url(./Images/" + im_name[(i+1) % im_name.length] + ")")
   	//{top: 200, left: 200, position:'absolute'}

   }
   if (stick == false && cur_im.last().is(':onscreen')) {
   	i += 1;
   	stick = true
   	console.log("is onscreen");
   }

   var st = $(this).scrollTop();

   /* avoid unnecessary call to jQuery function */
   if (st <= limit) {
      cur_im.css({ 'opacity' : (1 - st/limit) });
      console.log()
   }
   //cur_im.css('opacity', 1 - percent);   
});