// src/app/services/sintomas.service.ts
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
  private sintomasCollection: AngularFirestoreCollection<Sintoma>;
  private registrosPressaoCollection: AngularFirestoreCollection<RegistroPressao>;
  private registrosDiabetesCollection: AngularFirestoreCollection<RegistroDiabetes>;

  constructor(private firestore: AngularFirestore) {
    this.sintomasCollection = this.firestore.collection<Sintoma>('sintomas');
    this.registrosPressaoCollection = this.firestore.collection<RegistroPressao>('pressao');
    this.registrosDiabetesCollection = this.firestore.collection<RegistroDiabetes>('diabetes');
  }

  addSintoma(sintoma: Sintoma): Promise<void> {
    const id = this.firestore.createId();
    return this.sintomasCollection.doc(id).set({ ...sintoma });
  }

  getSintomas(): Observable<{ id: string, data: Sintoma }[]> {
    return this.sintomasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Sintoma;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  updateSintoma(id: string, sintoma: Sintoma): Promise<void> {
    return this.sintomasCollection.doc(id).update({ ...sintoma });
  }

  deleteSintoma(id: string): Promise<void> {
    return this.sintomasCollection.doc(id).delete();
  }

  addRegistroPressao(registro: RegistroPressao): Promise<void> {
    const id = this.firestore.createId();
    return this.registrosPressaoCollection.doc(id).set({ ...registro });
  }

  getRegistrosPressao(): Observable<{ id: string, data: RegistroPressao }[]> {
    return this.registrosPressaoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RegistroPressao;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  updateRegistroPressao(id: string, registro: RegistroPressao): Promise<void> {
    return this.registrosPressaoCollection.doc(id).update({ ...registro });
  }

  deleteRegistroPressao(id: string): Promise<void> {
    return this.registrosPressaoCollection.doc(id).delete();
  }

  addRegistroDiabetes(registro: RegistroDiabetes): Promise<void> {
    const id = this.firestore.createId();
    return this.registrosDiabetesCollection.doc(id).set({ ...registro });
  }

  getRegistrosDiabetes(): Observable<{ id: string, data: RegistroDiabetes }[]> {
    return this.registrosDiabetesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RegistroDiabetes;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  updateRegistroDiabetes(id: string, registro: RegistroDiabetes): Promise<void> {
    return this.registrosDiabetesCollection.doc(id).update({ ...registro });
  }

  deleteRegistroDiabetes(id: string): Promise<void> {
    return this.registrosDiabetesCollection.doc(id).delete();
  }
}
