from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'pets', views.PetViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.index, name='index'),
    path('appointments/', views.index, name='appointments'),
    path('pets/', views.index, name='pets'),
    path('api-info/', views.home, name='api-info'),
]
