import os
from django.http import HttpResponse
from django.conf import settings


def media(req, path):
    file_name = os.path.join(settings.MEDIA_ROOT, path)
    _, file_ext = os.path.splitext(file_name)

    mime_types = {
        'image/jpeg':       ('.jpg', '.jpeg'),
        'image/png':        ('.png',),
        'application/pdf':  ('.pdf',),
        'text/plain':       ('.txt',),
    }

    content_type = 'application/octet-stream'  # default: binary data
    for mime, ext in mime_types.items():
        if file_ext.lower() in ext:
            content_type = mime
            break

    data = open(file_name, 'rb').read()
    return HttpResponse(data, content_type=content_type)
