import boto3
import json
from .chooseword import selectRandomWord

client = boto3.client('bedrock-runtime', region_name='us-west-2')
model_id = "anthropic.claude-v2"
random_word = selectRandomWord()

def askQuestion(question):
    print(random_word)
    body = {
        "prompt": (
            f"Human:Hey so the following word/words {random_word} is the chosen word. "
            "Answer the following question very seriously and formally, with only a yes or no answer. "
            "Anything other than a yes or no or unsure is considered a failure. If unsure respond with unsure. "
            f"Make sure the yes or no or unsure are NOT capitalised. {question}? \n\n"
            "Assistant:"
        ),
        "max_tokens_to_sample": 512,
        "temperature": 0.2,
        "anthropic_version": "bedrock-2023-05-31"
    }


    body_json = json.dumps(body)

    response = client.invoke_model(
        modelId=model_id,
        body=body_json,
        contentType="application/json",
        accept="application/json"
    )

    response_body = json.loads(response['body'].read())
    response = response_body.get("completion").strip()
    print(response)
    return response