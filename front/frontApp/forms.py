from django import forms
from frontApp.models import Produtos

class ProdutoForm(forms.ModelForm):
    class Meta:
        model = Produtos
        fields = "__all__"

        widgets = {
            'produto': forms.TextInput(),
            'descricao': forms.TextInput(),
            'fornecedor': forms.TextInput(),
            'quantidade': forms.TextInput()
        }