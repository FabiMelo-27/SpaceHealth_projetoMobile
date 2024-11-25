// export class Perfil {
//   constructor(
//     public nome: string,
//     public telefone: string,
//     public dataNascimento: string,
//     public email: string,
//     public planoSaude: string,
//     public tipoPlano: string,
//     public novoMedicamento: string,
//     public novaPatologia: string,
//     public alergias: string,
//     public outrosDados: string,
//     public contatoNome: string,
//     public contatoTelefone: string,
//     public contatoParentesco: string,
//     public userId: string

//     ) {}
// }


export class Perfil {
  constructor(
    public nome: string,
    public telefone: string,
    public dataNascimento: string,
    public email: string,
    public planoSaude: string,
    public tipoPlano: string,
    public novaPatologia: string,
    public novoMedicamento: string,
    public alergias: string,
    public tipoSanguineo: string, // Novo campo adicionado
   public cirurgiasRealizadas: string, // Novo campo adicionado
    public outrosDados: string,
    public contatoNome: string,
    public contatoTelefone: string,
    public contatoParentesco: string,
    public userId: string
  ) {}
}
