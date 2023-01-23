from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
def read_data(file_name):
    try:
        with open(file_name) as json_file:
            data = json.load(json_file)
    except:
        data = []
    return data

@app.route('/add', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    name = data['name']
    try:
        Mathematics = data['Mathematics']
    except:
         Mathematics = 0
    try:
        Computers = data['Computers']
    except:
        Computers = 0
    try:    
        English = data['English']
    except:
        English = 0
    data_file = read_data("users.json")
    new_id = max([user['id'] for user in data_file]) + 1 if data_file else 1
    data = {"id": new_id, "name": name, "Mathematics": Mathematics,"Computers":Computers,"English":English}
    data_file.append(data)
    write_data("users.json", data_file)
    return jsonify({'message': 'new user created!', 'user': data})
def read_data(file_name):
    try:
        with open(file_name) as json_file:
            data = json.load(json_file)
    except:
        data = []
    return data
def write_data(file_name, data):
    with open(file_name, 'w') as json_file:
        json.dump(data, json_file)

@app.route('/', methods=['GET'])

def read_users():
    # Read the existing users from the json file
    data_file = read_data("users.json")
    return jsonify(data_file)




@app.route('/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    name = data.get('name', None)
    Mathematics = data.get('Mathematics', None)
    Computers = data.get('Computers', None)
    English = data.get('English', None)
    data_file = read_data("users.json")
    for i in range(len(data_file)):
        if data_file[i]['id'] == int(user_id):
            if name:
                data_file[i]['name'] = name
            if Mathematics:
                data_file[i]['Mathematics'] = Mathematics
            if Computers:
                data_file[i]['Computers'] = Computers
            if English:
                data_file[i]['English'] = English
            write_data("users.json", data_file)
            return jsonify({'message': 'user updated!', 'user': data_file[i]})
    return jsonify({'message': 'user not found!'})


@app.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    rows = []
    with open('example.csv', 'r') as f:
        csv_reader = csv.DictReader(f)
        for row in csv_reader:
            if row["username"] != user_id:
                rows.append(row)
    with open('example.csv', 'w', newline='') as f:
        fieldnames = ['username','password']
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        csv_writer.writerows(rows)
    return jsonify({'message': 'user deleted!'})

@app.route('/log',methods=['POST'])
def check_username():
    data = request.get_json()
    username = data['username']
    password = data['password']
    with open('example.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if row[0] == username and row[1] == password:
                return True
    return False

if __name__ == '__main__':
    app.run(debug=True)
