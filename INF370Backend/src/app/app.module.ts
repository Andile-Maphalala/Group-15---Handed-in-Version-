import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import { UpdateUserComponent } from './User/update-user/update-user.component';
import { AgentComponent } from './agent/agent.component';
 import { AddAgentComponent } from './Agent/add-agent/add-agent.component';
import { UpdateAgentComponent } from './Agent/update-agent/update-agent.component';
import { AssignAgentComponent } from './Agent/assign-agent/assign-agent.component';
import { SearchAgentComponent } from './Agent/search-agent/search-agent.component';
import { AssignComplaintComponent } from './Complaint/assign-complaint/assign-complaint.component';
import { SearchComplaintComponent } from './Complaint/search-complaint/search-complaint.component';
import { UpdateComplaintComponent } from './Complaint/update-complaint/update-complaint.component';
import { AddFeedbackComponent } from './Complaint/add-feedback/add-feedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
// import { BrowsepropertiesComponent } from './browseproperties/browseproperties.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { MakePropertyViewingBookingComponent } from './make-property-viewing-booking/make-property-viewing-booking.component';
// import { ViewPropertyComponent } from './view-property/view-property.component';
// import { MakePaymentComponent } from './make-payment/make-payment.component';
// import { AcceptRentalAgreementComponent } from './accept-rental-agreement/accept-rental-agreement.component';
// import { ApprovedApplicationComponent } from './approved-application/approved-application.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { SearchUserComponent } from './User/search-user/search-user.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { UpdatePropertyComponent } from './property/update-property/update-property.component';
import { SearchPropertyComponent } from './property/search-property/search-property.component';
import { DeletePropertyComponent } from './property/delete-property/delete-property.component';
import { AddPropertyTypeComponent } from './property-Type/add-property-type/add-property-type.component';
import { UpdatePropertyTypeComponent } from './property-Type/update-property-type/update-property-type.component';
import { SearchPropertyTypeComponent } from './property-Type/search-property-type/search-property-type.component';
import { DeletePropertyTypeComponent } from './property-Type/delete-property-type/delete-property-type.component';
import { ViewrepairrequestjobsComponent } from './Maintenance/viewrepairrequestjobs/viewrepairrequestjobs.component';
import { AdditemsComponent } from './Maintenance/additems/additems.component';
import { SetupviewingscheduleComponent } from './Maintenance/setupviewingschedule/setupviewingschedule.component';
import { CapturejobfeedbackComponent } from './Maintenance/capturejobfeedback/capturejobfeedback.component';
import { ViewextensionrequestComponent } from './Admin/viewextensionrequest/viewextensionrequest.component';
import { ExtendDueDateComponent } from './Admin/extend-due-date/extend-due-date.component';
import { LeaseReminderComponent } from './Admin/lease-reminder/lease-reminder.component';
import { ViewTerminationRequestComponent } from './Admin/view-termination-request/view-termination-request.component';
import { TerminateAgreementComponent } from './Admin/terminate-agreement/terminate-agreement.component';
import { PaymentReminderComponent } from './Admin/payment-reminder/payment-reminder.component';
import { ViewRequestedJobsComponent } from './Admin/view-requested-jobs/view-requested-jobs.component';
import { AssignJobsComponent } from './Admin/assign-jobs/assign-jobs.component';
import { ReviewApplicationComponent } from './Admin/review-application/review-application.component';
import { ExtendAgreementComponent } from './Admin/extend-agreement/extend-agreement.component';
import { HomePageComponent } from './home-page/home-page.component';
import { IsLoggedInComponent } from './is-logged-in/is-logged-in.component';
import { PropertyComponent } from './Property/property.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { NavComponent } from './nav/nav.component';
import { UsernameComponent } from './username/username.component';
import { OverduePaymentReportComponent } from './overdue-payment-report/overdue-payment-report.component';
import { MonthlyIncomeReportComponent } from './monthly-income-report/monthly-income-report.component';
import { MonthlyinvoiceReportComponent } from './monthlyinvoice-report/monthlyinvoice-report.component';
import { MostViewdPropertiesComponent } from './most-viewd-properties/most-viewd-properties.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
@NgModule({ 
  declarations: [
    AppComponent,
    AddUserComponent,
    UpdateUserComponent,
     AgentComponent,
     AddAgentComponent,
     UpdateAgentComponent,
     AssignAgentComponent,
    SearchUserComponent,
    SearchAgentComponent,
    
     AssignComplaintComponent,
     SearchComplaintComponent,
     UpdateComplaintComponent,
     AddFeedbackComponent,
    LocationComponent,
    EmployeeTypeComponent,
    EmployeeComponent,
    HomePageComponent,
    // BrowsepropertiesComponent,
    // MakePropertyViewingBookingComponent,
    // ViewPropertyComponent,
    // MakePaymentComponent,
    // ApprovedApplicationComponent,
    // AcceptRentalAgreementComponent,
    LoginComponent,
   
    UpdateUserComponent,
    SearchUserComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    SearchPropertyComponent,
    DeletePropertyComponent,
    AddPropertyTypeComponent,
    UpdatePropertyTypeComponent,
    SearchPropertyTypeComponent,
    DeletePropertyTypeComponent,
    LoginComponent,
    ViewrepairrequestjobsComponent,
    AdditemsComponent,
    SetupviewingscheduleComponent,
    CapturejobfeedbackComponent,
    ViewextensionrequestComponent,
    ExtendDueDateComponent,
    LeaseReminderComponent,
    ViewTerminationRequestComponent,
    TerminateAgreementComponent,
    PaymentReminderComponent,
    ViewRequestedJobsComponent,
    AssignJobsComponent,
    ReviewApplicationComponent,
    ExtendAgreementComponent,
    IsLoggedInComponent,
    PropertyComponent,
    PropertyTypeComponent,
    NavComponent,
    UsernameComponent,
    OverduePaymentReportComponent,
    MonthlyIncomeReportComponent,
    MonthlyinvoiceReportComponent,
    ExpenseReportComponent,
    MostViewdPropertiesComponent,
    ViewFeedbackComponent,
    ViewBookingComponent,
    ReviewApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }