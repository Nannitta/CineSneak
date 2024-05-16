import { MouseEventHandler, ReactNode } from 'react'

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
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}