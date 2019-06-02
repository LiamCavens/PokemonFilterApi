import { Component } from '@angular/core';
import { PokemonListService } from '../pokemonList/pokemon-list.service';

@Component({
    selector: 'poke-filter',
    templateUrl: './poke-filter.component.html',
    styleUrls: ['./poke-filter.component.less']
})

export class PokeFilter {
    filterType = 'name';

    constructor(private pokemonListDataService: PokemonListService ){}

    onButtonFilter(filterSearchType:string) {
        this.filterType = filterSearchType;
    }

    onSearch(filterValue:string){
        if (this.filterType === 'name') this.pokemonListDataService.onNameSearch(filterValue.toLowerCase());
        if (this.filterType === 'type') this.pokemonListDataService.onTypeSearch(filterValue.toLowerCase());
        if (this.filterType === 'abilities') this.pokemonListDataService.onAbilitiesSearch(filterValue.toLowerCase());
        if (this.filterType === 'height') this.pokemonListDataService.onHeightSearch(filterValue);
    }
}