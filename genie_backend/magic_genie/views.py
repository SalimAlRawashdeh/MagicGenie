from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from .bedrock.llama import askQuestion


@csrf_exempt
def ask(request):
    if request.method == "POST":
        data = json.loads(request.body)
        text = data.get('text', '')
        response = askQuestion(text)
        return JsonResponse({'response': response})
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def home(request):
    return HttpResponse("Welcome to the homepage!")