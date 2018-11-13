import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})

export class LeavePage {
  @ViewChild('fileInput') fileInput;

  show: boolean = false;
  tab_show = true;
  show_type_of_leave = false;
  gaming = 'am'
  type_of_leave = ['Annual', 'Time of in lieu', 'Medical', 'Maternity', 'Compassionate']
  public base64Image: string;
  form: FormGroup;
  constructor(public navCtrl: NavController, formBuilder: FormBuilder, public navParams: NavParams, public menuCtrl: MenuController, private camera: Camera) {
    this.menuCtrl.enable(true, 'myMenu');
    this.form = formBuilder.group({
      profilePic: [''],
    });
  }
  takePicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
      }).then((data) => {
        this.base64Image = 'data:image/jpg;base64,' + data
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavePage');
  }


}
