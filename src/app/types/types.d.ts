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