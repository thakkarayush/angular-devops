import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenServiceService {

  authToken: string = ""
  userId: number = 0
  constructor() { }

}