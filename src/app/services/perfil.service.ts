import { Perfil } from './../models/perfil';


// Importações necessárias do Angular
import { Injectable } from '@angular/core'; // Importa o decorator Injectable para permitir a injeção de dependências
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; // Importa classes para interagir com o Firestore

import { Observable } from 'rxjs'; // Importa a classe Observable para manipulação de fluxos de dados
import { map } from 'rxjs/operators'; // Importa o operador 'map' para transformar os dados do Observable

// Decorador Injectable que indica que esta classe pode ser injetada em outros componentes ou serviços
@Injectable({
  providedIn: 'root' // Permite que o serviço seja injetado em toda a aplicação
})
export class PerfilService {
  private perfilCollection: AngularFirestoreCollection<Perfil>; // Declara uma coleção do Firestore para armazenar pessoas

  // Construtor do serviço, onde o AngularFirestore é injetado
  constructor(private firestore: AngularFirestore) {
    // Inicializa a coleção de pessoas no Firestore
    this.perfilCollection = this.firestore.collection<Perfil>('perfil');
  }

  // Método para adicionar uma nova pessoa
  addPerfil(perfil: Perfil): Promise<void> {
    const id = this.firestore.createId(); // Cria um ID único para a nova pessoa
    // Adiciona a pessoa à coleção usando o ID gerado
    return this.perfilCollection.doc(id).set({ ...perfil });
  }

  // Método para obter a lista de pessoas
  getPerfil(): Observable<{ id: string, data: Perfil }[]> {
    // Retorna um Observable com as mudanças na coleção de pessoas
    return this.perfilCollection.snapshotChanges().pipe(
      // Usa o operador map para transformar os dados recebidos
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Perfil; // Extrai os dados da pessoa
        const id = a.payload.doc.id; // Extrai o ID do documento
        // Retorna um objeto contendo o ID e os dados da pessoa
        return { id, data };
      }))
    );
  }

  // Método para atualizar uma pessoa existente
  updatePerfil(id: string, perfil: Perfil): Promise<void> {
    // Atualiza o documento da pessoa com o ID fornecido
    return this.perfilCollection.doc(id).update({ nome: perfil.nome, telefone: perfil.telefone, dataNascimento: perfil.dataNascimento, email: perfil.email, planoSaude: perfil.planoSaude, tipoPlano: perfil.tipoPlano, novaPatologia: perfil.novaPatologia, novoMedicamento: perfil.novoMedicamento, alergias:perfil.alergias, outrosDados: perfil.outrosDados, contatoNome: perfil.contatoNome, contatoTelefone: perfil.contatoTelefone, contatoParentesco: perfil.contatoParentesco });
  }

  // Método para excluir uma pessoa
  deletePerfil(id: string): Promise<void> {
    // Remove o documento da pessoa com o ID fornecido
    return this.perfilCollection.doc(id).delete();
  }
}
