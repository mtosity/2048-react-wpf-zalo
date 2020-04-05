import React, {useEffect, useState} from "react";
import "../style/box.css";
import { BoxInt } from "../utils/state";
import { BoxInfoInt, convertTitleToBoxInfo } from "../utils/converter";
import {useSpring, animated} from 'react-spring'

interface BoxProps {
  box: BoxInt;
}

const Box: React.FC<BoxProps> = ({ box }: BoxProps) => {
  const {com_ani} = box
  const {title, color, titleColor, titleSize} = convertTitleToBoxInfo(box.title)

  const [state, toggle] = useState(true)
  const { x } = useSpring({ from: { x: 1 }, x: state ? 1 : 0, config: { duration: 200 } })


  useEffect(() => {
    if(com_ani === true){
      // console.log('object')
      toggle(!state)
    }
  }, [com_ani, state])
  return (
    <animated.div className="box" style={Object.assign({backgroundColor: color}, {
      // opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
      transform: x
        .interpolate({
          // range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          // output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
          range: [0, 0.5, 1],
          output: [1, 1.25, 1]
        })
        .interpolate(x => `scale(${x})`),

    })} >
<p style={{color: titleColor, fontSize: titleSize}} className="title">{title}</p>
    </animated.div>
  );
};
export default Box;
