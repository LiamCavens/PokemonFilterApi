import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PokeFilter } from './components/pokeFilter/poke-filter.component';
import { PokemonList } from './components/pokemonList/pokemon-list.component';
import { PokemonListService } from './components/pokemonList/pokemon-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokeFilter,
    PokemonList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokemonListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
