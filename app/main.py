from flask import Flask, render_template, request
from langchain_openai import OpenAI, ChatOpenAI
from langchain import PromptTemplate
import os

# import api key from .env
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)


def generate_code(file:str, prompt: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    # model = OpenAI(model="gpt-4o-mini", api_key=api_key)
    llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=api_key,  # if you prefer to pass api key in directly instaed of using env vars
    )
    print("Prompt and file " + file + prompt)
    response = llm.invoke(file + prompt)
    print("Response from chatgpt " + response.content)
    print(response)
    return response.content

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    # user_message = request.form['message']
    # prompt = prompt_template.format(topic=user_message)
    # get the body of the request
    data = request.get_json()
    user_message = data['message']
    print("User message: " + user_message)
    response = ''
    with open('app/templates/output.html', 'r') as f:
        response = f.read()
    print("send-message html code: " + response)
    result = generate_code(response,"i am passing you the html code and i want you to add  " + user_message + " to the html code; if the request does not make sense, return response with: it is not a valid request and do not make a new one but append to the HTML code. Please make sure the html file renders properly and only include HTML, CSS or JS. do not include ```html```")
    with open('app/templates/output.html', 'w') as f:
        f.write(result)
    print("Result: " + result)
    return result

@app.route('/output-html', methods=['GET'])
def output_html():
    with open('app/templates/output.html', 'r') as f:
        response = f.read()
    return response
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
