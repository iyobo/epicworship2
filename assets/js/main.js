function transition(){}

window.onload = function() {
  var vid = $("#bgvid");
  var whiteout = $("#whiteout_layer");
  
  whiteout.addClass('animated fadeOut');
  
  $("#bgbtn").on("click",function(e){
    $('#bgvid source').attr('src', "assets/bright.mp4");
    whiteout.removeClass('fadeOut');
    whiteout.addClass('fadeIn');
    whiteout.one('animationend', function(){
      vid[0].load();
      whiteout.removeClass('fadeIn');
      whiteout.addClass('fadeOut');
    });
    
  })
};
