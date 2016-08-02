# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attributes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('name', models.CharField(verbose_name='имя', max_length=90)),
                ('value', models.CharField(blank=True, verbose_name='значение', max_length=90, null=True)),
            ],
            options={
                'verbose_name_plural': 'аттрибуты',
                'verbose_name': 'аттрибут',
            },
        ),
        migrations.CreateModel(
            name='Catalog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('name', models.CharField(unique=True, verbose_name='название каталога', max_length=90)),
            ],
            options={
                'verbose_name_plural': 'каталог',
                'verbose_name': 'каталог',
            },
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('name', models.CharField(verbose_name='название', max_length=90)),
                ('price', models.DecimalField(blank=True, max_digits=9, verbose_name='цена', decimal_places=2, null=True)),
                ('text', models.TextField(blank=True, verbose_name='описание', null=True)),
                ('img', models.ImageField(blank=True, verbose_name='картинка', upload_to='images', null=True)),
                ('catalog', models.ForeignKey(blank=True, to='ricod.Catalog', verbose_name='каталог', null=True)),
            ],
            options={
                'verbose_name_plural': 'товары',
                'verbose_name': 'товар',
            },
        ),
        migrations.CreateModel(
            name='Photos',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('img', models.ImageField(blank=True, verbose_name='картинка', upload_to='images', null=True)),
                ('goods', models.ForeignKey(blank=True, to='ricod.Goods', verbose_name='товар', null=True)),
            ],
            options={
                'verbose_name_plural': 'изображения',
                'verbose_name': 'изображение',
            },
        ),
        migrations.AddField(
            model_name='attributes',
            name='goods',
            field=models.ForeignKey(blank=True, to='ricod.Goods', verbose_name='товар', null=True),
        ),
        migrations.AlterUniqueTogether(
            name='goods',
            unique_together=set([('name', 'catalog')]),
        ),
        migrations.AlterUniqueTogether(
            name='attributes',
            unique_together=set([('name', 'goods')]),
        ),
    ]
