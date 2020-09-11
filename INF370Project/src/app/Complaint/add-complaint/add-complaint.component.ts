import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Complaint } from 'src/app/Classes/Complaint';
import {Observable} from 'rxjs/observable';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';  
import { FormGroup, FormControl } from '@angular/forms';
import { ComplaintService } from 'src/app/Services/Complaint.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

  complaint  = new Complaint();
  complaintForm: any; 

  
  constructor(private _Router : Router ,private formbulider: FormBuilder,private complaintservice: ComplaintService) { }






// complaintForm = new FormGroup({
//     Details : new FormControl(this.complaint.Details, Validators.required),
//     Photo : new FormControl("", Validators.required),


    
//   })

  ngOnInit(): void {
  }


  // handleFileInput(file: FileList) {
    
  //   this.fileToUpload = file.item(0);
  //   //Show image preview
  //   var reader = new FileReader();
  //   reader.onload = (event:any) => {
  //     this.imageUrl = event.target.result;
  //   }
  //   reader.readAsDataURL(this.fileToUpload);
  // }

  Go(){
    window.alert("You have successfully added a new product");
    this._Router.navigate(['/View']);
  }

  OnSubmit(Name,Description,Price,Discount,Barcode,ProductTypeID,Image){
 




    // this.productservice.postFile(this.prod,this.fileToUpload).subscribe(
    //   data =>{
    //     console.log('done');
    //     Image.value = null;
    //   this.imageUrl = "/assets/img/default-image.jpeg";
    //   });
      
    

    //    Image.value = null;
    //    this.productForm.reset();  
    //    this.imageUrl = "";

    //    this.Go();
    // }

}
}
