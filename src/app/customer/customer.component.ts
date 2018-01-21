import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from './customer.component.service';
import { Customer } from './customer.interface'

@Component({
  selector: 'app-customer',
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerList: any = [];
  keyword: string = "";
  curPage: number;
  pageSize: number;

  constructor(private _CustomerService: CustomerService, private customer: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.curPage = 1;
    this.pageSize = 3;
    this.getCustomers();
  }

  numberOfPages() {
    return Math.ceil(this.customerList.length / this.pageSize);
  };

  //To Search Keyword
  searchKeyword() {
    if (this.keyword == "" || this.keyword == undefined) {
      this.getCustomers();
    } else {
      this._CustomerService.searchKeyword(this.keyword).subscribe(
        data => {
          this.customerList = data.data;
        },
        error => {
          console.log("error", error)
        }
      )
    }

  }

  //To Open Add Customer Modal
  openAddCustomer() {
    let dialogRef = this.dialog.open(AddCustomerComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomers();
    });
  }

  //To Open Edit Customer Modal
  openEditCustomer(i) {
    let dialogRef = this.dialog.open(EditCustomerComponent, {})
    dialogRef.componentInstance.customerDetail = this.customerList[i];
    dialogRef.afterClosed().subscribe(result => {
      this.getCustomers();
    });
  }

  //To get List of Customer
  getCustomers() {
    this._CustomerService.getCustomers().subscribe(
      data => {
        this.customerList = data.data;
      },
      error => {
        console.log("error", error)
      }
    )
  }

  //To Delete Customer
  deleteCustomer(Id) {
    if (confirm("Are you sure to delete")) {
      this._CustomerService.deleteCustomer(Id).subscribe(
        data => {
          this.getCustomers();
          alert("Deleted");
        },
        error => {
          console.log("error", error)
        }
      )
    }
  }

}

//Add Customer Component Modal
@Component({
  selector: 'add-customer',
  providers: [CustomerService],
  templateUrl: './addCustomer.component.html',
  styleUrls: ['./customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomerForm: FormGroup;
  customerName: string = '';
  address: string = '';
  phone: string = '';
  dob: string = '';
  email: string = '';
  public customerDetail: any;

  constructor(private _CustomerService: CustomerService, private customer: FormBuilder, public dialogRef: MatDialogRef<any>) {
    this.addCustomerForm = customer.group({
      customerName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      dob: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      address: customer.array([])
    });
  }

  ngOnInit() {
    this.addAddress();
  }

  initAddress() {
    return this.customer.group({
      flat: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  addAddress() {
    const control = <FormArray>this.addCustomerForm.controls['address'];
    const addrCtrl = this.initAddress();
    control.push(addrCtrl);
  }

  removeAddress(i: number) {
    const control = <FormArray>this.addCustomerForm.controls['address'];
    control.removeAt(i);
  }

  saveCustomer() {
    this._CustomerService.saveCustomer(this.customerName, this.addCustomerForm.value.address, this.phone, this.dob, this.email).subscribe(
      data => {
        this.dialogRef.close();
        alert("Saved")
      },
      error => {
        console.log("error", error)
      }
    )
  }

  cancel() {
    this.dialogRef.close();
  }

}

//Edit Customer Modal
@Component({
  selector: 'edit-customer',
  providers: [CustomerService],
  templateUrl: './editCustomer.component.html',
  styleUrls: ['./customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editCustomerForm: FormGroup;
  customerName: string = '';
  address: string = '';
  phone: string = '';
  dob: string = '';
  email: string = '';
  customerList: any;
  customerDetail: any;

  constructor(private _CustomerService: CustomerService, private customer: FormBuilder, public dialogRef: MatDialogRef<any>) {

    this.editCustomerForm = customer.group({
      customerName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      dob: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      address: customer.array([])
    });
  }

  ngOnInit() {
    this.customerName = this.customerDetail.name;
    this.phone = this.customerDetail.phone;
    this.dob = this.customerDetail.dob;
    this.email = this.customerDetail.email;
    this.patch();
  }

  patch() {
    // the formarray
    var control = <FormArray>this.editCustomerForm.controls['address'];
    // iterate your object and pushes new values
    this.customerDetail.address.forEach(x => {
      control.push(this.patchValues(x.flat, x.street, x.state, x.pincode))
    })
  }

  // assign the values
  patchValues(flat, street, state, pincode) {
    return this.customer.group({
      flat: [flat],
      street: [street],
      state: [state],
      pincode: [pincode]
    })
  }

  initAddress() {
    return this.customer.group({
      flat: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  addAddress() {
    const control = <FormArray>this.editCustomerForm.controls['address'];
    const addrCtrl = this.initAddress();
    control.push(addrCtrl);
  }

  removeAddress(i: number) {
    const control = <FormArray>this.editCustomerForm.controls['address'];
    control.removeAt(i);
  }

  //To Edit customer Details
  editCustomer() {
    this._CustomerService.editCustomer(this.customerDetail._id, this.customerName, this.editCustomerForm.value.address, this.phone, this.dob, this.email).subscribe(
      data => {
        this.dialogRef.close();
        alert("Updated")
      },
      error => {
        console.log("error", error)
      }
    )
  }

  cancel() {
    this.dialogRef.close();
  }

}

//Address Component
@Component({
  moduleId: module.id,
  selector: 'address',
  templateUrl: './address.component.html',
})
export class AddressComponent {
  @Input('group')
  public adressForm: FormGroup;
}

