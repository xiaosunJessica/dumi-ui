import React from "react";
import Slider from './slider';
export interface CarouselProps {
  autoplay: boolean; //是否自动播放
  dots: boolean; //	是否显示指示点	
  dotPosition: 'top'|'bottom'|'left'|'right'; //	指示点的位置，可选 top bottom left right
  children: React.ReactNode;
  needArrows: boolean;// 是否展示箭头
  delayTime: number; // 动画延迟时间，默认3000
}
const Carousel = (props: Partial<CarouselProps>) => {
  return (<Slider {...props} />)
}

export default Carousel;