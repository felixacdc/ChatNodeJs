$(document).ready(function () {
    var socket = io.connect(),
        $messageForm = $('#sendMessage'),
        $message = $('#message'),
        $chat = $("#chat"),
        scroll = 100;
    
    $messageForm.submit(function (e) {
        e.preventDefault();
        
        if( $message.val().trim() != "" ) 
            socket.emit('sendMessage', $message.val());
        
        $message.val('');
        scroll = scroll + 100;
        $chat.scrollTop(scroll);
    });
    
    socket.on('newMessage', function (data) {
        $chat.append(` - ${data.msg} <br/>`);
        scroll = scroll + 100;
        $chat.scrollTop(scroll);
    });
});