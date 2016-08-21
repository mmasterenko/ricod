# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import Goods, Attributes, Catalog, Photos, GeneralInfo


admin.site.site_header = u'Интерфейс администратора'
admin.site.index_title = u'Управление'
admin.site.register(Catalog)
admin.site.register(Photos)


class AttributesInline(admin.TabularInline):
    model = Attributes
    extra = 0
    can_delete = True


class PhotosInline(admin.TabularInline):
    model = Photos
    extra = 0
    can_delete = True


@admin.register(GeneralInfo)
class GeneralInfoAdmin(admin.ModelAdmin):
    actions = None
    fieldsets = [
        (u'Общая информация', {
            'fields': ('brandname', 'header', 'phone'),
            'classes': ('wide',)
        }),
        # (u'для SEO', {
        #     'fields': ('title', 'meta_keywords', 'meta_desc'),
        #     'classes': ('collapse', 'wide')
        # })
    ]


@admin.register(Goods)
class GoodsAdmin(admin.ModelAdmin):
    inlines = [AttributesInline, PhotosInline]
    search_fields = ('name', 'catalog__name')
    list_display = ('name', 'price', 'catalog', 'img')


@admin.register(Attributes)
class AttributesAdmin(admin.ModelAdmin):
    search_fields = ('name', 'value', 'goods__name')
    list_display = ('__str__', 'goods')
