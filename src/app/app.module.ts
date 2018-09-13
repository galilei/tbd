import 'zone.js/dist/zone-mix';
import 'reflect-metadata';

import "froala-editor/js/froala_editor.pkgd.min.js";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';
import { MailService } from './providers/mail.service';
import { ESService } from './providers/es.service';
import { ESMailService } from './providers/esmail.service';
import { FakemailService } from './providers/fakemail.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { MailImporterComponent } from './components/mail-importer/mail-importer.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailViewComponent } from './components/mail-view/mail-view.component';

import { TreeModule } from 'ng2-tree';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatIconModule, MatStepperModule, MAT_LABEL_GLOBAL_OPTIONS, MatFormFieldModule, MatInputModule, MatSidenavModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatOptionModule, MatSelectModule, MatPaginatorModule, MatIconRegistry, MatChipsModule, MatAutocompleteModule, MatTooltipModule, MatExpansionModule, MatDialogModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MainPage } from './pages/main/main.page';
import { TagViewComponent } from './components/tag-view/tag-view.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { MailImporterService } from './providers/mail-importer.service';
import { AccountAddComponent } from './accounts/account-add/account-add.component';
import { EditorComponent } from './composer/editor/editor.component';
import { NewMailComponent } from './composer/new-mail/new-mail.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MailListItemComponent } from './components/mail-list-item/mail-list-item.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { AccountService } from './accounts/account.service';
import { PopService } from './accounts/pop.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MailListComponent,
    WebviewDirective,
    MailViewComponent,
    MainPage,
    MailImporterComponent,
    TagViewComponent,
    AccountListComponent,
    AccountAddComponent,
    EditorComponent,
    NewMailComponent,
    LeftMenuComponent,
    MailListItemComponent,
    MailItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    // Material
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,

    // For forms
    ReactiveFormsModule,
    FormsModule,
    TreeModule,

    // For message editor
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    ESService,
    MailImporterService,
    MatIconRegistry,
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: {
        float: 'auto'
      }
    },
    AccountService,
    PopService,
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    {
      provide: MailService,
      useClass: FakemailService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
