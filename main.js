window.onload = function() {
  var vid = $("#bgvid");
  var whiteout = $("#whiteout_layer");
  
  whiteout.addClass('animated fadeOut');
  
  // whiteout.fadeOut(800);
  // document.querySelector('#greeting').innerText = 'Hello, World! It is. Blessed be your name when I walk ithru theon fosinso snils sfs slisnl gjslngsi gsn dfjsindfs j' + new Date();
  $("#bgbtn").on("click",function(e){
    $('#bgvid source').attr('src', "assets/bright.mp4");
    
    whiteout.addClass('animated fadeOut');
    whiteout.fadeIn(500,function(){
      vid[0].load();
      whiteout.fadeOut(800,function(){
        
      })
    });
    
    //Transiti
    // vid.fadeOut(500,"linear",function(){
    //   vid[0].load();
    //   vid.fadeIn(800,"linear");  
      
    // });
    
    
  })
};
