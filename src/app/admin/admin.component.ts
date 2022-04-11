import { Component, OnInit } from '@angular/core';
import{gql,Apollo}from 'apollo-angular'
import{Listing} from '../home/listing.model'

import { map, Observable } from 'rxjs';


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

  const CREATE_LIST=gql`
  mutation AddListing($listing_title:String!,$listing_description:String!,
    $city:String!,$street:String!,$postalcode:String!,$price:String  ,$email:String!){
      addListing(listing_title:$listing_title,
        listing_description:$listing_description,
        city:$city,
        street:$street,
        postal_code:$postalcode,
       price:$price,
        email:$email){
          listing_title
          listing_description
          city
          street
          postal_code
          price
          email
        }
    }
  `

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

 list=[]
  listings!: Observable<any>;
 
  constructor(private apollo:Apollo) { 
   
     //this.getListings()
    // this.getListingByName()
  }

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
//   getListings(){
//   this.apollo.watchQuery<any>({
//     query:GET_LISTING_SEARCH 
//   }).valueChanges.subscribe(res=>{
//     console.log(res.data)
//     this.listings=res.data?.listings
//   })
// }

  // getListingByName(){
  //   const title = "condo"
  //   this.apollo.watchQuery<any>({
  //     query: this.GET_LISTING_SEARCH,
  //     variables:{
  //       listing_title: title
  //     }
  //   }).valueChanges.subscribe(res => {
  //     console.log(res.data)
  //   })
  // }
 
  add(listing_title:string,listing_description:string,city:string,
    street:string,postal_code:string,price:string,  email:string){
    this.apollo.mutate({
      mutation: CREATE_LIST,
     refetchQueries:[{query:GET_LISTING}],
      variables:{
        listing_title:listing_title,
        listing_description:listing_description,
        city:city,
        street:street,
        postal_code:postal_code,
        price:price,
        email:email
      }
    }).subscribe(()=>{
      console.log("create")
    })
  }

}


 


