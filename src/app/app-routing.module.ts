import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumedescriptionuploadComponent } from './firstpage/resumedescriptionupload/resumedescriptionupload.component';
import { SkillmatchComponent } from './secondpage/skillmatch/skillmatch.component';
import { ResponseCaptureComponent } from './thirdpage/response-capture/response-capture.component';
import { AllpercentageComponent } from './lastpage/allpercentage/allpercentage.component';
import { AnswerEvaluationComponent } from './fourthpage/answer-evaluation/answer-evaluation.component';


const routes: Routes = [  {path: '', redirectTo: '/resumedescriptionupload', pathMatch: 'full'},
{path: 'allpercentage', component: AllpercentageComponent},
{path: 'resumedescriptionupload', component: ResumedescriptionuploadComponent},
{path: 'skillmatch', component: SkillmatchComponent},
{path: 'response-capture', component: ResponseCaptureComponent},
{path: 'answer-evaluation', component: AnswerEvaluationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
