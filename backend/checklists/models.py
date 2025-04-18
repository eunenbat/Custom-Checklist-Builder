from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Checklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="checklists", null=True)
    title = models.TextField(blank=False, null=False)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

class ChecklistItem(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name="items")
    value = models.CharField(max_length=255, blank=True)

# class ItemField(models.Model):
#     item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="fields")
#     value = models.CharField(max_length=255, blank=True)

class ItemFile(models.Model):
    item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to="item_uploads/")
