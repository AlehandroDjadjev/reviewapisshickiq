from django.urls import path
from .views import ReviewView, ThankYouView, ReviewsListView, ReviewDetailView

urlpatterns = [
    path('api/reviews/', ReviewView.as_view(), name='review-create'),
    path('api/thank-you/', ThankYouView.as_view(), name='thank-you'),
    path('api/reviews/list/', ReviewsListView.as_view(), name='review-list'),
    path('api/reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
]