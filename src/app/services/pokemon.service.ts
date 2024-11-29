import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any[]> {
    return this.http.get<{ results: { name: string }[] }>(this.apiUrl).pipe(
      map((response) => {
        const requestPokemon = response.results.map((pokemon) =>
          this.http.get<any>(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          )
        );
        const requestSpecie = response.results.map((pokemon) =>
          this.http.get<any>(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
          )
        );

        return { requestPokemon, requestSpecie };
      }),
      switchMap(({ requestPokemon, requestSpecie }) =>
        forkJoin({
          pokemons: forkJoin(requestPokemon),
          specie: forkJoin(requestSpecie),
        })
      ),
      map(({ pokemons, specie }) => {
        return pokemons.map((pokemon, index) => {
          const speciesData = specie[index];
          const InformacionSpecie = speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          );

          return {
            name: pokemon.name,
            image: pokemon.sprites?.front_default,
            descripcion: InformacionSpecie
              ? InformacionSpecie.flavor_text
              : 'No hay información para este pokemon',
          };
        });
      })
    );
  }
}
