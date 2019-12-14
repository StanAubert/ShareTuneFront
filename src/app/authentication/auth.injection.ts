import { InjectionToken } from '@angular/core';
import { AuthServiceInterface } from './auth.interface';

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>('Service class to use for authentication');
