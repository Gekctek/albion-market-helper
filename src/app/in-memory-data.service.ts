import { InMemoryDbService } from 'angular-in-memory-web-api';
import { 
  CraftingItem, 
  CraftingItemType, 
  CraftingItemTypeMaterials, 
  CraftingMaterialType,
  CraftingMaterialCostEntry,
  CraftingItemCostEntry,
  ArtifactType
} from './crafting.service';


export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const craftingItems: CraftingItem[] = [
      {
        id: 0,
        label: 'Holy Staff',
        itemType: CraftingItemType.OneHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: null
      },
      {
        id: 1,
        label: 'Great Holy Staff',
        itemType: CraftingItemType.TwoHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: null
      },
      {
        id: 2,
        label: 'Divine Staff',
        itemType: CraftingItemType.TwoHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: null
      },
      {
        id: 3,
        label: 'Lifetouch Staff',
        itemType: CraftingItemType.OneHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: ArtifactType.PossessedScroll
      },
      {
        id: 4,
        label: 'Fallen Staff',
        itemType: CraftingItemType.TwoHandedWeapon,
        materialOne: CraftingMaterialType.Plank,
        materialTwo: CraftingMaterialType.Cloth,
        artifact: ArtifactType.InfernalScroll
      },
      {
        id: 5,
        label: 'Eye of Secrets',
        itemType: CraftingItemType.Tome,
        materialOne: CraftingMaterialType.Cloth,
        materialTwo: CraftingMaterialType.Leather,
        artifact: ArtifactType.AlluringCrystal
      },
      {
        id: 6,
        label: 'Tome of Spells',
        itemType: CraftingItemType.Tome,
        materialOne: CraftingMaterialType.Cloth,
        materialTwo: CraftingMaterialType.Leather,
        artifact: null
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

    const materialCostHistory: CraftingMaterialCostEntry[] = [];
    const itemCostHistory: CraftingItemCostEntry[] = [];
    return { craftingItems, craftingItemTypes, materialCostHistory, itemCostHistory };
  }
}