from django.db import models

class DailyWord(models.Model):
    word = models.CharField(max_length=100)
    date = models.DateField(unique=True)

    def __str__(self):
        return self.word


class NumberCorrect(models.Model):
    correct = models.IntegerField(default=0)
    wrong = models.IntegerField(default=0)
    date = models.DateField(unique=True)

    def __str__(self):
        total = self.correct + self.wrong
        if total == 0:
            return "N/A"

        percentageCorrect = (self.correct / total) * 100
        percentageWrong = (self.wrong / total) * 100

        return f"{percentageCorrect:.2f}% correct / {percentageWrong:.2f}% wrong"
