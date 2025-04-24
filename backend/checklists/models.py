from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Checklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="checklists", null=True)
    title = models.TextField(blank=False, null=False)
    date = models.DateField(auto_now_add=True)
    share_uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return self.title

class ChecklistItem(models.Model):
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE, related_name="items")
    value = models.CharField(max_length=255, blank=True)
    is_completed = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):

            for file in self.files.all():
                file.file.delete(save=False)
            super().delete(*args, **kwargs)

# class ItemField(models.Model):
#     item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="fields")
#     value = models.CharField(max_length=255, blank=True)

class ItemFile(models.Model):
    item = models.ForeignKey(ChecklistItem, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to="item_uploads/")
