# Generated by Django 5.1.2 on 2024-10-30 08:48

import core.user.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core_user", "0005_user_comments_liked"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="avatar",
            field=models.ImageField(
                blank=True, null=True, upload_to=core.user.models.user_directory_path
            ),
        ),
    ]
