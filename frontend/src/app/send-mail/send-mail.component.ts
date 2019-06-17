import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  sendMail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    message:new FormControl(null,Validators.required),
    subject:new FormControl(null,Validators.required)
    
  })

  constructor(private _router:Router, private _user:UserService ) {}

  ngOnInit() {
  }
  mail(){
    console.log("hello")
    console.log(this.sendMail.value)
  

    this._user.mail(JSON.stringify(this.sendMail.value))
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/user']);},
      error=>console.error(error)
    )
    console.log(JSON.stringify(this.sendMail.value));
   }
}
