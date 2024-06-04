export class ServiceModel {
  numService: string;
  nomService: string;
  libelle: string;
  SOA: string;
  typeService: string;
  constructor(
    libelle: string,
    nomService: string,
    numService: string,
    SOA: string,
    typeService: string
  ) {
    this.libelle = libelle;
    this.nomService = nomService;
    this.numService = numService;
    this.SOA = SOA;
    this.typeService = typeService;
  }
}
