import { Perfil } from './../models/perfil';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilCollection: AngularFirestoreCollection<Perfil>;

  constructor(private firestore: AngularFirestore) {
    this.perfilCollection = this.firestore.collection<Perfil>('perfil');
  }

  addPerfil(perfil: Perfil): Promise<void> {
    const id = this.firestore.createId();
    return this.perfilCollection.doc(id).set({ ...perfil });
  }

  getUserPerfil(userId: string): Observable<{ id: string, data: Perfil }[]> {
    return this.firestore.collection<Perfil>('perfil', ref => ref.where('userId', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Perfil;
          const id = a.payload.doc.id;
          return { id, data };
        }))
      );
  }

  updatePerfil(id: string, perfil: Perfil): Promise<void> {
    return this.perfilCollection.doc(id).update({
      nome: perfil.nome,
      telefone: perfil.telefone,
      dataNascimento: perfil.dataNascimento,
      email: perfil.email,
      planoSaude: perfil.planoSaude,
      tipoPlano: perfil.tipoPlano,
      novaPatologia: perfil.novaPatologia,
      novoMedicamento: perfil.novoMedicamento,
      alergias: perfil.alergias,
      outrosDados: perfil.outrosDados,
      contatoNome: perfil.contatoNome,
      contatoTelefone: perfil.contatoTelefone,
      contatoParentesco: perfil.contatoParentesco,
      userId: perfil.userId
    });
  }

  deletePerfil(id: string): Promise<void> {
    return this.perfilCollection.doc(id).delete();
  }
}
