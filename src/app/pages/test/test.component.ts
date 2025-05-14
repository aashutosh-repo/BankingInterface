import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatCardModule,MatTableModule,MatFormFieldModule,
    MatRadioModule
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  ngOnInit(): void {
   this.dataSource.data=this.studentList;
  }

   studentList : Students[] =[
    {
      firstName:'Aashu',
      lastName:'Kumar',
      age:26,
      rollNum: 182625
      },
    {
      firstName:'string',
      lastName:'string',
      age:12,
      rollNum: 1234}
   ];

  displayColumns:string[]=[
    'firstName',
    'lastName',
    'age',
    'rollNum'
  ]

  selectedLanguage: string = 'english';

  get displayText(): string {
    return this.selectedLanguage === 'english'
      ? 'My name is Aashutosh'
      : 'मेरा नाम आशुतोष है';
  }

  
  dataSource = new MatTableDataSource<Students>([]);

}
interface Students {
    firstName:string
    lastName:string
    age:number
    rollNum: number
}