export interface Character {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  homeworldName?: string;
  mass: string;
  name: string;
  species: string[];
  speciesName?: string;
}

export interface CharacterResults {
  characters: Character[];
  count: number;
}
