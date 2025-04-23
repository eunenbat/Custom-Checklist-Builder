# from typing_extensions import Required
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

class ItemFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemFile
        fields = ['file']

class ChecklistItemSerializer(serializers.ModelSerializer):
	file = ItemFileSerializer(many=True, required=False)

	class Meta:
		model = ChecklistItem
		fields = ['id', 'checklist', 'value', 'file']


class ChecklistSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(source = 'user.username')
    class Meta:
        model = Checklist
        # fields = ['id', 'title', 'date']
        # read_only_fields = ['id', 'date']
        fields = ['id', 'user', 'title', 'date', 'items']
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):
            items_data = validated_data.pop('items', [])
            user = self.context['request'].user
            checklist = Checklist.objects.create(user=user, **validated_data)

            for item_data in items_data:
                files_data = item_data.pop('files', [])
                item = ChecklistItem.objects.create(checklist=checklist, **item_data)
                for file_data in files_data:
                    ItemFile.objects.create(item=item, **file_data)

            return checklist


# class ItemFieldSerializer(serializers.Field):
#     class Meta:
#         model = ItemField
#         fields = ['item', 'file']
