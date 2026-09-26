from django.shortcuts import render
from django.http import JsonResponse
from .models import Mood


def home(request):
    return render(request, "index.html")


def save_mood(request):
    if request.method == "POST":
        mood = request.POST.get("mood")

        if mood:
            Mood.objects.create(mood=mood)
            return JsonResponse({"success": True})

    return JsonResponse({"success": False})