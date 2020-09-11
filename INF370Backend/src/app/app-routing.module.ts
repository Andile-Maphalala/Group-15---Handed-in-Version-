import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserComponent } from './User/update-user/update-user.component';
// import { AgentComponent } from './agent/agent.component';
// import { AddAgentComponent } from './Agent/add-agent/add-agent.component';
// import { UpdateAgentComponent } from './Agent/update-agent/update-agent.component';
// import { AssignAgentComponent } from './Agent/assign-agent/assign-agent.component';
import { SearchUserComponent } from './User/search-user/search-user.component';
import { SearchAgentComponent } from './Agent/search-agent/search-agent.component';

import { LocationComponent } from './location/location.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
// import { BrowsepropertiesComponent } from './browseproperties/browseproperties.component';
// import { MakePropertyViewingBookingComponent } from './make-property-viewing-booking/make-property-viewing-booking.component';
// import { ViewPropertyComponent } from './view-property/view-property.component';
// import { MakePaymentComponent } from './make-payment/make-payment.component';
// import { AcceptRentalAgreementComponent } from './accept-rental-agreement/accept-rental-agreement.component';
// import { ApprovedApplicationComponent } from './approved-application/approved-application.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { ViewrepairrequestjobsComponent } from './Maintenance/viewrepairrequestjobs/viewrepairrequestjobs.component';
import { AdditemsComponent } from './Maintenance/additems/additems.component';
import { SetupviewingscheduleComponent } from './Maintenance/setupviewingschedule/setupviewingschedule.component';
import { CapturejobfeedbackComponent } from './Maintenance/capturejobfeedback/capturejobfeedback.component';
import { ExtendDueDateComponent } from './Admin/extend-due-date/extend-due-date.component';
import { ViewextensionrequestComponent } from './Admin/viewextensionrequest/viewextensionrequest.component';
import { LeaseReminderComponent } from './Admin/lease-reminder/lease-reminder.component';
import { ViewTerminationRequestComponent } from './Admin/view-termination-request/view-termination-request.component';
import { PaymentReminderComponent } from './Admin/payment-reminder/payment-reminder.component';
import { ViewRequestedJobsComponent } from './Admin/view-requested-jobs/view-requested-jobs.component';
import { AssignJobsComponent } from './Admin/assign-jobs/assign-jobs.component';
import { ReviewApplicationComponent } from './Admin/review-application/review-application.component';
import { TerminateAgreementComponent } from './Admin/terminate-agreement/terminate-agreement.component';
import { ExtendAgreementComponent } from './Admin/extend-agreement/extend-agreement.component';
import { UpdateAgentComponent } from './Agent/update-agent/update-agent.component';
import { AddAgentComponent } from './Agent/add-agent/add-agent.component';
import { AssignAgentComponent } from './Agent/assign-agent/assign-agent.component';

import { AssignComplaintComponent } from './Complaint/assign-complaint/assign-complaint.component';
import { SearchComplaintComponent } from './Complaint/search-complaint/search-complaint.component';
import { AddFeedbackComponent } from './Complaint/add-feedback/add-feedback.component';
import { UpdateComplaintComponent } from './Complaint/update-complaint/update-complaint.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PropertyComponent } from './Property/property.component';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { MonthlyIncomeReportComponent } from './monthly-income-report/monthly-income-report.component';
import { OverduePaymentReportComponent } from './overdue-payment-report/overdue-payment-report.component';
import { MostViewdPropertiesComponent } from './most-viewd-properties/most-viewd-properties.component';
import { MonthlyinvoiceReportComponent } from './monthlyinvoice-report/monthlyinvoice-report.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';


const routes: Routes = [
  // {path: '', component: BrowsepropertiesComponent},
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'search-user', component: SearchUserComponent },
  { path: 'update-agent', component: UpdateAgentComponent },
  { path: 'add-agent', component: AddAgentComponent },
  { path: 'assign-agent', component: AssignAgentComponent },
  { path: 'search-agent', component: SearchAgentComponent },
  // { path: 'add-complaint', component: AddComplaintComponent },
  { path: 'assign-complaint', component: AssignComplaintComponent },
  { path: 'search-complaint', component: SearchComplaintComponent },
  { path: 'update-complaint', component: UpdateComplaintComponent },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'location', component: LocationComponent },
  { path: 'employeeType', component: EmployeeTypeComponent },
  { path: 'ExpenseReport', component: ExpenseReportComponent },
  { path: 'MonthlyIncomeReport', component: MonthlyIncomeReportComponent },
  // { path: 'browse', component: BrowsepropertiesComponent },
  // { path: 'booking', component: MakePropertyViewingBookingComponent },
  // { path: 'PropertyDetails', component: ViewPropertyComponent },
  // { path: 'Payment', component: MakePaymentComponent },
  // { path: 'AcceptRental', component: AcceptRentalAgreementComponent },
  // { path: 'ApprovedApplicationComponent', component: ApprovedApplicationComponent },
  {path: '', component: LoginComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'viewrepairrequestjobs', component: ViewrepairrequestjobsComponent},
  { path: 'additems', component: AdditemsComponent},
  { path: 'setupviewingschedule', component: SetupviewingscheduleComponent},
  { path: 'capturejobfeedback', component: CapturejobfeedbackComponent},
  { path: 'viewextensionrequest', component: ViewextensionrequestComponent},
  { path: 'extend-due-date', component: ExtendDueDateComponent},
  { path: 'lease-reminder', component: LeaseReminderComponent},
  { path: 'view-termination-request', component: ViewTerminationRequestComponent},
  { path: 'payment-reminder', component: PaymentReminderComponent},
  { path: 'view-requested-jobs', component: ViewRequestedJobsComponent},
  { path: 'assign-jobs', component: AssignJobsComponent},
  { path: 'review-application', component: ReviewApplicationComponent},
  { path: 'extend-agreement', component: ExtendAgreementComponent},
  { path: 'terminate-agreement', component: TerminateAgreementComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'property', component: PropertyComponent},
  { path: 'OverduePaymentReport', component: OverduePaymentReportComponent},
  { path: 'MonthlyIncomeReport', component: MonthlyIncomeReportComponent},
  { path: 'MonthlyinvoiceReport', component: MonthlyinvoiceReportComponent},
  { path: 'MostViewdProperties', component: MostViewdPropertiesComponent},
  { path: 'ViewFeedback', component: ViewFeedbackComponent},
  { path: 'ViewBooking', component: ViewBookingComponent},
  
  
  

  
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }