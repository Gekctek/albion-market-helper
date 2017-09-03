

//TODO have 'staff' have materials? and reference that
export class CraftingItem {
    id: number;
    label: string;
    itemType: CraftingItemType;
    materialOne: CraftingMaterialType;
    materialTwo?: CraftingMaterialType;
    artifact: boolean;
}

export enum CraftingItemType {
    OneHandedWeapon,
    TwoHandedWeapon,
    Tome,
    Shield,
    Helmet,
    Chest,
    Boots
}

export enum CraftingMaterialType {
    Leather,
    Cloth,
    Plank,
    Bar,
    AlluringCrystal
}

export class CraftingItemTypeMaterials {
    id: CraftingItemType;
    materialCounts: number[];
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CraftingService {
    private itemsUrl = 'api/craftingItems';
    private itemTypesUrl = 'api/craftingItemTypes';
    private materialsUrl = 'api/craftingMaterials';
    private headers = new Headers({'Content-Type': 'application/json'});
    
   constructor(private http: Http) { }
   
        getItems(): Promise<CraftingItem[]> {
             return this.http.get(this.itemsUrl)
             .toPromise()
             .then(response => response.json().data as CraftingItem[])
             .catch(this.handleError);
         };
     
         getItem(id: number): Promise<CraftingItem> {
             const url = `${this.itemsUrl}/${id}`;
             return this.http.get(url)
                 .toPromise()
                 .then(response => response.json().data as CraftingItem)
                 .catch(this.handleError);
         };
         
        getItemTypes(): Promise<CraftingItemTypeMaterials[]> {
            return this.http.get(this.itemTypesUrl)
            .toPromise()
            .then(response => response.json().data as CraftingItemTypeMaterials[])
            .catch(this.handleError);
        };
    
        getItemType(id: number): Promise<CraftingItemTypeMaterials> {
            const url = `${this.itemTypesUrl}/${id}`;
            return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as CraftingItemTypeMaterials)
                .catch(this.handleError);
        };
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}