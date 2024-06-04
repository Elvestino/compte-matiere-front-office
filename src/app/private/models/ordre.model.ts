import { AnneeModel } from './annee.model';
import { ServiceModel } from './service.model';

export interface OrdreModel {
  numOrdre: string;
  dateOrdre: Date;
  newannee: AnneeModel;
  numService: ServiceModel;
}
