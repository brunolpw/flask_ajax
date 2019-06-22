from flask import Flask
from flask import request
from flask import json, jsonify
from flask import render_template as rt

app = Flask(__name__)

@app.route('/')
def index():
    '''
        Envia um dicionario simples aparenas para exemplificar o envio
    de dados para o front no formato JSON.
    '''
    usr = {
        'id': 1,
        'login': 'teste',
        'senha': 'teste'
    }
    usr = json.dumps(usr)
    #print(usr) # Mostra o dado ja convertido.
    return rt('index.html', usr=usr)


@app.route('/usuario', methods=['GET', 'POST'])
def usuario():
    '''
        Quando eh feito o envio via AJAX, sera tratado como POST, entao
    ele ira receber os dados, pegar o login e colocar em maiusculo para
    retornar, afim de exemplificar algum processo.
        Caso seja enviado o formulario, usara o padrao GET, entao este
    ecuperara os dados e fara o envio para a pagina de usuario.
    '''
    usr = {
        'id':    request.form.get('id'),
        'login': request.form.get('email'),
        'senha': request.form.get('senha')
    }
    if request.method == 'POST': # Quando usado o botao "enviar ajax"
        if request.is_json:
            #print('is_json:  {}'.format(request.is_json)) # True se receber no formato json.
            usr = request.get_json(force=False) # Recebe os dados do AJAX no formato JSON.
            print('get_json: {}'.format(usr)) # Mostra o que recebeu.
            usr['login'] = usr['login'].upper() # Operacao realizada, aqui pode ser substituida por qualquer operacao, por exemplo a consulta em um DB ou um update, enfim...
            usuario = jsonify(id=usr['id'], login=usr['login'], senha=usr['senha']) # retorno dos dados modificados.
            return usuario
    return rt('usuario.html', usr=usr)

# Aqui roda a aplicacao.
if __name__ == '__main__':
    app.run(host='127.0.0.1')
