# Generated by Django 4.2.8 on 2023-12-06 20:39

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("robots", "0002_rename_results_result"),
    ]

    operations = [
        migrations.CreateModel(
            name="Robot",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("robot_id", models.IntegerField()),
                ("name", models.CharField(max_length=100)),
                ("photo", models.ImageField(upload_to="robots/static/robots/images")),
                ("hls", models.FloatField()),
                ("ff", models.FloatField()),
                ("bm", models.FloatField()),
                ("sl", models.FloatField()),
            ],
        ),
    ]
