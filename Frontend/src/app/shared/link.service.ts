import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login';
  user: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((response) => {
        if (response.token) {
          // Store the token securely (e.g., in an HTTP-only cookie or local storage)
          localStorage.setItem('token', response.token);
          // Decode the token to get user role
          this.user = jwt_decode(response.token);
          // Log the token to the console (for demonstration purposes only)
          console.log('Token:', response.token);
        }
      })
    );
  }


  getUserRole(): string | null {
    // Decode the token and return the user role
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.role; // Assuming 'role' is the name of the claim in the JWT payload
    }
    return null;
  }

  // loggedIn():boolean{
  //   return !!localStorage.getItem('token');
  // }
}