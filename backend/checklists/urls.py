from django.urls import path
from . import views

urlpatterns = [
    path("checklists/", views.ChecklistCreate.as_view(), name="checklist-create"),
    path("checklists/delete/<int:pk>/", views.ChecklistDelete.as_view(), name="checklist-delete"),
]
