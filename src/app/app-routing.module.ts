import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

// Services
import { AuthGuardService } from '@app/core/services';
import { UnauthorizedScreenFormComponent } from './components/layout/unauthorized-screen/unauthorized-screen-form.component';
import { ScreenNotFoundFormComponent } from './components/layout/screen-not-found/screen-not-found-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { redirectTo: 'dashboard' } },
  { path: 'activate-user', component: ActivateUserComponent },
  { path: 'unauthorized', component: UnauthorizedScreenFormComponent },
  { path: 'not-found', component: ScreenNotFoundFormComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'settings/profiles',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/settings/profiles/profiles.module').then(m => m.ProfilesModule)
      },
      {
        path: 'settings/users',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/settings/users/users.module').then(m => m.UsersModule)
      },
      // {
      //   path: 'settings/users',
      //   canActivate: [AuthGuardService],
      //   loadChildren: () => import('./components/settings/business/business.module').then(m => m.BusinessModule)
      // },
      {
        path: 'catalogs/suppliers',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/catalogs/suppliers/suppliers.module').then(m => m.SuppliersModule),
      },
      {
        path: 'catalogs/articles',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/catalogs/articles/articles.module').then(m => m.ArticlesModule),
      },
      {
        path: 'purchases/requisitions',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/requisitions/requisitions.module').then(m => m.RequisitionsModule),
      },
      {
        path: 'purchases/purchase-orders',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/purchase-orders/purchase-orders.module').then(m => m.PurchaseOrdersModule),
      },
      {
        path: 'purchases/requisitions-authorizer',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/requisitions-authorizer/requisitions-authorizer.module')
          .then(m => m.RequisitionsAuthorizerModule),
      },
      {
        path: 'purchases/authorizer-purchase-orders',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/authorizer-purchase-orders/authorizer-purchase-orders.module')
          .then(m => m.AuthorizerPurchaseOrdersModule),
      },
      {
        path: 'purchases/merchandise-reception',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/merchandise-reception/merchandise-reception.module')
          .then(m => m.MerchandiseReceptionModule),
      },
      {
        path: 'catalogs/authorizers',
        loadChildren: () => import('./components/catalogs/authorizers/authorizers.module').then(m => m.AuthorizersModule),
      },
      {
        path: 'catalogs/products',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/catalogs/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'finance/accounts-payable',
        loadChildren: () => import('./components/finance/accounts-payable/accounts-payable.module')
          .then(m => m.AccountsPayableModule),
      },
      {
        path: 'catalogs/exchange-rate',
        loadChildren: () => import('./components/catalogs/exchange-rate/exchange-rate.module')
          .then(m => m.ExchangeRateModule),
      },
      {
        path: 'invoicing/pre-invoices',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/invoice/pre-invoice/pre-invoice.module')
          .then(m => m.PreInvoiceModule),
      },
      {
        path: 'sales/projects',
        loadChildren: () => import('./components/sales/projects/projects.module')
          .then(m => m.ProjectsModule),
      },
      {
        path: 'purchases/reconciliation',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/reconciliation/reconciliation.module')
          .then(m => m.ReconciliationModule),
      },
      {
        path: 'catalogs/customers',
        loadChildren: () => import('./components/catalogs/customers/customers.module')
          .then(m => m.CustomersModule),
      },
      {
        path: 'purchases/reconciliation-authorization',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/purchases/reconciliation-authorization/reconciliation-authorization.module')
          .then(m => m.ReconciliationAuthorizationModule),
      },
      {
        path: 'sales/remissions',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/sales/remissions/remissions.module')
          .then(m => m.RemissionsModule),
      },
      {
        path: 'sales/price-list-authorization',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/sales/authorizer-price-list/authorizer-price-list.module')
          .then(m => m.AuthorizerPriceListModule),
      },
      {
        path: 'sales/sales-support',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/sales/sales-support/sales-support.module')
          .then(m => m.SalesSupportModule),
      },
      {
        path: 'sales/price-list',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/sales/price-list/price-list.module')
          .then(m => m.PriceListModule),
      },
      {
        path: 'catalogs/accounts-banks',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/catalogs/accounts-banks/accounts-banks.module')
          .then(m => m.AccountsBanksModule),
      },
      {
        path: 'finance/balance-movements',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./components/finance/balance-movements/balance-movements.module')
          .then(m => m.BalanceMovementsModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
