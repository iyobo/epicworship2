

function transition(){}

window.onload = function() {
  var vid = $("#bgvid");
  
  $("#bgbtn").on("click",function(e){
    $('#bgvid source').attr('src', "bg/video/bright.mp4");

    vid.addClass('animated fadeOut');
    vid.one('animationend', function(){
      vid[0].load();
      vid.removeClass('fadeOut');
      vid.addClass('fadeIn');
    });
    
  })
};
