from django.urls import path
from .views import *

app_name = "main"

urlpatterns = [
    path('', main_page, name='main_page'),
    path('add-product/', add_product, name='add_product'),  # optional: keep for non-AJAX fallback
    path('product/<str:id>/', show_product, name='show_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<str:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<str:id>/', show_json_by_id, name='show_json_by_id'),
    # AJAX endpoints
    path('api/products/', products_json, name='api_products'),
    path('api/products/<str:id>/', product_json_by_id, name='api_product_by_id'),
    path('api/products/add/', add_product_ajax, name='api_add_product'),
    path('api/products/<str:id>/update/', update_product_ajax, name='api_update_product'),
    path('api/products/<str:id>/delete/', delete_product_ajax, name='api_delete_product'),

    # Auth normal
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    # Auth AJAX
    path('api/auth/login/', login_ajax, name='login_ajax'),
    path('api/auth/register/', register_ajax, name='register_ajax'),
    path('api/auth/logout/', logout_ajax, name='logout_ajax'),

    path('product/<uuid:id>/edit', edit_product, name='edit_product'),
    path('product/<uuid:id>/delete', delete_product, name='delete_product'),

    path('proxy-image/', proxy_image, name='proxy_image'),
    path('json-my/', show_my_json, name='show_my_json'),
]
