/*
    pega os dados passados pelo parãmetro data-* e faz a devida conversão
para JSON, retornando o objeto.
*/
function get_usr() {
    let usr = document.getElementById('corpo').getAttribute('data-usr');
    let usuario = JSON.parse(usr);
    return usuario;
}

/*
    JQuery
    Quando o documento (pagina HTML) estiver pronta, recupera o id e
passa para o input com id "id".
*/
$(document).ready(function() {
    let u = get_usr();
    document.querySelector('#id').value = u.id;
});

/*
    Um teste de alert para ver se o valor esta sendo passado.
*/
function alertar() {
    let usuario = get_usr();
    alert(usuario.login);
}

/*
    Pega os dados inseridos no form e retorno o usuário atualizado no
formato JSON stringfy.
*/
function get_user_form_data_and_return_stringfy() {
    let usuario = get_usr();

    usuario.id    = document.querySelector('#id').value;
    usuario.login = document.querySelector('#email').value;
    usuario.senha = document.querySelector('#senha').value;

    return JSON.stringify(usuario);
}

/*
    Faz a comunicação via AJAX com o backend para tratar os dados de
usuário, ela retorna para a index.html os dados já tratados e exibe 
em um campo span, serve apenas para demonstrar a comunicação dos dados.
*/
function enviar_ajax() {
    const post_usuario = get_user_form_data_and_return_stringfy();

    $.ajax({
        url: '/usuario',
        type: 'POST',
        data: post_usuario,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result, status, request) {
            const u = JSON.parse(JSON.stringify(result));

            document.querySelector('#s_login').innerText = u.login;
            document.querySelector('#corpo').dataset.usr = JSON.stringify(result);
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

/*
    Faz o envio do formulário para o backend, então ele já redireciona,
com os dados atuais, para a próxima página.
*/
function enviar_form(event) {
    let form = document.getElementById('form_login').submit();
}
