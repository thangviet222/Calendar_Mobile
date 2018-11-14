import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from '../../providers/login/loginAuth'
import { LoginPage } from '../login/login';


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
  showleave = false;
  type_of_leave = ['Annual', 'Time of in lieu', 'Medical', 'Maternity', 'Compassionate']
  public base64Image: string;
  form: FormGroup;
  fromdate = '2018-12-20'
  toDate = '2018-12-29'
  constructor(public navCtrl: NavController,
    formBuilder: FormBuilder,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private camera: Camera,
    public loginService: LoginProvider,
    public actionSheetCtrl: ActionSheetController) {
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
  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.base64Image = imageData;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select photo',
      buttons: [
        {
          text: 'Select from a album',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        }, {
          text: 'Text a picture',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA)
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  getProfileImageStyle() {
    return 'url(' + this.base64Image + ')'
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavePage');
  }

  // async canEnter() {
  //   let check = await this.loginService.auth();
  //   if (!check) {
  //     console.log(this.loginService.auth());

  //     this.navCtrl.setRoot(LoginPage);
  //   }
  //   console.log(this.loginService.auth());

  // }
}
