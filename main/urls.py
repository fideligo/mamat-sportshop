from django.urls import path
from .views import *

app_name = "main"

urlpatterns = [
    path('', main_page, name='main_page'),
    path('add-product/', add_product, name='add_product'),
    path('product/<str:id>/', show_product, name='show_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<str:product_id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<str:product_id>/', show_json_by_id, name='show_json_by_id'),
]