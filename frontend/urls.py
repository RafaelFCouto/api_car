from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_cars, name='list_cars'),
    path('criar/',views.create_car, name='create_car'),
    path('edit/<int:car_id>/', views.edit_car, name='edit_car'),
    path('excluir/<int:car_id>/', views.delete_car, name='delete_car'),
]