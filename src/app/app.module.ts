import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGaugeModule } from 'ngx-gauge';
import { ProgressBarModule } from 'primeng/progressbar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllpercentageComponent } from './lastpage/allpercentage/allpercentage.component';
import { IndividualpercentComponent } from './lastpage/individualpercent/individualpercent.component';
import { ButtonsComponent } from './lastpage/buttons/buttons.component';
import { AngularGaugeComponent } from './lastpage/angular-gauge/angular-gauge.component';
import { ResumedescriptionuploadComponent } from './firstpage/resumedescriptionupload/resumedescriptionupload.component';
import { SkillmatchComponent } from './secondpage/skillmatch/skillmatch.component';
import { ResponseCaptureComponent } from './thirdpage/response-capture/response-capture.component';
import { AnswerEvaluationComponent } from './fourthpage/answer-evaluation/answer-evaluation.component';
import { GaugesecondComponent } from './secondpage/gaugesecond/gaugesecond.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllpercentageComponent,
    IndividualpercentComponent,
    ButtonsComponent,
    AngularGaugeComponent,
    ResumedescriptionuploadComponent,
    SkillmatchComponent,
    AnswerEvaluationComponent,
    ResponseCaptureComponent,
    GaugesecondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGaugeModule,
   ProgressBarModule, 
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
