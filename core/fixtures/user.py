import pytest
from core.user.models import User

data_user = {
    "username": "test_user",
    "email": "test@test.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "test_password"
}


@pytest.fixture
def user(db) -> User:
    user = User.objects.create(**data_user)
    user.set_password(data_user["password"])
    user.save()
    return user
