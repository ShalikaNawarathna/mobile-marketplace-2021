import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    //canActivate: [AuthGuard]

  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate: [AuthGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
 
  {
    path: 'popovercomponent',
    loadChildren: () => import('./pages/popovercomponent/popovercomponent.module').then( m => m.PopovercomponentPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
