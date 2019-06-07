function get_usr() {
    let usr = document.getElementById('corpo').getAttribute('data-usr');
    let usuario = JSON.parse(usr);
    return usuario;
}

function alertar() {
    let usuario = get_usr();
    alert(usuario.nome);
}

function enviar_ajax() {
    let usuario = get_usr();
    usuario.nome = 'Bruno';
    usuario.id = 42;
    const post_usuario = JSON.stringify(usuario);
    console.log('post_usuario: ' + post_usuario);

    $.ajax({
        url: '/usuario',
        type: 'POST',
        //data: JSON.stringify(usuario),
        //data: {'id': '7', 'nome': 'BRUNO'},
        data: post_usuario,
        //data: usuario,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        /*done: function(data) {
            debugger;
            alert(data.id);
        },*/
        sucess: function (result, status, request) {
            console.log('Sucess');
            alert('Sucess');
        },
        error: function (event, jqxhr, settings, thrownError) {
            console.log('event: ' + JSON.stringify(event));
            console.log('jqxhr: ' + jqxhr);
            console.log('settings: ' + settings);
            console.log('thrownError: ' + thrownError);
            //alert('Error');
        }
    });
}