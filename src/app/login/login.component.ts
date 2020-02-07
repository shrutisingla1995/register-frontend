import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  login(value) {
    var data = {
       'email': value.email,
       'password': value.password
     };
    this.http.post('http://laraveldemo.com/api/login', data).subscribe(data => {
      if(data.success){
        localStorage.setItem('currentUser', value.email);
        window.location.href = '/profile';
      }else{
        alert(data.message);
      }
    });
  }

}
