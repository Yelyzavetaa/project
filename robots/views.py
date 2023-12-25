from django.shortcuts import render
from .models import Result, Robot

# Create your views here.

def main(request):
    return render(request, 'main.html', {
        'robots': Robot.objects.all(),
        'results': Result.objects.all(),
    })

