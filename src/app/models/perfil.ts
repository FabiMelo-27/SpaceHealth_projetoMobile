export class Perfil {
  constructor(
    public nome: string,
    public telefone: number,
    public dataNascimento: string,
    public email: string,
    public planoSaude: string,
    public tipoPlano: string,
    public novoMedicamento: string,
    public novaPatologia: string,
    public alergias: string,
    public outrosDados: string,
    public contatoNome: string,
    public contatoTelefone: string,
    public contatoParentesco: string
    ) {}
}
