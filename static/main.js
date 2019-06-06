function alertar() {
    let usr = document.getElementById('corpo').getAttribute('data-usr');
    let usuario = JSON.parse(usr);
    alert(usuario.nome);
}

function enviar_ajax() {
    //debugger;
    let usr = document.getElementById('corpo').getAttribute('data-usr');
    let usuario = JSON.parse(usr);
    usuario.nome = 'Bruno'
    usuario.id = 42;
    const post_usuario = JSON.stringify(usuario)
    console.log(post_usuario)

    $.ajax({
        url: '/usuario',
        type: 'POST',
        data: {'id': '7', 'nome': 'BRUNO'},
        //data: post_usuario,
        //data: usuario,
        dataType: 'json',
        contentType: 'application/json',
        sucess: function (data){
            console.log('Sucess');
            alert('Sucess');
            //location.href = '/usuario'
        },
        error: function (event, jqxhr, settings, thrownError) {
            console.log('event: ' + JSON.stringify(event));
            //console.log('jqxhr: ' + jqxhr);
            console.log('settings: ' + settings);
            //console.log('thrownError: ' + thrownError);
            //alert('Error');
            //location.href = '/usuario'
        }

      });
}