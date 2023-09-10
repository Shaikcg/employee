import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  searchBySalary : boolean = false; 
  searchText: string;
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === "/employee-salary/5000"){
     
      this.searchBySalary = true;
    }
    this.getEmployees();
  }

   searchKey(data: string) {
    this.searchText = data;
    this.search();
   }

  search() {
     this.employees = this.searchText === ""? this.employees : this.employees.filter((element) => {
       return element.firstName == this.searchText || element.lastName == this.searchText || element.phone == this.searchText 
       || element.emailId == this.searchText || element.address == this.searchText;
     });
  }
  private getEmployees(){
    if(this.searchBySalary){
      this.employeeService.salaryEmployee("5000").subscribe(data => {
        this.employees = data;
      });
    }else{
      this.employeeService.getEmployeesList().subscribe(data => {
        this.employees = data;
      });
    }

  }

  private searchEmployees(){
    
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
}
