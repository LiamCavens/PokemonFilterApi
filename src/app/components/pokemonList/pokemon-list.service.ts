import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, forkJoin } from "rxjs";
import { catchError, retry, map, flatMap } from "rxjs/operators";
import { Pokemon } from "./pokemon";

export interface PokemonListData {
  pokemonUrl: string;
  results: { url: string }[];
}

@Injectable()
export class PokemonListService {
  pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
  pokemon = new BehaviorSubject<Pokemon[]>([]);
  originalPokemon: Pokemon[];

  constructor(private http: HttpClient) {
    // sub
    this.pokemon.subscribe(pokemon => {
      // do stuff with pokemon
    });

    // pub
    this.pokemon.next([
      // array of pokemon
      //charmander,
      //charmeleon,
      //charizard,
    ]);
  }

  resetPokemon() {
    this.pokemon.next(this.originalPokemon);
  }

  onHeight() {}

  onNameSearch(str: string) {
    // logic to search
    const pokemonWithSimilarName = this.originalPokemon.filter(pokemon =>
      pokemon.name.includes(str)
    );

    this.pokemon.next(pokemonWithSimilarName);
  }

  onHeightSearch(value: string) {
    // logic to search
    const pokemonWithHeight = this.originalPokemon.filter(
      pokemon => pokemon.height === Number(value)
    );

    this.pokemon.next(pokemonWithHeight);
  }

  onAbilitiesSearch(value: string) {
    const pokemonWithAbilities = this.originalPokemon.filter(pokemon =>
      pokemon.abilities.some(
        ({ ability: { name: pokemonAbility } }) => value === pokemonAbility
      )
    );
    this.pokemon.next(pokemonWithAbilities);
  }

  onTypeSearch(type: string) {
    const pokemansWithType = this.originalPokemon.filter(pokeman =>
      pokeman.types.some(
        ({ type: { name: pokemansType } }) => type === pokemansType
      )
    );
    this.pokemon.next(pokemansWithType);
  }

  loadPokemon() {
    // get list of pokemon from 1 - 151
    // for each pokemon in list make a call
    const responses: Observable<
      Observable<Pokemon>[]
    > = this.getPokemonList().pipe(
      map(response =>
        response.results.map(({ url }) => this.getPokemonListDetails(url))
      )
    );

    // after getting all lists
    // wait for all requests to finish
    // then push the list of pokemon
    responses.subscribe((response: Observable<Pokemon>[]) => {
      forkJoin(response).subscribe((pokemon: Pokemon[]) => {
        this.originalPokemon = pokemon;
        console.log(pokemon);
        this.pokemon.next(pokemon);
      });
    });
  }

  getPokemonList() {
    return this.http.get<PokemonListData>(this.pokemonUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPokemonListDetails(pokemonUrl: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(pokemonUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  sort() {
    // get pokemon
    // sort
    // push to behaviour subject
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
