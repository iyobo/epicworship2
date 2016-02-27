

function transition(){}

window.onload = function() {
  var vid = $("#bgvid");
  // var whiteout = $("#whiteout_layer");
  // whiteout.addClass('animated fadeOut');
  
  $("#bgbtn").on("click",function(e){
    $('#bgvid source').attr('src', "bg/video/bright.mp4");
    // whiteout.removeClass('fadeOut');
    vid.addClass('animated fadeOut');
    vid.one('animationend', function(){
      vid[0].load();
      vid.removeClass('fadeOut');
      vid.addClass('fadeIn');
    });
    
  })
};
