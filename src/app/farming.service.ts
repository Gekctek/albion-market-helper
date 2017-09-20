
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class Plant {
    public tier: number;
    public yield: number;
    public waterBonus: number;
    public crop: string;
    public herb: string;
}

@Injectable()
export class FarmingService {
    private plantsUrl = 'api/plants';
    private headers = new Headers({'Content-Type': 'application/json'});
    
   constructor(private http: Http) { }
   
    getPlants(): Promise<Plant[]> {
            return this.http.get(this.plantsUrl)
            .toPromise()
            .then(response => response.json().data as Plant[])
            .catch(this.handleError);
        }; 
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}