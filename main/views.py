from django.shortcuts import render

# Create your views here.
def main_page(request):
    context = {
        'npm' : '2406495703',
        'name': 'Muhammad Rafi Ghalib Fideligo',
        'class': 'PBP F',
        'nama_project': 'Mamat Sportshop',
    }
    return render(request, 'index.html', context)