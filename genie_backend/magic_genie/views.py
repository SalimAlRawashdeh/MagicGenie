from django.utils.timezone import now
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json

from .bedrock.chooseword import select_random_word
from .bedrock.llama import askQuestion, guessWord
from .models import NumberCorrect


@csrf_exempt
def ask(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get('text', '')
        response = askQuestion(text)
        return JsonResponse({'response': response})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def guess(request):
    if request.method == "POST":
        data = json.loads(request.body)
        guess = data.get('guess', '')
        correct = guessWord(guess)

        today = now().date()
        obj, created = NumberCorrect.objects.get_or_create(date=today)

        if correct == "true":
            obj.correct += 1
        else:
            obj.wrong += 1

        obj.save()

        return JsonResponse({'response': correct})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def today_stats(request):
    today = now().date()
    obj, created = NumberCorrect.objects.get_or_create(date=today)

    total = obj.correct + obj.wrong
    if total == 0:
        percentage_correct = 0
        percentage_wrong = 0
    else:
        percentage_correct = (obj.correct / total) * 100
        percentage_wrong = (obj.wrong / total) * 100

    return JsonResponse({
        'total': total,
        'percentage_correct': round(percentage_correct, 2),
        'percentage_wrong': round(percentage_wrong , 2),
        'correct': obj.correct,
        'wrong': obj.wrong
    })

def fetch_word (request):
    word = select_random_word()
    return JsonResponse({'word': word})


def home(request):
    return HttpResponse("Welcome to the homepage!")