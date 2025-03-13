from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from .models import Review
from .serializer import ReviewSerializer

class ReviewView(APIView):
    permission_classes = [AllowAny]  # Allow all requests

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new review
            return Response({"message": "Review submitted successfully!", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ThankYouView(APIView):
    def get(self, request):
        return Response({"message": "Thank you for your submission!"}, status=200)
    
class ReviewDetailView(RetrieveAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]  # Allow all users to view review details
    
class ReviewsListView(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]  # Allow all users to view reviews
    


    
