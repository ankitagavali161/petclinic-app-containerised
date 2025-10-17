from django.contrib import admin
from .models import Pet, Appointment


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ['name', 'species', 'breed', 'age', 'owner_name', 'created_at']
    list_filter = ['species', 'created_at']
    search_fields = ['name', 'owner_name', 'breed']
    ordering = ['-created_at']


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['pet', 'appointment_date', 'reason', 'status', 'created_at']
    list_filter = ['status', 'appointment_date', 'created_at']
    search_fields = ['pet__name', 'reason']
    ordering = ['appointment_date']
