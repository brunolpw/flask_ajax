from flask import Flask
from flask import request
from flask import json, jsonify
from flask import render_template as rt

app = Flask(__name__)

@app.route('/')
def index():
    usr = {
        'id': 1,
        'nome': 'bruno'
    }
    usr = json.dumps(usr)
    print(usr)
    return rt('index.html', usr=usr)


@app.route('/usuario', methods=['GET', 'POST'])
def usuario():
    usr = {}
    if request.method == 'POST':
        if request.is_json:
            #print('is_json:  {}'.format(request.is_json))
            usr = request.get_json(force=False)
            print('get_json: {}'.format(usr))
            usr['nome'] = usr['nome'].upper()
            usuario = jsonify(id=usr['id'], nome=usr['nome'])
            return usuario
    return rt('usuario.html', usr=usr)

if __name__ == '__main__':
    app.run(host='127.0.0.1')
