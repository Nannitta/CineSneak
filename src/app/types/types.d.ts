import { EventHandler, MouseEventHandler, ReactNode } from 'react';

export type SvgProps = {
  width: string
  height: string
  fill?: string
  color?: string
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
}

export type ButtonProps = {
  text: string
  img: ReactNode
  title: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface MoviesNowPalying {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Genre = {
  id: number
  name: string
}

export type TagProps = {
  text: string
}

export type MovieTrailer = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: Date
  id: string
}