from rest_framework import serializers
from checklists.models import Checklist, ChecklistItem, ItemFile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ChecklistSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(source = 'user.username')
    class Meta:
        model = Checklist
        fields = ['id', 'user', 'title', 'date', 'items']
        extra_kwargs = {'user': {'read_only': True}}

class ChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChecklistItem
        fields = ['id','checklist', 'value']

# class ItemFieldSerializer(serializers.Field):
#     class Meta:
#         model = ItemField
#         fields = ['item', 'file']

class ItemFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemFile
        fields = ['item', 'file']
