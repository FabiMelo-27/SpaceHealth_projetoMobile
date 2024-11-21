import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sintoma } from '../models/sintoma';
import { RegistroDiabetes } from '../models/registro-diabetes';
import { RegistroPressao } from '../models/registro-pressao';

@Injectable({
  providedIn: 'root'
})
export class SintomasService {

  constructor(private firestore: AngularFirestore) {}

  // Adicionar Sintoma para o usuário logado
  addSintoma(sintoma: Sintoma, userId: string): Promise<void> {
    if (!userId) {
      throw new Error("userId é necessário para adicionar um sintoma.");
    }

    const id = this.firestore.createId();

    // Garantir que o campo userId está sendo passado corretamente
    const sintomaComUserId = { ...sintoma, userId };

    // Agora, ao passar os dados para o Firestore, o campo userId estará presente
    return this.firestore.collection(`usuarios/${userId}/sintomas`).doc(id).set(sintomaComUserId);
  }

  // Obter Sintomas de um usuário logado
  getSintomasByUser(userId: string): Observable<{ id: string, data: Sintoma }[]> {
    // Correção: Acessando a subcoleção de sintomas dentro do usuário
    return this.firestore.collection<Sintoma>(`usuarios/${userId}/sintomas`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Sintoma;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  // Atualizar Sintoma para o usuário logado
  updateSintoma(id: string, sintoma: Sintoma, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de sintomas
    return this.firestore.collection(`usuarios/${userId}/sintomas`).doc(id).update({ ...sintoma });
  }

  // Excluir Sintoma de um usuário logado
  deleteSintoma(id: string, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de sintomas
    return this.firestore.collection(`usuarios/${userId}/sintomas`).doc(id).delete();
  }

  // Adicionar Registro de Pressão para o usuário logado
  addRegistroPressao(registro: RegistroPressao, userId: string): Promise<void> {
    if (!userId) {
      throw new Error("userId é necessário para adicionar um registro de pressão.");
    }

    const id = this.firestore.createId();

    // Garantir que o campo userId está sendo passado corretamente
    const registroComUserId = { ...registro, userId };

    // Agora, ao passar os dados para o Firestore, o campo userId estará presente
    return this.firestore.collection(`usuarios/${userId}/pressao`).doc(id).set(registroComUserId);
  }

  // Obter Registros de Pressão de um usuário logado
  getRegistrosPressaoByUser(userId: string): Observable<{ id: string, data: RegistroPressao }[]> {
    // Correção: Acessando a subcoleção de pressão dentro do usuário
    return this.firestore.collection<RegistroPressao>(`usuarios/${userId}/pressao`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RegistroPressao;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  // Atualizar Registro de Pressão para o usuário logado
  updateRegistroPressao(id: string, registro: RegistroPressao, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de pressão
    return this.firestore.collection(`usuarios/${userId}/pressao`).doc(id).update({ ...registro });
  }

  // Excluir Registro de Pressão de um usuário logado
  deleteRegistroPressao(id: string, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de pressão
    return this.firestore.collection(`usuarios/${userId}/pressao`).doc(id).delete();
  }

  // Adicionar Registro de Diabetes para o usuário logado
  addRegistroDiabetes(registro: RegistroDiabetes, userId: string): Promise<void> {
    if (!userId) {
      throw new Error("userId é necessário para adicionar um registro de diabetes.");
    }

    const id = this.firestore.createId();

    // Garantir que o campo userId está sendo passado corretamente
    const registroComUserId = { ...registro, userId };

    // Agora, ao passar os dados para o Firestore, o campo userId estará presente
    return this.firestore.collection(`usuarios/${userId}/diabetes`).doc(id).set(registroComUserId);
  }

  // Obter Registros de Diabetes de um usuário logado
  getRegistrosDiabetesByUser(userId: string): Observable<{ id: string, data: RegistroDiabetes }[]> {
    // Correção: Acessando a subcoleção de diabetes dentro do usuário
    return this.firestore.collection<RegistroDiabetes>(`usuarios/${userId}/diabetes`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RegistroDiabetes;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  // Atualizar Registro de Diabetes para o usuário logado
  updateRegistroDiabetes(id: string, registro: RegistroDiabetes, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de diabetes
    return this.firestore.collection(`usuarios/${userId}/diabetes`).doc(id).update({ ...registro });
  }

  // Excluir Registro de Diabetes de um usuário logado
  deleteRegistroDiabetes(id: string, userId: string): Promise<void> {
    // Correção: Acessando o documento específico na subcoleção de diabetes
    return this.firestore.collection(`usuarios/${userId}/diabetes`).doc(id).delete();
  }
}
