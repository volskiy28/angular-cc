import { Component, OnInit } from '@angular/core';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public amount:number = 1;
  public currenciesFrom:any;
  public currenciesTo:any;
  public data:any;
  public valueFrom:any;
  public valueTo:any;
  public result:any;
  public flagFrom:string = 'ma'.toLowerCase();
  public flagTo:string = 'us'.toLowerCase();

  public constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    this.getCountriesFrom();
    this.getCountriesTo();
  }

  getCountriesFrom(){
    this.converterService.getCountries().subscribe(data =>
      this.currenciesFrom = Object.entries(data).map((value) => value[0].toUpperCase())
    );
  }

  getCountriesTo(){
    this.converterService.getCountries().subscribe(data =>
      this.currenciesTo = Object.entries(data).map((value) => value[0].toUpperCase())
    );
  }

  convertCurrency(from:any, to:any){
    this.converterService.convert(from, to).subscribe(data => {
      this.data = Object.entries(data).map(x => x[1])
      this.valueFrom = Object.entries(this.data[4]).map(x => x[1])[0]
      this.valueTo = Object.entries(this.data[4]).map(x => x[1])[1]
      this.result = (this.amount * (this.valueTo/this.valueFrom))
      console.log(this.result)
    });
  }

  getFlag(flag?:any, to?:any){
    this.flagFrom = flag.toString().slice(0, -1).toLowerCase();
    this.flagTo = to.toString().slice(0, -1).toLowerCase();
    console.log(this.flagFrom);
  }

}
