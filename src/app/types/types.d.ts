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
  name?: string
  original_language: string
  runtime: number
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