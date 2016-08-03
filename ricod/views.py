from django.shortcuts import render
from .models import Catalog


def home(request):
    return render(request, 'ricod/index.html')


def catalog(request):
    context = {
        'categories': Catalog.objects.all()
    }
    return render(request, 'ricod/catalog.html', {'context': context})

