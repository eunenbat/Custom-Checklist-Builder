from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import ChecklistSerializer, ChecklistItemSerializer, ItemFileSerializer, UserSerializer
from .models import Checklist, ChecklistItem, ItemFile
from rest_framework import generics

# Create your views here.
class ChecklistCreate(generics.ListCreateAPIView):
    serializer_class = ChecklistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Checklist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
	    serializer.save(user=self.request.user)

class ChecklistDelete(generics.DestroyAPIView):
    serializer_class = ChecklistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Checklist.objects.filter(user=self.request.user)

class ChecklistItemCreateView(generics.CreateAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]

class ItemFileCreateView(generics.CreateAPIView):
    queryset = ItemFile.objects.all()
    serializer_class = ItemFileSerializer
    permission_classes = [IsAuthenticated]

class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
