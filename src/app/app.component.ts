import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  //any invalid names should be kept in this array
  invalidProjectNames = ["Test"]

  statuses = ['Stable', 'Critical', 'Finished']

  //for the reactive approach, MUST go to app module and imoprt the reactive 
  //version of the forms module instead fof the regular (template driven) one
  signupForm: FormGroup;

  ngOnInit()
  {
    //if you have nested formGroups, you need to either specify goign betweent them
    //in the HTML references, or you can also wrap elements inside of a sub-div that 
    //has a formGroupName of the nested group
    this.signupForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.validateProjectName.bind(this)),
      //can also add a single validator instead of array as desired
      //teh second array is for async validators
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    })
  }

  onSubmit()
  {
    console.log(this.signupForm.value)
  }

  //sync version of validator th check project name
  // validateProjectName(control: FormControl): {[s: string]: boolean}
  // {
  //   if(this.invalidProjectNames.indexOf(control.value) !== -1)
  //   {
  //     return {'invalidProjectName': true}
  //   }
  //   else
  //   {
  //     return null;
  //   }
  // }

  validateProjectName(control: FormControl): Promise<any> | Observable<any>
  {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(this.invalidProjectNames.indexOf(control.value) !== -1)
        {
          resolve({'invalidProjectName': true})
        }
        else
        {
          resolve(null)
        }
      }, 2000)
    });

    return promise
  }

}
