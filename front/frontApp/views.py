from django.shortcuts import render, redirect, get_object_or_404
import requests
from frontApp.forms import ProdutoForm

# Create your views here.

def index(request):
    api = 'http://localhost:3000/produtos'

    response = requests.get(api)

    if response.status_code == 200:
        data = response.json()

    return render(request, 'index.html', {'data': data})

def adicionar(request):
    api = 'http://localhost:3000/produtos'
    form = ProdutoForm()
    if request.method == 'POST':
        form = ProdutoForm(request.POST)
        if form.is_valid():
            form.save()
            produtoAdicionar = form.cleaned_data

            response = requests.post(api, json=produtoAdicionar)

            if response.status_code == 200:
                data = response.json()
                return redirect('/')
   
    return render(request, 'adicionar.html', {'form': form})

def deletar(request, id):
    api = f'http://localhost:3000/produtos/{id}'
    response = requests.delete(api)
    if response.status_code == 200:
        data = response.json()
    return redirect('/')

def atualizar(request, id):
    api = f'http://localhost:3000/produtos/{id}'
    form = ProdutoForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        produtoAtualizar = form.cleaned_data
        response = requests.put(api, json=produtoAtualizar)    
        if response.status_code == 200:
            return redirect('/')
    
    response = requests.get(api)
    if response.status_code == 200:
        data = response.json()
    else:
        data = None
    return render(request, 'atualizar.html', {'form': form, 'id': id, 'data': data})