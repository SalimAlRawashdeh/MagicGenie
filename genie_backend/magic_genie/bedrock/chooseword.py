import json
import random
import os

def selectRandomWord():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../data'))
    file_path = os.path.join(base_dir, 'data.json')

    with open(file_path, 'r') as f:
        data = json.load(f)

    random_word = random.choice(data)
    print(random_word)

    return random_word