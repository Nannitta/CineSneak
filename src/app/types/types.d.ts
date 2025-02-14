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
  id: number
  genre_ids: number[]
  backdrop_path: string
  poster_path: string
  overview: string
  vote_average: number
  original_language: string
}

export interface MovieDetails extends MediaContent {
  title: string
  genres: Genre[]
  release_date: string
  runtime: number
  video: boolean
  ownType: string
}

export interface SerieDetails extends MediaContent {
  name: string
  genres: Genre[]
  in_production: boolean
  number_of_episodes: number
  number_of_seasons: number
  first_air_date: string
  last_episode_to_air: LastEpisodeAir
  ownType: string
}

export interface SearchedMedia extends MediaContent {
  title: string
  media_type: string
  ownType: string
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

export type MoviesCollection = {
  id: number,
  name: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  parts: MovieDetails[]
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

export type Cast = {
  name: string
  profile_path: string
  character: string
  credit_id: string
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

export type User = {
  uid: string
  displayName: string
  email: string
}

export type Favorite = {
  id: number
  title: string
  img: string
  type: string
}

interface Favorites {
  [key: string]: Favorite
}