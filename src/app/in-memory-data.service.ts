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
import { 
  Plant
} from './farming.service';


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

    const plants: Plant[] = [
      {
        tier: 1,
        yield: 0,
        waterBonus: 2,
        crop: "Carrots",
        herb: null
      },
      {
        tier: 2,
        yield: 1/3,
        waterBonus: 4/3,
        crop: "Beans",
        herb: "Arcane Agaric"
      },
      {
        tier: 3,
        yield: 3/5,
        waterBonus: .8,
        crop: "Wheat",
        herb: "Brightleaf Comfrey"
      },
      {
        tier: 4,
        yield: 11/15,
        waterBonus: 8/15,
        crop: "Turnips",
        herb: "Crenellated Burdock"
      },
      {
        tier: 5,
        yield: 4/5,
        waterBonus: .40,
        crop: "Cabbage",
        herb: "Dragon Teasel"
      },
      {
        tier: 6,
        yield: 13/15,
        waterBonus: .27,
        crop: "Potatoes",
        herb: "Elusive Foxglove"
      },
      {
        tier: 7,
        yield: 41/45,
        waterBonus: .18,
        crop: "Corn",
        herb: "Firetouched Mullein"
      },
      {
        tier: 8,
        yield: 14/15,
        waterBonus: .13,
        crop: "Pumpkins",
        herb: "Ghoul Yarrow"
      }
    ];

    const materialCostHistory: CraftingMaterialCostEntry[] = [];
    const itemCostHistory: CraftingItemCostEntry[] = [];
    return { craftingItems, craftingItemTypes, materialCostHistory, itemCostHistory, plants };
  }
}