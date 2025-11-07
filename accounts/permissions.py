from rest_framework.permissions import BasePermission


class IsAdminOrOwner(BasePermission):
    """
    Custom permission to allow:
    - Full access to admin users.
    - Limited access (own objects) for normal users.
    """

    def has_object_permission(self, request, view, obj):
        # Always allow if admin
        if getattr(request.user, "is_admin", False):
            return True

        # For regular users, only allow access to their own object
        return hasattr(obj, "owner") and obj.owner == request.user

    def has_permission(self, request, view):
        # Must be authenticated for all actions
        return bool(request.user and request.user.is_authenticated)
