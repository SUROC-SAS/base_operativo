export enum RolesCodes {
  GERENCIA = 'RL01',
  COORDINADOR_PROYECTO = 'RL02',
  GESTOR_TECNICO = 'RL03',
  GESTOR_JURIDICO = 'RL04',
  LIDER_TECNICO = 'RL05',
  LIDER_JURIDICO = 'RL06',
  GESTOR_MUNICIPIO = 'RL07',
  MONITOR = 'RL08',
}

export interface Role {
  id: number;
  code: string;
  name: string;
}