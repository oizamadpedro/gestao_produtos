from django.db import models

# Create your models here.

class Produtos(models.Model):
    produto = models.CharField(max_length = 100)
    descricao = models.CharField(max_length = 100)
    fornecedor = models.CharField(max_length = 100)
    quantidade = models.CharField(max_length = 100)