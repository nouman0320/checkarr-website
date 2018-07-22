import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private webService: WebService) { }


  upload_dp(image: any){
    const formData = new FormData();
    formData.append("test-profile-image", image);
    this.webService.upload_dp(formData).subscribe(
      data =>{
        console.log("SUCCES => DP");
      }
      ,err =>{
        console.log("ERROR => DP");
      },
      () =>{

      }
    );
  }
}
