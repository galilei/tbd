import { MainPage } from './pages/main/main.page';
import { MailViewComponent } from './components/mail-view/mail-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailImporterComponent } from './components/mail-importer/mail-importer.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailService } from './providers/mail.service';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountAddComponent } from './accounts/account-add/account-add.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'mail/inbox',
        pathMatch: 'full',
    },
    {
        component: MailListComponent,
        path: 'mail/:label'
    },
    {
        component: MailViewComponent,
        path: 'mail/:label/:id',
    },
    // {
    //     path: 'import/thunderbird',
    //     component: MailImporterComponent
    // },
    // {
    //     path: 'accounts',
    //     component: AccountListComponent
    // },
    // {
    //     path: 'accounts/add',
    //     component: AccountAddComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
