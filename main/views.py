from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from main.models import Product
from main.forms import ProductForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import datetime
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.http import require_POST
# from django.views.decorators.csrf import csrf_exempt
from django.utils.html import strip_tags
import json

# Create your views here.
# main page
@login_required(login_url='/login')
def main_page(request):
    featured_list = Product.objects.filter(is_featured=True)

    context = {
        'npm' : '2406495703',
        'name': 'Muhammad Rafi Ghalib Fideligo',
        'class': 'PBP F',
        'nama_project': 'Mamat Sportshop',
        'last_login': request.COOKIES.get('last_login', 'Never'),
        'featured_list': featured_list,
    }
    return render(request, 'main.html', context)

# add product page
def add_product(request):
    form = ProductForm(request.POST or None)

    if form.is_valid() and request.method == "POST":
        product_entry = form.save(commit=False)
        product_entry.user = request.user
        product_entry.save()
        return redirect('main:main_page')
    
    context = {"form" : form}
    return render(request, "add_product.html", context)
        

# show product page
@login_required(login_url='/login')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    
    context = {
        'product': product
    }
    return render(request, "product_details.html", context)

# show data

def show_xml(request):
    product_list = Product.objects.all()
    xml_data = serializers.serialize("xml", product_list)
    return HttpResponse(xml_data, content_type="application/xml")

def show_json(request):
    product_list = Product.objects.all()
    json_data = serializers.serialize("json", product_list)
    return HttpResponse(json_data, content_type="application/json")

def show_xml_by_id(request, id):
   try:
       product_item = Product.objects.filter(pk=id)
       xml_data = serializers.serialize("xml", product_item)
       return HttpResponse(xml_data, content_type="application/xml")
   except Product.DoesNotExist:
       return HttpResponse(status=404)

def show_json_by_id(request, id):
   try:
       product_item = Product.objects.get(pk=id)
       json_data = serializers.serialize("json", [product_item])
       return HttpResponse(json_data, content_type="application/json")
   except Product.DoesNotExist:
       return HttpResponse(status=404)

def register(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your account has been successfully created!")
            return redirect('main:login')
    context = {'form':form}
    return render(request, 'register.html', context)

def login_user(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)

        if form.is_valid():
            user = form.get_user()
            login(request, user)
            response = HttpResponseRedirect(reverse("main:main_page"))
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response
        
    else:
        form = AuthenticationForm(request)
    context = {"form":form}
    return render(request,'login.html', context)
    
def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    form = ProductForm(request.POST or None, instance=product)
    if form.is_valid() and request.method == "POST":
        form.save()
        return redirect('main:main_page')
    
    context = {
        'form': form,
    }
    return render(request, "edit_product.html", context)

def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.delete()
    return HttpResponseRedirect(reverse('main:main_page'))

# AJAX
# Return list products as JSON (friendly structure)
@login_required(login_url='/login')
def products_json(request):
    products = Product.objects.all().order_by('-created_at')
    data = []
    for p in products:
        data.append({
            'id': str(p.id),
            'name': p.name,
            'price': p.price,
            'description': p.description or '',
            'thumbnail': p.thumbnail or '',
            'category': p.category,
            'is_featured': p.is_featured,
            'stock': p.stock,
            'brand': p.brand,
            'rating': p.rating,
            'created_at': p.created_at.isoformat(),
            'user_id': p.user.id if p.user else None,
            'user_username': p.user.username if p.user else None,
        })
    return JsonResponse(data, safe=False)


# Single product JSON
@login_required(login_url='/login')
def product_json_by_id(request, id):
    try:
        p = Product.objects.get(pk=id)
        data = {
            'id': str(p.id),
            'name': p.name,
            'price': p.price,
            'description': p.description or '',
            'thumbnail': p.thumbnail or '',
            'category': p.category,
            'is_featured': p.is_featured,
            'stock': p.stock,
            'brand': p.brand,
            'rating': p.rating,
            'created_at': p.created_at.isoformat(),
            'user_id': p.user.id if p.user else None,
            'user_username': p.user.username if p.user else None,
        }
        return JsonResponse(data)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'Not found'}, status=404)


# Create product via AJAX (expects POST FormData)
@login_required(login_url='/login')
@require_POST
def add_product_ajax(request):
    # we use strip_tags on text fields to reduce XSS risk
    name = strip_tags(request.POST.get('name', ''))
    description = strip_tags(request.POST.get('description', ''))
    thumbnail = request.POST.get('thumbnail', '') or None
    category = request.POST.get('category', 'boots')
    is_featured = request.POST.get('is_featured') in ('on', 'true', '1')
    price = request.POST.get('price') or 0
    stock = request.POST.get('stock') or 0
    brand = strip_tags(request.POST.get('brand', 'Mamatsport'))

    new_product = Product(
        user=request.user,
        name=name,
        price=int(price),
        description=description,
        thumbnail=thumbnail,
        category=category,
        is_featured=is_featured,
        stock=int(stock),
        brand=brand
    )
    new_product.save()
    return JsonResponse({'detail': 'created', 'id': str(new_product.id)}, status=201)


# Update product via AJAX (expects POST FormData)
@login_required(login_url='/login')
@require_POST
def update_product_ajax(request, id):
    try:
        p = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'not found'}, status=404)

    # only owner can update
    if p.user != request.user:
        return JsonResponse({'detail': 'forbidden'}, status=403)

    p.name = strip_tags(request.POST.get('name', p.name))
    p.description = strip_tags(request.POST.get('description', p.description or ''))
    p.thumbnail = request.POST.get('thumbnail') or p.thumbnail
    p.category = request.POST.get('category') or p.category
    p.is_featured = request.POST.get('is_featured') in ('on', 'true', '1')
    p.price = int(request.POST.get('price') or p.price)
    p.stock = int(request.POST.get('stock') or p.stock)
    p.brand = strip_tags(request.POST.get('brand') or p.brand)
    p.save()
    return JsonResponse({'detail': 'updated'})


# Delete product via AJAX (expects POST)
@login_required(login_url='/login')
@require_POST
def delete_product_ajax(request, id):
    try:
        p = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return JsonResponse({'detail': 'not found'}, status=404)

    if p.user != request.user:
        return JsonResponse({'detail': 'forbidden'}, status=403)

    p.delete()
    return JsonResponse({'detail': 'deleted'}, status=200)

@require_POST
def login_ajax(request):
    # pass request as first param (recommended)
    form = AuthenticationForm(request, data=request.POST)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        response = JsonResponse({'detail': 'login success'})
        response.set_cookie('last_login', str(datetime.datetime.now()))
        return response
    else:
        errors = form.errors.get_json_data()
        return JsonResponse({'detail': 'invalid', 'errors': errors}, status=400)


@require_POST
def register_ajax(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        user = form.save()
        return JsonResponse({'detail': 'created'}, status=201)
    else:
        return JsonResponse({'detail': 'invalid', 'errors': form.errors.get_json_data()}, status=400)


@require_POST
@login_required(login_url='/login')
def logout_ajax(request):
    logout(request)
    response = JsonResponse({'detail': 'logged out'})
    response.delete_cookie('last_login')
    return response
