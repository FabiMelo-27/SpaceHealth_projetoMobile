import { Component, OnInit } from '@angular/core';

interface Medication {
  name: string;
  startTime: string;
  interval: number; // em horas
  startDate: string;
  duration: number; // em dias
  isContinuous: boolean;
}

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
})
export class MedicamentosPage implements OnInit {
  medication: Medication = {
    name: '',
    startTime: '',
    interval: 0,
    startDate: '',
    duration: 0,
    isContinuous: false
  };

  medications: Medication[] = [];
  isEditing = false;
  editingIndex: number | null = null;

  ngOnInit() {
    this.loadMedications(); // Carregar os dados ao iniciar
  }

  addMedication() {
    if (this.validateMedication()) {
      this.medications.push({ ...this.medication });
      this.saveMedications(); // Salvar após adicionar
      this.resetMedication();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  editMedication(index: number) {
    this.medication = { ...this.medications[index] };
    this.isEditing = true; // Marca que estamos em modo de edição
    this.editingIndex = index; // Armazena o índice do medicamento em edição
  }

  saveMedication() {
    if (this.validateMedication()) {
      if (this.editingIndex !== null) {
        this.medications[this.editingIndex] = { ...this.medication }; // Atualiza o medicamento
      } else {
        this.medications.push({ ...this.medication });
      }
      this.saveMedications(); // Salvar após editar
      this.resetMedication();
      this.isEditing = false; // Reseta o estado de edição
      this.editingIndex = null; // Limpa o índice de edição
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  removeMedication(index: number) {
    this.medications.splice(index, 1);
    this.saveMedications(); // Salvar após remoção
  }

  resetMedication() {
    this.medication = {
      name: '',
      startTime: '',
      interval: 0,
      startDate: '',
      duration: 0,
      isContinuous: false
    };
  }

  validateMedication() {
    return this.medication.name && this.medication.startTime && this.medication.interval > 0;
  }

  getMedicationTimes(medication: Medication) {
    const times = [];
    const startHour = new Date(`1970-01-01T${medication.startTime}:00`).getHours();
    const interval = medication.interval;

    // Calcular horários até 24 horas a partir do horário inicial
    for (let i = 0; i < Math.floor(24 / interval); i++) {
      const nextDoseHour = (startHour + (i * interval)) % 24; // Usa módulo para circular 24h
      times.push(`${String(nextDoseHour).padStart(2, '0')}:00`);
    }

    return times.join(' / ');
  }


  getEndDate(medication: Medication) {
    if (medication.isContinuous) {
      return 'Uso contínuo. Lembre-se de consultar seu médico periodicamente.';
    } else {
      const startDate = new Date(medication.startDate);
      startDate.setDate(startDate.getDate() + medication.duration);
      return `Término em: ${startDate.toLocaleDateString()}`;
    }
  }

  saveMedications() {
    localStorage.setItem('medications', JSON.stringify(this.medications));
  }

  loadMedications() {
    const storedMedications = localStorage.getItem('medications');
    if (storedMedications) {
      this.medications = JSON.parse(storedMedications);
    }
  }
}
