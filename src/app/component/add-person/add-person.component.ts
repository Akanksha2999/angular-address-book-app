import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  public person: AddressBook = new AddressBook();
  personFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.personFormGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['personId'] != undefined) {
      this.dataService.currentPerson.subscribe(person => {
        if (Object.keys(person).length !== 0) {
          console.log(person);
          this.personFormGroup?.get('firstName')?.setValue(person.firstName);
          this.personFormGroup?.get('lastName')?.setValue(person.lastName);
          this.personFormGroup?.get('gender')?.setValue(person.gender);
          this.personFormGroup?.get('emailId')?.setValue(person.emailId);
          this.personFormGroup?.get('address')?.setValue(person.address);
          this.personFormGroup?.get('city')?.setValue(person.city);
          this.personFormGroup?.get('state')?.setValue(person.state);
          this.personFormGroup?.get('zipCode')?.setValue(person.zipCode);
          this.personFormGroup?.get('phoneNumber')?.setValue(person.phoneNumber);
        }
      });
    }
  }

  onSubmit() {
    this.person = this.personFormGroup.value;
    if (this.activatedRoute.snapshot.params['personId'] != undefined) {
      this.httpService.updateContact(this.activatedRoute.snapshot.params['personId'], this.person).subscribe(response => {
        console.log(response);
        this.ngOnInit();
        this.router.navigateByUrl("/home-page");
      });
    } else {
      this.httpService.addNewContact(this.person).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/home-page");
      });
    }
  }
}





