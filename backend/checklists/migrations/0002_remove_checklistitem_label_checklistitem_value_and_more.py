# Generated by Django 5.2 on 2025-04-18 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checklists', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checklistitem',
            name='label',
        ),
        migrations.AddField(
            model_name='checklistitem',
            name='value',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.DeleteModel(
            name='ItemField',
        ),
    ]
