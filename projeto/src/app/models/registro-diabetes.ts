// src/app/models/registro-diabetes.ts
export class RegistroDiabetes {
  constructor(
    public data: string,
    public nivelGlicose: number,
   public userId?: string
     // Opcional para identificar o registro
  ) {}
}
