import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoListComponent } from './components/produto/produto-list/produto-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', component: NavComponent, children: [{
    path: 'home', component: HomeComponent
  },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'produtos/create', component: ProdutoCreateComponent },
  { path: 'produtos/update/:id', component: ProdutoUpdateComponent },
  { path: 'produtos/delete/:id', component: ProdutoDeleteComponent },]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
