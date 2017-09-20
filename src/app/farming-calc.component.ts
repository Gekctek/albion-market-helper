import { Component, OnInit } from '@angular/core';
import { FarmingService  } from './farming.service';


@Component({
    selector: 'farming-calc',
    templateUrl: './farming-calc.component.html',
    styleUrls: ['./farming-calc.component.css']
})
export class FarmingCalcComponent implements OnInit {
    constructor(private farmingService: FarmingService) { }

    ngOnInit(): void {
        this.farmingService.getCrops()
            .then(items => this.items = items);
    }

}