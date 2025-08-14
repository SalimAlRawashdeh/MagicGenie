import json
import random
import os
from datetime import date
from ..models import DailyWord


def select_random_word():
    today = date.today()

    try:
        daily_word = DailyWord.objects.get(date=today)
        return daily_word.word
    except DailyWord.DoesNotExist:
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../data'))
        file_path = os.path.join(base_dir, 'data.json')

        with open(file_path, 'r') as f:
            data = json.load(f)

        daily_word = random.choice(data)
        DailyWord.objects.create(date=today, word=daily_word)
        return daily_word

