import { Routes } from '@angular/router';
import { SignInComponent } from './public/pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './public/pages/create-account/create-account.component';
import { AppWrapperComponent } from './private/pages/app-wrapper.component';
import { AccueilComponent } from './private/pages/accueil/accueil.component';
import { MaterielComponent } from './private/pages/materiel/materiel.component';
import { FournisseurComponent } from './private/pages/fournisseur/fournisseur.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { authGuard } from './private/guard/auth.guard';
import { publicAuthGuard } from './public/guard/public-auth.guard';
import { ServiceComponent } from './private/pages/service/service.component';
import { GrapheComponent } from './private/pages/graphe/graphe.component';
import { JournalComponent } from './private/pages/journal/journal.component';
import { GrandLivreComponent } from './private/pages/grand-livre/grand-livre.component';
import { QuitusComponent } from './private/pages/quitus/quitus.component';
import { FactureComponent } from './private/pages/materiel/facture/facture.component';
import { EntreeComponent } from './private/pages/materiel/entree/entree.component';
import { SortieComponent } from './private/pages/materiel/sortie/sortie.component';

export const routes: Routes = [
  // public routes;
  { path: '', component: SignInComponent, canActivate: [publicAuthGuard] },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [publicAuthGuard],
  },

  // private routes
  {
    path: 'apps',
    component: AppWrapperComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AccueilComponent },
      {
        path: 'materiel',
        component: MaterielComponent,
        children: [
          { path: '', component: FactureComponent },
          { path: 'entree', component: EntreeComponent },
          { path: 'sortie', component: SortieComponent },
        ],
      },
      { path: 'fournisseur', component: FournisseurComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'graphe', component: GrapheComponent },
      { path: 'journal', component: JournalComponent },
      { path: 'grandLivre', component: GrandLivreComponent },
      { path: 'quitus', component: QuitusComponent },
    ],
  },

  // shared routes
  { path: '**', component: NotFoundComponent },
];
