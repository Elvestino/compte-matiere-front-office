import { FournisseurModel } from './fournisseur.models';

export interface FactureModel {
  numFacture: string;
  dateFacture: Date;
  destination: string;
  LieuFacture: string;
  typeFacture: string;
  objetFacture: string;
  montantFacture: number;
  nomFrns: FournisseurModel;
}
