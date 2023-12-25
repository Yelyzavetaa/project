import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from robots.models import Result


class Command(BaseCommand):
    def import_csv(file_path):
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Result.objects.create(
                    M1=row['M1'],
                    M2=row['M2'],
                    M3=row['M3'],
                    M4=row['M4'],
                    q1_1=row['q1_1'],
                    q2_1=row['q2_1'],   
                    q3_1=row['q3_1'],
                    q4_1=row['q4_1'],
                    q5_1=row['q5_1'],
                    q6_1=row['q6_1'],
                    q7_1=row['q7_1'],
                    q8_1=row['q8_1'],
                    q9_1=row['q9_1'],
                    q10_1=row['q10_1'],
                    q11_1=row['q11_1'],
                    q12_1=row['q12_1'],
                    q13_1=row['q13_1'],
                    q14_1=row['q14_1'],
                    q15_1=row['q15_1'],
                    q16_1=row['q16_1'],
                    q17_1=row['q17_1'],
                    q18_1=row['q18_1'],
                    q19_1=row['q19_1'],
                    q20_1=row['q20_1'],
                    q21_1=row['q21_1'],
                    q22_1=row['q22_1'],
                    q23_1=row['q23_1'],
                    q24_1=row['q24_1'],
                    q25_1=row['q25_1'],
                    q26_1=row['q26_1'],
                    q27_1=row['q27_1'],
                    q28_1=row['q28_1'],
                    q29_1=row['q29_1'],
                    q30_1=row['q30_1'],
                    q31_1=row['q31_1'],
                    q32_1=row['q32_1'],
                    q33_1=row['q33_1'],
                    q34_1=row['q34_1'],
                    q35_1=row['q35_1'],
                    q36_1=row['q36_1'],
                    q37_1=row['q37_1'],
                    q38_1=row['q38_1'],
                    q39_1=row['q39_1'],
                    q40_1=row['q40_1']
                )

    if __name__ == '__main__':
        csv_file_path = 'D:\Tanskaya\SWPS\dyplom\results_1.csv'  
        import_csv(csv_file_path)