// src/app/models/sintoma.ts
export class Sintoma {
  constructor(
    public sintoma: string,
    public intensidade: string,
    public data: string,
    // Opcional para identificar o sintoma
  ) {}
}
