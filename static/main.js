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
    usuario.nome = document.querySelector('#email').value;
    usuario.id = 42;
    const post_usuario = JSON.stringify(usuario);
    console.log('post_usuario: ' + post_usuario);

    $.ajax({
        url: '/usuario',
        type: 'POST',
        data: post_usuario,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result, status, request) {
            //console.log('result: ' + JSON.stringify(result));
            //console.log('status: ' + status);
            //console.log('request: ' + JSON.stringify(request));
            //alert('Sucess');
            const u = JSON.parse(JSON.stringify(result));
            console.log(u);
            let s = document.querySelector('#s_nome').innerText = u.nome;
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

function enviar_form(event) {
    let form = document.getElementById('form_login').submit();
    console.log(form);
}
