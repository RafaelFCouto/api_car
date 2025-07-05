import requests
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

API_URL = 'http://127.0.0.1:8000/api/car/'

STATUS_CAR = [
    ('DISPONIVEL', 'DISPONÍVEL'),
    ('ALUGADO', 'ALUGADO'),
    ('EM_MANUTENCAO', 'EM MANUTENÇÃO'),
    ('RESERVADO', 'RESERVADO'),
    ('INDISPONIVEL', 'INDISPONÍVEL'),
    ('FORA_DE_CIRCULACAO', 'FORA DE CIRCULAÇÃO'),
]


def list_cars(request):
    response = requests.get(API_URL)
    cars = response.json() if response.status_code == 200 else []
    return render(request, 'frontend/list.html', {'cars': cars})

@csrf_exempt
def create_car(request):
    if request.method == 'POST':
        data = {
            'placa': request.POST.get('placa'),
            'modelo': request.POST.get('modelo'),
            'ano': request.POST.get('ano'),
            'status': request.POST.get('status')
        }

        response = requests.post(API_URL, data=data)

        if response.status_code in [200, 201]:
            return redirect('list_cars')
        else:
            error = 'Erro ao criar carro. Verifique os dados.'
            return render(request, 'frontend/create.html', {'error': error, 'status_options': STATUS_CAR})

    return render(request, 'frontend/create.html', {'status_options': STATUS_CAR})

def delete_car(request, car_id):
    try:
        response = requests.delete(f'{API_URL}{car_id}/')
        if response.status_code == 204:
            return redirect('list_cars')
        else:
            return render(request, 'frontend/list.html', {'error': 'Erro ao excluir carro.'})
    except requests.exceptions.RequestException:
        return render(request, 'frontend/list.html', {'error': 'Erro de conexão com a API.'})


def edit_car(request, car_id):
    car_url = f"{API_URL}{car_id}/"
    if request.method == 'POST':
        data = {
            'placa': request.POST['placa'],
            'modelo': request.POST['modelo'],
            'ano': request.POST['ano'],
            'status': request.POST['status']
        }
        response = requests.put(car_url, json=data)
        if response.status_code in [200, 204]:
            return redirect('list_cars')
    else:
        response = requests.get(car_url)
        if response.status_code == 200:
            car = response.json()
            return render(request, 'frontend/edit.html', {'car': car, 'status_choices': STATUS_CAR})
    
    return redirect('list_cars')