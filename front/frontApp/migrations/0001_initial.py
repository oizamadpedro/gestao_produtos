# Generated by Django 4.2.3 on 2023-07-16 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Produtos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('produto', models.CharField(max_length=100)),
                ('descricao', models.CharField(max_length=100)),
                ('fornecedor', models.CharField(max_length=100)),
                ('quantidade', models.CharField(max_length=100)),
            ],
        ),
    ]
