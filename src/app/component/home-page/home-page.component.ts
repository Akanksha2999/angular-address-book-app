import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressBook } from 'src/app/model/address-book';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public personDetails: AddressBook[] = [];

  constructor(private httpService: HttpService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.httpService.getContactsData().subscribe(data => {
      this.personDetails = data.data;
      console.log(this.personDetails);
    });
  }

  remove(personId: number): void {
    console.log(personId);
    alert('Delete contact with id:' + personId + '?')
    this.httpService.deleteContact(personId).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }

  update(person: AddressBook): void {
    alert('Update contact with id:' + person.personId + '?')
    this.dataService.changePerson(person);
    this.router.navigateByUrl('/add-person/' + person.personId);
    this.httpService.updateContact(person.personId, person).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }
}






