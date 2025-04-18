from django.db import models

# Create your models here.
class Checklist(models.Model):
    title = models.TextField(blank=False, null=False)
    date = models.DateField(auto_now_add=True)

class ChecklistItem(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name="items")
    label = models.CharField(max_length=255)

class ItemField(models.Model):
    item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="fields")
    value = models.CharField(max_length=255, blank=True)

class ItemFile(models.Model):
    item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to="item_uploads/")