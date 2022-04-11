import { Component, OnInit } from '@angular/core';
import { Booking } from '../customer/booking.model';
import{gql,Apollo}from 'apollo-angular'

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
bookings=[]
  private GET_BOOKING=gql`{
  bookings{
    user{
      username
    }
    listing{
      listing_title
      city
      price
    }
  }
  
}
`
  constructor(private apollo:Apollo) { 
    this.getbookings()
  }

  ngOnInit(): void {
  }






 
 
 getbookings(){
  this.apollo.watchQuery<any>({
    query:this.GET_BOOKING
  }).valueChanges.subscribe(res=>{
    console.log(res.data)
    this.bookings=res.data?.bookings
  })
}
}

