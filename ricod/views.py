from django.shortcuts import render, get_object_or_404

from .models import Catalog, GeneralInfo


def home(request):
    obj = get_object_or_404(GeneralInfo)
    context = {
        'brandname': obj.brandname,
        'phone': obj.phone,
        'header': obj.header,
    }
    return render(request, 'ricod/index.html', context=context)


def catalog(request):
    obj = get_object_or_404(GeneralInfo)
    gi = {
        'brandname': obj.brandname,
        'phone': obj.phone,
        'header': obj.header,
    }
    context = {
        'categories': Catalog.objects.all()
    }
    context.update(gi)
    return render(request, 'ricod/catalog.html', context=context)
