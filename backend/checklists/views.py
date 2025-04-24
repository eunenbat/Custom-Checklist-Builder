from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import ChecklistSerializer, ChecklistItemSerializer, ItemFileSerializer, UserSerializer
from .models import Checklist, ChecklistItem, ItemFile
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

# Create your views here.
class ChecklistCreate(generics.ListCreateAPIView):
    serializer_class = ChecklistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Checklist.objects.filter(user=self.request.user)

    # def perform_create(self, serializer):
	   #  serializer.save(user=self.request.user)

class ChecklistDelete(generics.DestroyAPIView):
    serializer_class = ChecklistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Checklist.objects.filter(user=self.request.user)

class ChecklistItemCreateView(generics.CreateAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]


class ChecklistItemDeleteView(generics.DestroyAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'item_id'

class ChecklistItemUpdateView(generics.UpdateAPIView):
    queryset = ChecklistItem.objects.all()
    serializer_class = ChecklistItemSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'item_id'

class ItemFileCreateView(generics.CreateAPIView):
    queryset = ItemFile.objects.all()
    serializer_class = ItemFileSerializer
    permission_classes = [IsAuthenticated]

class ItemFileDeleteView(generics.DestroyAPIView):
    queryset = ItemFile.objects.all()
    serializer_class = ItemFileSerializer


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(["GET"])
@permission_classes([AllowAny])
def SharedChecklistView(request, share_uuid):
    try:
        checklist = Checklist.objects.get(share_uuid=share_uuid)
        serializer = ChecklistSerializer(checklist)
        return Response(serializer.data)
    except Checklist.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["PATCH"])
@permission_classes([AllowAny])
def SharedToggleCompletion(request, item_id):
    item = ChecklistItem.objects.get(id=item_id)
    item.is_completed = request.data.get("is_completed", not item.is_completed)
    item.save()
    return Response({"id": item.id, "is_completed": item.is_completed})
