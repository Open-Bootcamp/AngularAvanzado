import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDemandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true // esto querrá decir que este módulo se va a precargar bajo estrategia de precarga OptIn / OnDemand
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    data: {
      preload: true // esto querrá decir que este módulo se va a precargar bajo estrategia de precarga OptIn / OnDemand
    }
  },
  // Siempre el 404 se pondrá en el módulo de enrutado principal
  {
    path: '**',
    loadChildren: () => import('./modules/pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // * 1 - PRECARGAR TODOS módulos de las rutas --> Avitar Carga perezosa
      // preloadingStrategy: PreloadAllModules
      // * 2 - NO PRECARGAR NINGÚN MÓDULO --> Forzar Carga perezosa
      // preloadingStrategy: NoPreloading
      // * 3 - Estrategia Personalizada: Precarga por opciones en rutas
      // preloadingStrategy: OptInPreloadingStrategy
      // * 4 - Estrategia Personalizada: Precragra por conexión de usuario a internet
      // preloadingStrategy: NetworkAwarePreloadStrategy
      // * 5 - Estrategia Personalidad: Precarga por Demanda iniciada por evento controlado desde servicio PreloadingService
      preloadingStrategy: OnDemandPreloadingStrategy
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
