# Generated by Django 4.2.8 on 2023-12-06 21:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("robots", "0003_robot"),
    ]

    operations = [
        migrations.AlterField(
            model_name="robot",
            name="photo",
            field=models.ImageField(upload_to="media"),
        ),
    ]
