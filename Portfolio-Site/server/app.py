from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
allowed_origins = ['http://mykl-y.github.io', 'http://localhost:5173']
CORS(app, supports_credentials=True, resources={r"/*": {"origins": allowed_origins}})
DATABASE = 'resume.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    return conn

@app.cli.command('init-db')
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS resume (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        summary TEXT NOT NULL,
        skills TEXT NOT NULL,
        experience TEXT NOT NULL,
        education TEXT NOT NULL,
        projects TEXT NOT NULL
    )
    ''')
    conn.commit()
    conn.close()
    print('Initialized the database.')

@app.route('/resume', methods=['POST'])
def create_resume():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO resume (name, email, phone, summary, skills, experience, education, projects)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        data['name'],
        data['email'],
        data['phone'],
        data['summary'],
        json.dumps(data['skills']),
        json.dumps(data['experience']),
        json.dumps(data['education']),
        json.dumps(data['projects'])
    ))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Resume created successfully!'}), 201

@app.route('/resume', methods=['GET'])
def get_resumes():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM resume')
    resumes = cursor.fetchall()
    conn.close()
    resume_list = []
    for resume in resumes:
        resume_list.append({
            'id': resume[0],
            'name': resume[1],
            'email': resume[2],
            'phone': resume[3],
            'summary': resume[4],
            'skills': json.loads(resume[5]),
            'experience': json.loads(resume[6]),
            'education': json.loads(resume[7]),
            'projects': json.loads(resume[8])
        })
    return jsonify(resume_list), 200

@app.route('/resume/<int:id>', methods=['GET'])
def get_resume(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM resume WHERE id = ?', (id,))
    resume = cursor.fetchone()
    conn.close()
    if resume:
        return jsonify({
            'id': resume[0],
            'name': resume[1],
            'email': resume[2],
            'phone': resume[3],
            'summary': resume[4],
            'skills': json.loads(resume[5]),
            'experience': json.loads(resume[6]),
            'education': json.loads(resume[7]),
            'projects': json.loads(resume[8])
        }), 200
    else:
        return jsonify({'message': 'Resume not found!'}), 404

@app.route('/resume/<int:id>', methods=['PUT'])
def update_resume(id):
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE resume
    SET name = ?, email = ?, phone = ?, summary = ?, skills = ?, experience = ?, education = ?, projects = ?
    WHERE id = ?
    ''', (
        data['name'],
        data['email'],
        data['phone'],
        data['summary'],
        json.dumps(data['skills']),
        json.dumps(data['experience']),
        json.dumps(data['education']),
        json.dumps(data['projects']),
        id
    ))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Resume updated successfully!'}), 200

@app.route('/resume/<int:id>', methods=['DELETE'])
def delete_resume(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM resume WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Resume deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
