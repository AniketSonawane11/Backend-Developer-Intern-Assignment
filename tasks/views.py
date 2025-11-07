from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from accounts.permissions import IsAdminOrOwner


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tasks.
    - Admin users can view and modify all tasks.
    - Regular users can only see and modify their own.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAdminOrOwner]

    def get_queryset(self):
        # Prevents errors during Swagger schema generation
        if getattr(self, "swagger_fake_view", False):
            return Task.objects.none()

        user = self.request.user
        if getattr(user, "is_admin", False):
            return Task.objects.all()
        return Task.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        """Ensure only owner or admin can delete."""
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        self.perform_destroy(instance)
        return Response({"message": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
