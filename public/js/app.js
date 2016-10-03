$(document).ready(function () {
    var socket = io.connect(),
        $messageForm = $('#sendMessage'),
        $message = $('#message'),
        $chat = $("#chat"),
        $users = $("#users"),
        $user = $('#meUser'),
        $setUser = $("#btnUser"),
        scroll = 100;
    
    $setUser.click(function (e) {
       e.preventDefault();
        socket.emit('newUser', $user.val(), function (data) {
            if( data ) {
                $("#chatContent .panel-heading").append(` ${$user.val()}`);
                $("#userContent").hide();
                $("#content").show();
            } else {
                $("#login-error").show();
            }
        });
    });
    
    $messageForm.submit(function (e) {
        e.preventDefault();
        
        if( $message.val().trim() != "" ) 
            socket.emit('sendMessage', $message.val());
        
        $message.val('');
        scroll = scroll + 100;
        $chat.scrollTop(scroll);
    });
    
    socket.on('newMessage', function (data) {
        $chat.append(`<strong>${data.user}</strong> - ${data.msg} <br/>`);
        scroll = scroll + 100;
        $chat.scrollTop(scroll);
    });
    
    socket.on('usernames', function(data) {
       var usernamesString = "";
        for(var username in data) {
            usernamesString += `${username} <br/>`;
        }
        $users.html(usernamesString);
    });
});