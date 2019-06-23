# -*- coding: utf-8 -*-

from flask import Flask
from flask import request
from flask import json, jsonify
from flask import render_template as rt

app = Flask(__name__)

@app.route('/')
def index():
    '''
        Envia um dicionário simples aparenas para exemplificar o envio
    de dados para o front no formato JSON.
    '''
    usr = {
        'id': 1,
        'login': 'teste',
        'senha': 'teste'
    }
    usr = json.dumps(usr)
    #print(usr) # Mostra o dado já convertido.
    return rt('index.html', usr=usr)


@app.route('/usuario', methods=['GET', 'POST'])
def usuario():
    '''
        Quando é feito o envio via AJAX, será tratado como POST, então
    ele receberá os dados, pegará o login e colocará em maiusculo para
    então retornar, afim de exemplificar algum processo.
        Caso seja enviado o formulário, usará o padrão GET, então este
    recuperará os dados e fará o envio para a página de usuário.
    '''
    usr = {
        'id':    request.form.get('id'),
        'login': request.form.get('email'),
        'senha': request.form.get('senha')
    }
    if request.method == 'POST': # Quando usado o botão "enviar ajax"
        if request.is_json:
            #print('is_json:  {}'.format(request.is_json)) # True se receber no formato json.
            usr = request.get_json(force=False)            # Recebe os dados do AJAX no formato JSON.
            #print('get_json: {}'.format(usr))             # Mostra o que recebeu.
            usr['login'] = usr['login'].upper()            # Operação realizada, aqui pode ser substituida por qualquer operação, por exemplo a consulta em um DB ou um update, enfim...
            usuario = jsonify(
                id=usr['id'],
                login=usr['login'],
                senha=usr['senha']) # retorno dos dados modificados.
            return usuario
    return rt('usuario.html', usr=usr)

# Aqui roda a aplicação.
if __name__ == '__main__':
    app.run(host='127.0.0.1')
