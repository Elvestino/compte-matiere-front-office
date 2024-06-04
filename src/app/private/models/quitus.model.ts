import { ServiceModel } from './service.model';

export interface QuitusModel {
  numQuitus: string;
  dateQuitus: Date;
  nomService: ServiceModel;
  observateur: string;
  ReferenceQuitus: string;
  montantQuitus: number;
  exerciceAnnee: number;
  objetQuitus: string;
}
