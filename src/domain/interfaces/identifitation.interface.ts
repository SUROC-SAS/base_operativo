
export interface Identification {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};


export enum IdentificationCodes {
  REGISTRO_CIVIL = 'DT01',
  TARJETA_IDENTIDAD = 'DT02',
  CEDULA = 'DT03',
  NUMERO_UNICO = 'DT04',
  NIT = 'DT05',
  NIT_PAIS = 'DT06',
  PASAPORTE = 'DT07',
  PERMISO_ESPECIAL = 'DT08',
  IDENTIFICACION_EXTRANJERO = 'DT09',
  CEDULA_EXTRANJERO = 'DT10',
}