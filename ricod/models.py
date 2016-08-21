# -*- coding: utf-8 -*-

from django.db import models
from utils.storages import MyImgStorage
from utils.model_mixins import SEOFieldsMixin

upload_img = 'images'


def get_img_storage(w=None, h=None, is_crop=None):
    return MyImgStorage(width=w, height=h, img_path=upload_img, is_crop=is_crop)


class GeneralInfo(SEOFieldsMixin, models.Model):

    brandname = models.CharField(u'название брэнда', max_length=20)
    phone = models.CharField(u'телефон', max_length=20)
    header = models.CharField(u'заголовок', max_length=128)

    class Meta:
        verbose_name = u'Общая информация'
        verbose_name_plural = verbose_name


class Catalog(models.Model):
    name = models.CharField(u'название каталога', max_length=90, unique=True)
    # img = models.ImageField(u'картинка', upload_to=upload_img, null=True, blank=True)

    class Meta:
        verbose_name_plural = u'каталог'
        verbose_name = u'каталог'

    def __str__(self):
        return self.name


class Goods(models.Model):
    catalog = models.ForeignKey(Catalog, verbose_name=u'каталог', null=True, blank=True)

    name = models.CharField(u'название', max_length=90)
    price = models.DecimalField(u'цена', max_digits=9, decimal_places=2, null=True, blank=True)
    text = models.TextField(u'описание', null=True, blank=True)
    img = models.ImageField(u'картинка', upload_to=upload_img, null=True, blank=True)

    class Meta:
        verbose_name = u'товар'
        verbose_name_plural = u'товары'
        unique_together = ('name', 'catalog')

    def __str__(self):
        return self.name


class Attributes(models.Model):
    goods = models.ForeignKey(Goods, verbose_name=u'товар', null=True, blank=True)

    name = models.CharField(u'имя', max_length=90)
    value = models.CharField(u'значение', max_length=90, null=True, blank=True)

    class Meta:
        verbose_name = u'аттрибут'
        verbose_name_plural = u'аттрибуты'
        unique_together = ('name', 'goods')

    def __str__(self):
        return u'%s:%s' % (self.name, self.value)


class Photos(models.Model):
    goods = models.ForeignKey(Goods, verbose_name=u'товар', null=True, blank=True)

    img = models.ImageField(u'картинка', upload_to=upload_img, null=True, blank=True)

    class Meta:
        verbose_name = u'изображение'
        verbose_name_plural = u'изображения'
