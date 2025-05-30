"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from . import views
from checklists import views
from checklists.views import RegisterUser
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('checklists.urls')), # adds the urls from 'checklists/urls'

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

	path("api-auth/", include("rest_framework.urls")),

    path("api/user/register/", views.RegisterUser.as_view(), name="user-register"),

    path('api/items/', views.ChecklistItemCreateView.as_view(), name='item-create'),
    path('api/items/delete/<int:item_id>/', views.ChecklistItemDeleteView.as_view(), name='item-delete'),
    path('api/items/update/<int:item_id>/', views.ChecklistItemUpdateView.as_view(), name='item-update'),

    path('api/files/', views.ItemFileCreateView.as_view(), name='file-upload'),
    path("api/files/<int:pk>/", views.ItemFileDeleteView.as_view(), name="delete-file"),

	path("api/shared/<uuid:share_uuid>/", views.SharedChecklistView, name="shared-checklist"),
	path("api/shared/items/<int:item_id>/", views.SharedToggleCompletion, name="shared-toggle-completion"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
