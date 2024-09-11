import { EventHandler, MouseEventHandler, ReactNode } from 'react';

export type SvgProps = {
  width: string
  height: string
  fill?: string
  color?: string
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
}

export type MediaContent = {
  backdrop_path: string
  genre_ids: number[]
  id: number
  overview: string
  poster_path: string
  release_date: string
  title: string
  name?: string
  video: boolean
}

export type Genre = {
  id: number
  name: string
}

export type TagProps = {
  text: string
}

export type Trailer = {
  type: string
}

export type MediaDetails = {
  backdrop_path: string
  genres: Genre[]
  id: number
  overview: string
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  original_language: string
  runtime: number
  name?: string
}

export type SerieDetailsType = {
  backdrop_path: string
  genres: Genre[]
  id: number
  in_production: boolean
  name: string
  number_of_episodes: number
  number_of_seasons: number
  original_language: string
  last_episode_to_air: LastEpisodeAir
  overview: string
  poster_path: string
  vote_average: number
}

export type LastEpisodeAir = {
  air_date: Date
  episode_number: number
  id: number
  name: string
  overview: string
  runtime: number
  season_number: number
  still_path: string
}

export type Cast = {
  name: string
  profile_path: string
  character: string
  cast_id: number
}

export type ProvidersLogo = {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export type Provider = {
  buy?: ProvidersLogo[]
  flatrate?: ProvidersLogo[]
  link?: string
  rent?: ProvidersLogo[]
}

export type CountryProvider = {
  [countryCode: string]: Provider[ProvidersLogo]
}

export type MoviesCollection = {
  id: number,
  name: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  parts: MediaContent[]
}