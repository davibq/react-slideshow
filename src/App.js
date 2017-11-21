import React, { Component } from 'react';
import { Fade } from './lib';
import './app.css';

class App extends Component {
  render() {
    const fadeImages = [
      {
        src: 'images/slide_5.jpg',
        alt: '1'
      },
      {
        src: 'images/slide_6.jpg',
        alt: '2'
      },
      {
        src: 'images/slide_7.jpg',
        alt: '3'
      }
    ];

    return (
      <div>
        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade
            images={fadeImages}
            duration={5000}
            transitionDuration={1000}
            direction="in"
            showArrows={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
