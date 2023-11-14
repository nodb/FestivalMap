from django.urls import path
from festivalmap import views

urlpatterns = [
    path("", views.index),
    path("festival/", views.festival),
    path("festival/<id>/", views.festival_id),
    path("show/", views.show),
    path("show/<id>", views.show_id),
]
