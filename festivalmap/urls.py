from django.urls import path
from festivalmap import views

urlpatterns = [
    path("", views.index),
    path("festival/", views.festival),
    path("festival/search/<id>", views.festival_search_id),
    path("festival/<id>/", views.festival_id),
    path("show/", views.show),
    path("show/search/<id>", views.show_search_id),
    path("show/<id>", views.show_id),
]
