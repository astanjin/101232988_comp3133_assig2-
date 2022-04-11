import { Component } from '@angular/core';
import{gql,Apollo}from 'apollo-angular'
import{User}from './user.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appolo';
   users=[];

  private USERS=gql`{
     users{
    username
  }
}`
 

constructor( private apollo:Apollo){
 this.getUsers()
}
getUsers(){
  this.apollo.watchQuery<any>({
    query:this.USERS
  }).valueChanges.subscribe(res=>{
    console.log(res.data)
    this.users=res.data?.users
  })
}
}
