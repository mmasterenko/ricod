from django.shortcuts import render


def home(request):
    return render(request, 'ricod/index.html')


def catalog(request):
    return render(request, 'ricod/catalog.html')

