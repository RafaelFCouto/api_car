from django.db import models
from django_mysql.models import EnumField

class Car(models.Model):

    #Enum para garantir a conscistência no resultado.
    STATUS_CAR = [
        ('DISPONIVEL', 'DISPONÍVEL'), # disponível para locação
        ('ALUGADO', 'ALUGADO'), # em uso pelo cliente
        ('EM_MANUTENCAO', 'EM MANUTENÇÃO'), # manutenção ou revisão
        ('RESERVADO', 'RESERVADO'),  # reserva feita, aguardando retirada
        ('INDISPONIVEL', 'INDISPONÍVEL'), # sem uso por outros motivos
        ('FORA_DE_CIRCULACAO', 'FORA DE CIRCULAÇÃO') # desativado ou fora do sistema
    ]

    id_veiculo = models.AutoField(primary_key=True)
    placa = models.CharField(max_length=10, unique=True) # Placa é única por veículo
    modelo = models.CharField(max_length=50)
    ano = models.IntegerField()
    status = EnumField(
        choices=STATUS_CAR,
        default='DISPONIVEL'
    )

    def __str__(self):
        return f"{self.placa} - {self.modelo}-({self.ano})-({self.status})"
