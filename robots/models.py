from django.db import models

"""
M1	M2	M3	M4	q1_1	q2_1	q3_1	q4_1	q5_1	q6_1	q7_1	q8_1	q9_1	q10_1	q11_1	q12_1	q13_1	q14_1	q15_1	q16_1	q17_1	q18_1	q19_1	q20_1	q21_1	q22_1	q23_1	q24_1	q25_1	q26_1	q27_1	q28_1	q29_1	q30_1	q31_1	q32_1	q33_1	q34_1	q35_1	q36_1	q37_1	q38_1	q39_1	q40_1
all fields are integer
"""
# Create your models here.

class Robot(models.Model):
    robot_id = models.IntegerField()
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='')
    hls = models.FloatField()
    ff = models.FloatField()
    bm = models.FloatField()
    sl = models.FloatField()

class Result(models.Model):
    M1 = models.IntegerField()
    M2 = models.IntegerField()
    M3 = models.IntegerField()
    M4 = models.IntegerField()
    q1_1 = models.IntegerField()
    q2_1 = models.IntegerField()
    q3_1 = models.IntegerField()
    q4_1 = models.IntegerField()
    q5_1 = models.IntegerField()
    q6_1 = models.IntegerField()
    q7_1 = models.IntegerField()
    q8_1 = models.IntegerField()
    q9_1 = models.IntegerField()
    q10_1 = models.IntegerField()
    q11_1 = models.IntegerField()
    q12_1 = models.IntegerField()
    q13_1 = models.IntegerField()
    q14_1 = models.IntegerField()
    q15_1 = models.IntegerField()
    q16_1 = models.IntegerField()
    q17_1 = models.IntegerField()
    q18_1 = models.IntegerField()
    q19_1 = models.IntegerField()
    q20_1 = models.IntegerField()
    q21_1 = models.IntegerField()
    q22_1 = models.IntegerField()
    q23_1 = models.IntegerField()
    q24_1 = models.IntegerField()
    q25_1 = models.IntegerField()
    q26_1 = models.IntegerField()
    q27_1 = models.IntegerField()
    q28_1 = models.IntegerField()
    q29_1 = models.IntegerField()
    q30_1 = models.IntegerField()
    q31_1 = models.IntegerField()
    q32_1 = models.IntegerField()
    q33_1 = models.IntegerField()
    q34_1 = models.IntegerField()
    q35_1 = models.IntegerField()
    q36_1 = models.IntegerField()
    q37_1 = models.IntegerField()
    q38_1 = models.IntegerField()
    q39_1 = models.IntegerField()
    q40_1 = models.IntegerField()

    def __str__(self):
        return str(self.id)