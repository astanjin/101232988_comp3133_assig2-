import { Component, OnInit } from '@angular/core';
import{gql,Apollo}from 'apollo-angular'
import{Listing} from '../home/listing.model'


@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    listings=[]
  
  private GET_LISTINGS=gql`{
listings{
  user{
    username
  }
  listing_title
  listing_description
  street
  city
  postal_code
  price
  email
}
}`


  constructor(private apollo:Apollo) { 
    this.getListings()
  
  }

  ngOnInit(): void {
  }
 getListings(){
  this.apollo.watchQuery<any>({
    query:this.GET_LISTINGS
  }).valueChanges.subscribe(res=>{
    console.log(res.data)
    this.listings=res.data?.listings
  })
}

}
