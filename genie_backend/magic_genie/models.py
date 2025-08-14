from django.db import models

class DailyWord(models.Model):
    word = models.CharField(max_length=100)
    date = models.DateField(unique=True)

    def __str__(self):
        return self.word
