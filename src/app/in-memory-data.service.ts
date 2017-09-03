import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CraftingItem, CraftingItemType, CraftingItemTypeMaterials, CraftingMaterialType } from './crafting.service';


export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const craftingItems: CraftingItem[] = [
      {
        id: 0,
        label: 'Holy Staff',
        itemType: CraftingItemType.OneHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: false
      },
      {
        id: 1,
        label: 'Great Holy Staff',
        itemType: CraftingItemType.TwoHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: false
      },
      {
        id: 2,
        label: 'Eye of Secrets',
        itemType: CraftingItemType.Tome,
        materialOne: CraftingMaterialType.Cloth,
        materialTwo: CraftingMaterialType.Leather,
        artifact: true
      }
    ];

    const craftingItemTypes:CraftingItemTypeMaterials[] = [
      {
        id: CraftingItemType.OneHandedWeapon,
        materialCounts: [16, 8]
      },
      {
        id: CraftingItemType.TwoHandedWeapon,
        materialCounts: [20, 12]
      },
      {
        id: CraftingItemType.Tome,
        materialCounts: [4, 4]
      }
    ];
    return { craftingItems, craftingItemTypes };
  }
}