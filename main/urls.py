from django.urls import path
from .views import main_page

urlpatterns = [
    path('', main_page, name='main-page'),
    path('create-product/', create_product, name='create_product'),
    path('product/<str:id>/', show_product, name='show_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
]