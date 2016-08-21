# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ricod', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GeneralInfo',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('title', models.CharField(null=True, max_length=150, verbose_name='Title', blank=True, help_text='&lt;title&gt;')),
                ('meta_desc', models.CharField(null=True, max_length=250, verbose_name='Description', blank=True, help_text='&lt;meta name="description"&gt;')),
                ('meta_keywords', models.CharField(null=True, max_length=250, verbose_name='Keywords', blank=True, help_text='&lt;meta name="keywords"&gt;')),
                ('brandname', models.CharField(max_length=20, verbose_name='название брэнда')),
                ('phone', models.CharField(max_length=20, verbose_name='телефон')),
                ('header', models.CharField(max_length=128, verbose_name='заголовок')),
            ],
            options={
                'verbose_name': 'Общая информация',
                'verbose_name_plural': 'Общая информация',
            },
        ),
    ]
