import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  isAdmin$ = of(true);

  constructor() { }
}
