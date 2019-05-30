from rake_nltk import Rake
from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

@app.route('/',methods=["POST","GET"])
def get_words():
    if request.method == 'POST':
        content = request.get_json()
        string = content['question']
        print(string)
        rake = Rake()
        rake.extract_keywords_from_text(string)
        answer = rake.get_ranked_phrases()
        return jsonify(statusCode=200,data=answer)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
