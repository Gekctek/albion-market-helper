import { Component, OnInit } from '@angular/core';
import { CraftingItem, CraftingService, CraftingItemTypeMaterials, CraftingItemType, CraftingMaterialType } from './crafting.service';


@Component({
    selector: 'crafting-calc',
    templateUrl: './crafting-calc.component.html',
    styleUrls: ['./crafting-calc.component.css']
})
export class CraftingCalcComponent implements OnInit {
    constructor(private craftingService: CraftingService){}


    NoFocusCoef: number = 1.15;
    FocusCoef: number = 1.45;

    
    tiers: number[];
    items: CraftingItem[];
    itemTypeMaterials: Map<CraftingItemType, CraftingItemTypeMaterials>;

    selectedItem: CraftingItem;
    selectedTier: number;

    materialOne: MaterialInfo;
    materialTwo?: MaterialInfo;
    artifact: number = 0;
    sellPrice: number = 0;

    ngOnInit(): void {
        this.tiers = [3, 4, 5, 6, 7, 8];
        this.craftingService.getItems()
        .then(items => this.items = items);

        this.craftingService.getItemTypes()
        .then(itemTypeMaterials => this.itemTypeMaterials = new Map<CraftingItemType, CraftingItemTypeMaterials>(itemTypeMaterials.map(t => [t.id, t] as [CraftingItemType, CraftingItemTypeMaterials])));    
    }

    onChange(newValue: any){
        this.materialOne = this.getMaterialInfo(this.selectedTier, 0, this.selectedItem.itemType, this.selectedItem.materialOne);
        this.materialTwo = this.getMaterialInfo(this.selectedTier, 1, this.selectedItem.itemType, this.selectedItem.materialTwo);
        this.artifact = 0;
    }

    private getMaterialInfo(tier: number, index: number, itemType: CraftingItemType, materialType?: CraftingMaterialType) : MaterialInfo {
        var itemTypeMaterial = this.itemTypeMaterials.get(itemType);
        if(materialType == null || itemTypeMaterial.materialCounts.length <= index){
            return null;
        }
        var count = itemTypeMaterial.materialCounts[index];
        return {cost: 0, count};
    }

    sum(info?: MaterialInfo) : number {
        if(!info){
            return 0;
        }
        return info.cost * info.count;
    }

    totalCost(coef: number = 1) : number {
       return ((this.sum(this.materialOne) + this.sum(this.materialTwo)) * coef) + this.artifact;
    }
}

class MaterialInfo {
    cost: number;
    count: number;
}