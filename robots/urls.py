#urls.py

from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('main/', views.main, name='main'),
    path('get_results_data/', views.get_results_data, name='get_results_data'),
] 


    