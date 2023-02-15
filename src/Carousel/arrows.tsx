import React from "react";
// import { ClickProps } from './slider';
import './index.css';
import { ClickProps } from './slider';
interface ArrowProps {
 clickHandler: (params: Partial<ClickProps>) => void
}
export const PrevArrow = (props: ArrowProps) => {
  return (
    <div
      className="syq-arrows syq-arrows-prev"
      onClick={() => {
        props.clickHandler({
          type: 'prevArrow'
        })
      }}/>
  )

}



export const NextArrow = (props: ArrowProps) => {
   return (
    <div 
      className="syq-arrows syq-arrows-next"
      onClick={() => {
      props.clickHandler({
        type: 'nextArrow'
      })
    }}/>
  )

}