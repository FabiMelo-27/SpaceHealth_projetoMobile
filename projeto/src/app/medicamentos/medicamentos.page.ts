import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

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
  isEditing = false; // Flag para indicar se estamos editando
  editingIndex: number | null = null; // Índice do medicamento em edição

  ngOnInit() {
    this.loadMedications(); // Carregar os dados ao iniciar
    this.requestNotificationPermission();
  }

  // Função para solicitar permissão de notificação
  requestNotificationPermission() {
    LocalNotifications.requestPermissions().then(permission => {
      if (permission.display === 'granted') {
        console.log('Permissão para notificações concedida');
      } else {
        console.log('Permissão para notificações negada');
      }
    });
  }

  addMedication() {
    if (this.validateMedication()) {
      // Se não estamos editando, adicionamos o novo medicamento
      if (!this.isEditing) {
        this.medications.push({ ...this.medication });
      } else {
        // Se estamos editando, atualizamos o medicamento no índice correto
        if (this.editingIndex !== null) {
          this.medications[this.editingIndex] = { ...this.medication };
        }
      }
      this.saveMedications(); // Salvar após adicionar ou editar
      this.scheduleNotifications(); // Agendar notificações
      this.resetMedication(); // Resetar os campos de medicação
      this.isEditing = false; // Resetar flag de edição
      this.editingIndex = null; // Limpar o índice de edição
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  // Função para agendar notificações
  async scheduleNotifications() {
    const medication = this.medication;

    // Definindo o horário de início com minutos corretamente
    const [startHour, startMinute] = medication.startTime.split(':').map(Number);
    const startDateTime = new Date(`${medication.startDate}T${medication.startTime}:00`);

    console.log(`Start time for notification: ${startDateTime}`);

    const intervalInMillis = medication.interval * 60 * 60 * 1000; // Converter intervalo para milissegundos
    let notificationTime = new Date(startDateTime);
    const notificationTimes: Date[] = [];

    // Armazenando os horários de notificação
    for (let i = 0; i < medication.duration; i++) {
      console.log(`Scheduling notification for: ${notificationTime}`);
      notificationTimes.push(new Date(notificationTime)); // Armazena o horário atual de notificação
      notificationTime = new Date(notificationTime.getTime() + intervalInMillis); // Aumenta o horário de acordo com o intervalo
    }

    // Agendar a notificação
    for (const time of notificationTimes) {
      console.log(`Notification scheduled for: ${time}`);
      await LocalNotifications.schedule({
        notifications: [{
          id: new Date().getTime(), // ID único
          title: 'Hora de tomar seu medicamento!',
          body: `${medication.name} - Hora de tomar sua medicação.`,
          schedule: { at: time },
          sound: '', // Deixe vazio ou adicione um arquivo de som, se necessário

        }]
      });
    }
  }


  // Função para editar um medicamento
  editMedication(index: number) {
    this.medication = { ...this.medications[index] }; // Carregar dados do medicamento no formulário
    this.isEditing = true; // Marca que estamos em modo de edição
    this.editingIndex = index; // Armazena o índice do medicamento em edição
  }

  // Função para validar a medicação antes de salvar
  validateMedication() {
    return this.medication.name && this.medication.startTime && this.medication.interval > 0;
  }

  // Função para remover a medicação
  removeMedication(index: number) {
    this.medications.splice(index, 1);
    this.saveMedications(); // Salvar após remoção
  }

  // Função para resetar os campos do formulário
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

  // Função para salvar os medicamentos no armazenamento local
  saveMedications() {
    localStorage.setItem('medications', JSON.stringify(this.medications));
  }

  // Função para carregar os medicamentos do armazenamento local
  loadMedications() {
    const storedMedications = localStorage.getItem('medications');
    if (storedMedications) {
      this.medications = JSON.parse(storedMedications);
    }
  }

  getMedicationTimes(medication: Medication) {
    const times = [];
    const [startHour, startMinute] = medication.startTime.split(':').map(Number);
    const interval = medication.interval;

    for (let i = 0; i < Math.floor(24 / interval); i++) {
      const nextDoseHour = (startHour + (i * interval)) % 24;
      const nextDoseMinute = startMinute; // Preserva os minutos
      times.push(`${String(nextDoseHour).padStart(2, '0')}:${String(nextDoseMinute).padStart(2, '0')}`);
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




}
