import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {

  }
  register(value) {
    var data = {
       'name': value.name,
       'branch': value.branch,
       'email' : value.email,
       'phone' : value.phone
     };
      this.http.post('http://laraveldemo.com/api/register', data).subscribe(data => {
        window.location.href('/profile');
    });
  }
}