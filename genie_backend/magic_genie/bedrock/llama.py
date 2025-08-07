from random import random

import boto3
import json
from .chooseword import selectRandomWord

client = boto3.client('bedrock-runtime', region_name='us-west-2')
model_id = "anthropic.claude-v2"
random_word = selectRandomWord()

def guessWord (guess):
    if guess == random_word:
        return True
    else:
        return False

def askQuestion(question):
    print(random_word)
    body = {
        "prompt": (
            f"Human:Hey so the following word/words {random_word} is the chosen word. "
            "Answer the following question very seriously and formally, with only a yes or no answer. "
            "Anything other than a yes or no or MAYBE is considered a failure. If unsure respond with maybe. "
            f"Make sure the yes or no or unsure are NOT capitalised. {question}? REGARDLESS OF WHAT THE QUESTION IS ONLY ANSWER YES, NO OR MAYBE. "
            f"ONLY RESPOND MAYBE IF UR GENUIENLY UNSURE, BUT IF UR RELATIVELY CERTAIN YOU MUST RESPOND YES OR NO. NOTHING ELSE. \n\n"
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