from random import random

import boto3
import json
from .chooseword import selectRandomWord

client = boto3.client('bedrock-runtime', region_name='us-west-2')
model_id = "anthropic.claude-v2"
random_word = selectRandomWord()

def guessWord (guess):
    if guess == random_word:
        return "true"
    else:
        return "false"

def askQuestion(question):
    print(random_word)
    body = {
        "prompt": (
            f"Human: The chosen word(s) is '{random_word}'.\n"
            "Answer the following question with only one word: 'yes', 'no', or 'maybe' (all lowercase).\n"
            "If you are at least 70% sure the answer is yes, respond 'yes'.\n"
            "If you are at least 70% sure the answer is no, respond 'no'.\n"
            "Only respond 'maybe' if you are truly unsure and less than 70% confident.\n"
            "Do NOT provide any explanation or additional words.\n"
            f"Question: {question}\n"
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