from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .models import Pet, Appointment
from .serializers import PetSerializer, AppointmentSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


@api_view(['GET'])
def home(request):
    """Simple home view for PetClinic"""
    data = {
        'message': 'Welcome to PetClinic! 🐾',
        'description': 'A modern pet management system built with Django and Kubernetes',
        'features': [
            'Pet registration and management',
            'Appointment scheduling',
            'Owner information tracking',
            'RESTful API endpoints'
        ],
        'endpoints': {
            'pets': '/api/pets/',
            'appointments': '/api/appointments/',
            'admin': '/admin/'
        }
    }
    return Response(data)


def index(request):
    """Simple HTML view for PetClinic"""
    return render(request, 'pets/index.html', {
        'title': 'PetClinic - Pet Management System',
        'message': 'Welcome to PetClinic! 🐾'
    })
