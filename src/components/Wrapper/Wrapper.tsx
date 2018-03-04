import * as React from "react";
import { Jumbotron, Grid, Row, Col, Button } from 'react-bootstrap';


require('./Wrapper.css');


const gridInstance = (
<div className={'component-wrapper'}>
  <h1>What's up?</h1>
  <h1>My name is Jeremy Aguilon</h1>
  <p>
    I'm currently a third year in Georgia Tech's Computer Science program, set to graduate May 2019.
    I self-taught myself Java out of curiosity in high school and have been hooked since.
  </p>

  <p>
    College has brought me through a wide variety of experiences. As a software engineer
    I've explored the tech giants at Google and Amazon and tried out agile growers such
    as Lyft. I got to taste wearing the many hats of a fresh startup through
    InternBlitz, where I found an admiration for product management.
    Academically, I've gotten to join wonderful organizations and
    participate in a few undergraduate research positions.
  </p>

  <p>
    I have a lot of uncommon interests, but my best "party trick" is the fact that
    by the time you finish reading this sentence out loud, I could have solved an entire Rubik's Cube.
  </p>
  <p>
    <Button bsStyle="primary">Learn more</Button>
  </p>
</div>
);


export const Wrapper: React.StatelessComponent<{backgroundColor: string}> = ({children, backgroundColor}) => {
    const style = {
        backgroundColor: backgroundColor,
    } as React.CSSProperties
    return (
        <div className={'component-wrapper'} style={style}>
            {children}
        </div>
    );
}
