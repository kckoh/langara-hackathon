from flask import Flask, render_template, request, make_response
from langchain_openai import OpenAI, ChatOpenAI
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
    response = llm.invoke(file + prompt)
    return response.content

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    user_message = data['message']
    response = ''
    
    file_path = os.path.join(app.root_path, 'templates', 'output.html')
    
    try:
        with open(file_path, 'r') as file:
            response = file.read()
    except FileNotFoundError:
        return "File not found", 404

    prompt = (
        "I am passing you the HTML code and I want you to add "
        + user_message +
        " to the HTML code; Please make sure the HTML file renders properly and only include HTML, CSS, or JS. "
        "Do not include ```html```. Otherwise, if the request does not make sense, return 'INVALID_REQUEST'."
    )
    
    result = generate_code(response, prompt)
    
    with open(file_path, 'w') as f:
        f.write(result)

    with open(file_path, 'r') as file:
        response = file.read()
        if result == response:
            print("successfully updated")
        else:
            print("failed to update")
    # add another chatgpt api request to summarize the code
    
    return f"Here is the updated HTML code from your '{user_message}'"

@app.route('/output-html')
def output_html():
    response = make_response(render_template('output.html'))
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return render_template('output.html')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
