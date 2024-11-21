// src/app/models/registro-pressao.ts
export class RegistroPressao {
  constructor(
    public data: string,
    public pressaoSistolica: number,
    public pressaoDiastolica: number,
    public userId?: string
    // Opcional para identificar o registro
  ) {}
}
