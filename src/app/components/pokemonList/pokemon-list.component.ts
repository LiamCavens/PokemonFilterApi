import { Component, OnInit } from "@angular/core";
import { PokemonListService, PokemonListData } from "./pokemon-list.service";

@Component({
  selector: "pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.less"]
})
export class PokemonList implements OnInit {
  pokemonListData: PokemonListData;
  allPokemonDetails: string[];
  headers: string[];

  constructor(private pokemonListDataService: PokemonListService) {}

  ngOnInit() {
    this.showPokemonListData();
  }

  showPokemonListData() {
    let pokemonArray = [];
    this.pokemonListDataService
      .getPokemonList()
      .subscribe((data: PokemonListData) => {
        this.pokemonListData = data;
        this.pokemonListData.results.forEach(pokemon => {
          this.pokemonListDataService.getPokemonListDetails(pokemon.url).subscribe(
            pokemon => {
              pokemonArray.push(pokemon);
              pokemonArray.sort((a, b) => {
                return a.id - b.id;
              });
            }
          );
        })
        this.allPokemonDetails = pokemonArray;
        console.log(pokemonArray);
      });
  }

  showPokemonListDataResponse() {
    this.pokemonListDataService.getPokemonListResponse().subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
      this.pokemonListData = { ...resp.body };
    });
  }
}
