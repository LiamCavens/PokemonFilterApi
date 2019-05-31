import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

export interface PokemonListData {
  pokemonUrl: string;
  results: { url: string }[];
}

@Injectable()
export class PokemonListService {
  pokemonUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";
  constructor(private http: HttpClient) {}

  getPokemonList() {
    return this.http.get<PokemonListData>(this.pokemonUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPokemonListDetails(pokemonUrl): Observable<any> {
    return this.http.get<PokemonListData>(pokemonUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPokemonListDetailsResponse(): Observable<HttpResponse<PokemonListData>> {
    return this.http.get<PokemonListData>(this.pokemonUrl, {
      observe: "response"
    });
  }

  getPokemonListResponse(): Observable<HttpResponse<PokemonListData>> {
    return this.http.get<PokemonListData>(this.pokemonUrl, {
      observe: "response"
    });
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
