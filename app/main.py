from flask import Flask, render_template, request
from langchain_openai import OpenAI
from langchain import PromptTemplate
import os

# import api key from .env
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

# Define a prompt template
prompt_template = PromptTemplate(
    input_variables=["topic"],
    template="Tell me a joke about {topic}."
)

def generate_code(file:str, prompt: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    model = OpenAI(api_key=api_key)
    response = model.invoke(file + prompt)
    return response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['GET'])
def send_message():
    # user_message = request.form['message']
    # prompt = prompt_template.format(topic=user_message)
    response = ''
    with open('app/templates/output.html', 'r') as f:
        response = f.read()
        print(response)

    result = generate_code(response,"i am passing you the html code and i want you to add an extra blue heading; do not make a new one but append to the file")
    with open('app/templates/output.html', 'w') as f:
        f.write(result)
    return result
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
