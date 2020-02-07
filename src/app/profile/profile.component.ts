import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  currentProfile = {};
  fileToUpload: File = null;
  imageUrl: string = "";
  photos= {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile(){
    this.http.get('http://laraveldemo.com/api/get-profile',{params:{email:this.currentUser}}).subscribe(data => {
      if(data.success){
        this.currentProfile = data.user;
        if(this.currentProfile["photos"]){
          this.photos = JSON.parse(this.currentProfile["photos"]);
          console.log('photos',this.photos);
        }
      }else{
        alert(data.message);
      }
     }, error => console.error(error));
  }
  saveProfile(value){
    var data = {
      'name': value.name,
      'branch': value.branch,
      'email' : value.email,
      'about' : value.about,
      'profile' : value.profile,
      'contact' : value.contact,
      'address' : value.address
    };
     this.http.post('http://laraveldemo.com/api/save-profile', data).subscribe(data => {
       if(data.success){
        
       }else{
         alert(data.message);
       }
   });
  }
  handleInputFile(file: FileList, photo){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.OnSubmit(photo);
  }

  OnSubmit(photo){
    const formData: FormData = new FormData();
    formData.append("image", this.fileToUpload, this.fileToUpload.name);
    this.http.post('http://laraveldemo.com/api/upload-photo', formData).subscribe(
      data => {
        photo.value = "";
      }
    );
  }
  deletePhoto(photos,index){
    photos.splice(index,1);
    var data={
      photos:photos,
      email:this.currentUser
    }
    this.http.post('http://laraveldemo.com/api/delete-photo', data).subscribe(
      data => {
        console.log("Done");
      }
    );
  }

}
