# -*- coding: utf-8 -*-

from .models import GeneralInfo


def general_info(req):
    info = GeneralInfo.objects.first()
    general = {
        'heading': u'Каталог',
        'subheading': u'',
    }
    try:
        general.update({
            'keywords': info.meta_keywords,
            'description': info.meta_desc,
            'title': info.title,
            'brandname': info.brandname,
        })
    except AttributeError:
        pass
    result = {'general_info': info}
    result.update(general)
    return result

