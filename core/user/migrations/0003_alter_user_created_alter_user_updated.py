# Generated by Django 5.1.2 on 2024-10-16 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core_user", "0002_user_avatar_user_bio"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="created",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="updated",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
