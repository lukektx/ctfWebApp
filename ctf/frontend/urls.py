from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('conversion', index),
    path('ciphers', index),
    path('rsa', index),
    path('ciphers/rot13', index),
    path('ciphers/caesar', index),
]