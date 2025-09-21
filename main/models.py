from django.db import models
import uuid
from django.contrib.auth.models import User

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('jersey', 'Jersey'),
        ('boots', 'Football Boots'),
        ('ball', 'Football'),
        ('goalkeeper_gear', 'Goalkeeper Gear'),
        ('accessories', 'Accessories'),
    ]

    # mandatory fields
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0) 
    description = models.TextField(blank=True, null=True) 
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='boots'
    )
    is_featured = models.BooleanField(default=False)
    
    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=20, default='Mamatsport')
    rating = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
