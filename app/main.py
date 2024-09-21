from flask import Flask, render_template
from langchain_openai import OpenAI
from langchain import PromptTemplate
import os

app = Flask(__name__)

# Define a prompt template
prompt_template = PromptTemplate(
    input_variables=["topic"],
    template="Tell me a joke about {topic}."
)

# def generate_text(prompt: str) -> str:
#     api_key = os.getenv("OPENAI_API_KEY")
#     model = OpenAI(api_key=api_key)
#     response = model.invoke(prompt)
#     return response

@app.route('/')
def index():
    return render_template('index.html', user='new change')


# @app.route('/generate', methods=['GET'])
# def generate():
#     topic = request.args.get('topic', 'programming')
#     prompt = prompt_template.format(topic=topic)
#     response = generate_text(prompt)
#     return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
