

//TODO have 'staff' have materials? and reference that
export class CraftingItem {
    id: number;
    label: string;
    itemType: CraftingItemType;
    materialOne: CraftingMaterialType;
    materialTwo?: CraftingMaterialType;
    artifact?: CraftingMaterialType;
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
    AlluringCrystal,
    PossessedScroll,
    InfernalScroll
}

export class CraftingItemTypeMaterials {
    id: CraftingItemType;
    materialCounts: number[];
}

export class CraftingMaterialCostEntry {
    material: CraftingMaterialType;
    tier: number;
    cost: number;
    timestamp: Date;
}
export class CraftingItemCostEntry {
    item: CraftingItemType;
    tier: number;
    cost: number;
    timestamp: Date;
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CraftingService {
    private itemsUrl = 'api/craftingItems';
    private itemTypesUrl = 'api/craftingItemTypes';
    private materialsUrl = 'api/craftingMaterials';
    private materialCostHistoryUrl = 'api/materialCostHistory';
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

    getMaterialCostHistory(type: CraftingMaterialType) : Promise<CraftingMaterialCostEntry[]>{
        return this.http.get(this.materialCostHistoryUrl)
            .toPromise()
            .then(response => response.json().data as CraftingMaterialCostEntry[])
            .then(entries => entries
                .filter(e => e.material == type)
                .sort((a, b) => 
                    {
                        if(a.timestamp > b.timestamp) {
                            return 1;
                        }
                        if(a.timestamp < b.timestamp) {
                            return -1;
                        }
                        return 0;
                    }
                ))
            .catch(this.handleError);
    }

    
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}