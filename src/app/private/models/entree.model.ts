import { FactureModel } from './facture.model';
import { AnneeModel } from './annee.model';

export interface EntreeModel {
  numEntree: string;
  nomenclature: number;
  numFolioGL: number;
  designation: string;
  especeUnitaire: string;
  quantite: string;
  prix: number;
  newannee: AnneeModel;
  destination: FactureModel;
}
