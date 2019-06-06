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

#@app.route('/usuario/<int:id>', methods=['GET'])
@app.route('/usuario', methods=['GET', 'POST'])
def usuario():
    req = {}
    if request.method == 'POST':
        if request.is_json:
            print('is_json:  {}'.format(request.is_json))
            req = json.dumps(request.get_json(force=True))
            print('get_json: {}'.format(req))
    return rt('usuario.html', usr=req)
    #return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='127.0.0.1')
