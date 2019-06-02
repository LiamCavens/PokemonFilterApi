import { Component, OnInit } from "@angular/core";
import { PokemonListService, PokemonListData } from "./pokemon-list.service";
import { Pokemon } from './pokemon';

@Component({
  selector: "pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.less"]
})
export class PokemonList implements OnInit {
  pokemonListData: PokemonListData;
  allPokemonDetails: Pokemon[];
  allPokemonCopy: string[];
  headers: string[];
  pokemon: Pokemon[];

  constructor(private pokemonListDataService: PokemonListService) {}

  ngOnInit() {
    this.pokemonListDataService.pokemon.subscribe(pokemon => {
      this.allPokemonDetails = pokemon;
    })

    this.pokemonListDataService.loadPokemon();
  }
}
