import { Component, OnInit } from '@angular/core';
import{gql,Apollo}from 'apollo-angular'
import { map, Observable } from 'rxjs';

import{Listing} from './listing.model'
 const GET_LISTING=gql`{
  
listings{
  user{
    username
  }
  listing_title
   listing_description
          city
          street
          postal_code
          price
          email

}
}`
  const GET_LISTING_SEARCH=gql`
  query GetListingByTitle($listing_title: String!){
    listingsByName(listing_title:$listing_title){
  user{
    username
  }
  listing_title
  listing_description
  city
  street
  postal_code
  price
  email
}
  }`

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list=[]
  listings!: Observable<any>;
 
  constructor(private apollo:Apollo) { 
   
     
    this.getListingByName()
  }
  name="condo"

  ngOnInit(): void {
    this.listings=this.apollo
    .watchQuery({
      query:GET_LISTING,
    })
    .valueChanges.pipe(
      map((result:any)=>{
        console.log(result.data)
        return result.data
      })
    )
  }


  getListingByName(){
    const title = "condo"
    this.apollo.watchQuery<any>({
      query: GET_LISTING_SEARCH,
      variables:{
        listing_title: title
      }
    }).valueChanges.subscribe(res => {
      console.log(res.data)
      this.list= res.data?.listingsByName
    })
  }
 
 

}
 


