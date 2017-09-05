import { Component, OnInit } from '@angular/core';
import { 
    CraftingItem, 
    CraftingService, 
    CraftingItemTypeMaterials, 
    CraftingItemType, 
    CraftingMaterialType,
    ArtifactType } from './crafting.service';


@Component({
    selector: 'crafting-calc',
    templateUrl: './crafting-calc.component.html',
    styleUrls: ['./crafting-calc.component.css']
})
export class CraftingCalcComponent implements OnInit {
    constructor(private craftingService: CraftingService) { }


    NoFocusCoef: number = 1.15;
    FocusCoef: number = 1.45;
    MarketTax: number = .02;
    CraftingTax: number = .1;


    tiers: number[];
    materialValues: Map<number, number>;
    artifactValues: Map<number, number>;
    artifactRanks: Map<ArtifactType, number>;

    items: CraftingItem[];
    itemTypeMaterials: Map<CraftingItemType, CraftingItemTypeMaterials>;

    selectedItem: CraftingItem;
    selectedTier: number = 4;
    itemCount: number = 1;
    materialOne: MaterialInfo;
    materialTwo?: MaterialInfo;
    artifact: number = 0;
    sellPrice: number = 0;

    ngOnInit(): void {
        this.tiers = [3, 4, 5, 6, 7, 8];
        this.materialValues = new Map<number, number>([
            [3, 6],
            [4, 14],
            [4.1, 30],
            [4.2, 54],
            [4.3, 102],
            [5, 30],
            [5.1, 61],
            [5.2, 118],
            [5.3, 229],
            [6, 62],
            [6.1, 125],
            [6.2, 246],
            [6.3, 485],
            [7, 126],
            [7.1, 253],
            [7.2, 502],
            [7.3, 997],
            [8, 254],
            [8.1, 509],
            [8.2, 1014],
            [8.3, 2021],
        ]);

        this.artifactValues = new Map<number, number>([
            [4, 128],
            [5, 256],
            [6, 512],
            [7, 1024],
            [8, 2032]
        ]);

        var artifactRankMap = [
            [1, 
                [
                    ArtifactType.AlluringCrystal
                ]
            ],
            [2, 
                [
                    
                ]
            ],
            [3, 
                [
                    ArtifactType.PossessedScroll
                ]
            ],
            [4, 
                [
                    
                ]
            ],
            [9, 
                [
                    
                ]
            ],
            [12, 
                [
                    ArtifactType.InfernalScroll
                ]
            ]            
        ];

        this.artifactRanks = new Map<ArtifactType, number>();
        artifactRankMap.forEach(r => {
            (<ArtifactType[]>r[1]).forEach(t => {
                this.artifactRanks.set(t, <number>r[0])
            });
        });


        this.craftingService.getItems()
            .then(items => this.items = items);

        this.craftingService.getItemTypes()
            .then(itemTypeMaterials => this.itemTypeMaterials = new Map<CraftingItemType, CraftingItemTypeMaterials>(itemTypeMaterials.map(t => [t.id, t] as [CraftingItemType, CraftingItemTypeMaterials])));
    }

    onChange(newValue: any) {
        this.materialOne = this.getMaterialInfo(this.selectedTier, 0, this.selectedItem.itemType, this.selectedItem.materialOne);
        this.materialTwo = this.getMaterialInfo(this.selectedTier, 1, this.selectedItem.itemType, this.selectedItem.materialTwo);
        this.artifact = 0;
    }

    private getMaterialInfo(tier: number, index: number, itemType: CraftingItemType, materialType?: CraftingMaterialType): MaterialInfo {
        var itemTypeMaterial = this.itemTypeMaterials.get(itemType);
        if (materialType == null || itemTypeMaterial.materialCounts.length <= index) {
            return null;
        }
        var count = itemTypeMaterial.materialCounts[index];
        //TODO
        return { cost: 0, count };
    }

    sum(info: MaterialInfo, coef: number = 1): number {
        if (!info) {
            return 0;
        }
        var totalCount;
        if (coef < 1) {
            totalCount = this.getMinMaterialCount(info.count, coef);
        } else {
            totalCount = info.count * this.itemCount;
        }
        return info.cost * totalCount;
    }

    totalCost(coef: number = 1, useMin: boolean): number {
        var craftingTax = this.getCraftingTax();
        return this.sum(this.materialOne, coef) + this.sum(this.materialTwo, coef) + this.itemCount * this.artifact;
    }

    getCraftingTax() : number {
        var resourceCount = this.materialOne.count + this.materialTwo.count;
        console.log(this.selectedTier) 
        var materialItemValue = this.materialValues.get(this.selectedTier);
        console.log(materialItemValue);
        console.log(JSON.stringify(this.materialValues));
        var artifactValue = 0;
        if(!!this.selectedItem.artifact) {
            var artifactItemValue = this.artifactValues.get(this.selectedTier);
            var artifactRank = this.artifactRanks.get(this.selectedItem.artifact);
            artifactValue = artifactItemValue * artifactRank;
        }
        //5 is a constant used for taxes
        return (materialItemValue * resourceCount + artifactValue) * this.CraftingTax * this.itemCount * 5;
    }

    totalReturn(tax: number = this.MarketTax): number {
        return this.sellPrice * (1 - tax) * this.itemCount;
    }

    getMinMaterialCount(countPerItem: number, coef: number = 1): number {
        return countPerItem + (countPerItem * coef * (this.itemCount - 1));
    }

    getExtraMaterials(countPerItem: number, coef: number = 1) : number {
        return countPerItem * ((1/coef) -1);
    }
}

class MaterialInfo {
    cost: number;
    count: number;
}