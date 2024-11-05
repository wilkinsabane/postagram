import pytest

from core.fixtures.user import user
from core.fixtures.post import post
from core.comment.models import Comment


@pytest.mark.django_db
def test_comment_create(user, post):
    comment = Comment.objects.create(author=user, body="Test Comment Body", post=post)
    assert comment.body == "Test Comment Body"
    assert comment.author == user
    assert comment.post == post
