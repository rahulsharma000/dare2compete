import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoachService } from '../../_services/coach/coach.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  hidden = false;



  seatBookForm: FormGroup;
  submitted = false
  seat:any;
  total_seat_no="";
  seat_book="";
  seat_avl="";
  constructor(
    private coachService:CoachService,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.coachService.getAll().subscribe(data=>
      {
        let data_obj = JSON.parse(data);
        this.seat=data_obj['response_data'];
      //   console.log(this.seat);
      })

      this.coachService.getCountData().subscribe(data=>
        {

          let data_obj = JSON.parse(data);
          this.seat_book=data_obj['response_data'];
          this.seat_avl=data_obj['seat_available'];

        })


      this.seatBookForm = new FormGroup({
        total_seat_no: new FormControl('', Validators.required)

      })

  }





  onSubmit()
  { 
    this.submitted = true;
    if (this.seatBookForm.invalid) 
    { 
      return;
    }
    this.total_seat_no=this.seatBookForm.value.total_seat_no;
     
    if(this.total_seat_no >'7')
    {
      this.openSnackBar('You can book upto 7 seat','Ok');
    }
    
    else if(this.total_seat_no=='0')
    {
      this.openSnackBar('Please enter your number 1 to 7','okk');
    }
    else
    {
        
              let record = {};
        record['total_seat_no'] = this.total_seat_no;

        this.coachService.getBooked(record).subscribe(data=>
          {
            let data_obj = JSON.parse(data);
         // console.log(data_obj);

          if(data_obj['status']=='success')
            {
              this.openSnackBar(data_obj.message,'Ok');
               window.location.reload();
            }
            else if(data_obj['status']=='errors')
            {
              this.openSnackBar(data_obj.message,'Ok');
            }


        });

    }
   




  }  

  ResetForm() {
    this.seatBookForm.reset();
  } 


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
  } 


}
