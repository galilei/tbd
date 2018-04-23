import { MainComponent } from './pages/main/main.component';
import { MailViewComponent } from './components/mail-view/mail-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailImporterComponent } from './components/mail-importer/mail-importer.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailService } from './providers/mail.service';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { AccountAddComponent } from './accounts/account-add/account-add.component';

const routes: Routes = [
    { path: '', redirectTo: '/tags/Inbox', pathMatch: 'full' },
    { path: 'tags/:tag', component: MailListComponent },
    { path: 'mail/:id', component: MailViewComponent},
    { path: 'import/thunderbird', component: MailImporterComponent },
    { path: 'accounts', component: AccountListComponent },
    { path: 'accounts/add', component: AccountAddComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
