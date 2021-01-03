import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-s3-bucket',
  templateUrl: './s3-bucket.component.html',
  styleUrls: ['./s3-bucket.component.scss'],
})
export class S3BucketComponent implements OnInit {
  public file: any;
  public fileName: any;
  public fileType: any;
  public img: any;

  constructor() {}

  ngOnInit(): void {}

  handlePhoto = (event) => {
    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onload = (photo) => {
      this.file = photo.target.result;
      this.fileName = file.name;
      this.fileType = file.type;
      this.img = '';
    };
    reader.readAsDataURL(file);
  };

  sendPhoto() {
    // return Axios.post('/api/s3', this.state).then(res => {
    //     //take this res.data.Location and set it to the database as the image
    //     console.log(909090, this.props)
    //     if(this.props.updateUserPic){
    //         console.log("UPDATE USER PICTURE")
    //         this.props.updateUserPic(res.data.Location)
    //     }else if(this.props.setUserPic){
    //         console.log("SET USER PICTURE")
    //         this.props.setUserPic(res.data.Location)
    //     }else if(this.props.updateCarPic){
    //         console.log("UPDATE CAR PICTURE")
    //         this.props.updateCarPic(res.data.Location)
    //     }else if(this.props.setCarPic){
    //         console.log("SET CAR PICTURE")
    //         this.props.setCarPic(res.data.Location)
    //     }else if(this.props.updateDriverPic){
    //         console.log("UPDATE DRIVER PICTURE")
    //         this.props.updateDriverPic(res.data.Location)
    //     }else if(this.props.setDriverPic){
    //         console.log("SET DRIVER PICTURE")
    //         this.props.setDriverPic(res.data.Location)
    //     }else{
    //         console.log('No Pic')
    //     }
    //     console.log(4444, res.data)
    //     this.setState({
    //         img: res.data.Location
    //     })
    // }).catch( res => {
    //     if(res === 'Request failed with status code 413' ){
    //         alert("File Size is too large")
    //     }else {
    //         alert("Something went wrong, try again")
    //     }
    // })
  }
}
