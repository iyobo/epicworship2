var scp = require('scp2');


function transition() {
}

window.onload = function () {
    var vid = $("#bgvid");
    var txt = $("#text_layer");

    $("#bgbtn").on("click", function (e) {
        
      
        $('#bgvid source').attr('src', "../bg/video/bright.mp4");

        vid.addClass('animated fadeOut');
        vid.one('animationend', function () {
          
            vid[0].load();
            txt.text('We Worship you Hallelujah Hallejujah');
            
            vid.removeClass('fadeOut');
            vid.addClass('fadeIn');
            
        });

    });
	//
    // var client = new scp({
    //     port: 22,
    //     host: 'git.esific.com',
    //     username: 'root',
    //     //privateKey: '....',
    //     password: 'Techlord12345'
    // });
    //
    // client.download("root@git.esific.com", "/projects/downloaded.txt", function (err) {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Successfully downloaded!");
    //     }
    // });

};
