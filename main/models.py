from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('sportswear', 'Sportswear'),
        ('footwear', 'Footwear'),
        ('equipment', 'Equipment'),
        ('accessories', 'Accessories'),
        ('protection gear', 'Protection Gear'),
    ]

    # mandatory fields
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0) 
    description = models.TextField(blank=True, null=True) 
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='sportswear')
    is_featured = models.BooleanField(default=False)
    
    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=20, default='Mamatsport')
    rating = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
