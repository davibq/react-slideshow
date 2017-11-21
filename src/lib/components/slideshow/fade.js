import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './fade.css';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.imageRefs = [];
    this.width = 0;
    this.height = 0;
    this.timeout = null;
    this.imageContainer = null;
    this.getImageDim = this.getImageDim.bind(this);
  }

  componentWillMount() {
    this.timeout = setTimeout(
      () => this.fadeImages('next'),
      this.props.duration
    );
    this.setState({
      images: this.props.images.reverse()
    });
  }

  componentDidMount() {
    this.width = document.querySelector('.fade-wrapper').clientWidth;
    this.applyStyle();
    this.addResizeListener();
  }

  getImageDim() {
    this.height = this.imageContainer.children[0].clientHeight;
    this.imageContainer.style.height = `${this.height}px`;
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.width = document.querySelector('.fade-wrapper').clientWidth;
      this.applyStyle();
    });
  }

  applyStyle() {
    this.imageRefs.forEach((eachImage, index) => {
      if (!eachImage) return;
      eachImage.style.width = `${this.width}px`;
    });
  }

  render() {
    const { type } = this.props;
    const { images } = this.state;
    return (
      <div className="container">
        {this.props.showArrows && (
          <div className="nav" onClick={() => this.fadeImages('prev')}>
            {' '}
            &lt;{' '}
          </div>
        )}
        {this.props.showIndicator && (
          <div
            className="indicator"
            style={{
              backgroundColor: this.props.indicatorColor,
              animationDuration:
                (this.props.duration + this.props.transitionDuration) / 1000 +
                's'
            }}
          />
        )}
        <div className={`fade-wrapper ${type}`}>
          <div
            className="images-wrap"
            ref={wrap => (this.imageContainer = wrap)}
          >
            {images.map((each, key) => (
              <div
                ref={el => {
                  this.imageRefs.push(el);
                }}
                onLoad={key === 0 ? this.getImageDim : null}
                data-index={key}
                key={key}
              >
                <img alt={each.alt} src={each.src} />
              </div>
            ))}
          </div>
        </div>
        {this.props.showArrows && (
          <div className="nav" onClick={() => this.fadeImages('next')}>
            {' '}
            &gt;{' '}
          </div>
        )}
      </div>
    );
  }

  fadeImages(type) {
    let { images } = this.state;
    let newImageArr = [];
    clearTimeout(this.timeout);
    const lastImage = this.imageContainer.children[images.length - 1];
    if (type === 'prev') {
      newImageArr = images.slice(1);
      newImageArr.splice(newImageArr.length - 1, 0, images[0]);
      this.setState({ images: newImageArr });
      newImageArr = images.slice(1, images.length);
      newImageArr.splice(newImageArr.length, 0, images[0]);
    } else {
      newImageArr = [images[images.length - 1]].concat(
        images.slice(0, images.length - 1)
      );
    }
    lastImage.style.transition = `all ${this.props.transitionDuration / 1000}s`;
    lastImage.style.opacity = '0';
    setTimeout(() => {
      lastImage.style.opacity = '1';
      lastImage.style.transition = 'none';
      this.timeout = setTimeout(
        () => this.fadeImages('next'),
        this.props.duration
      );
      this.setState({ images: newImageArr });
    }, this.props.transitionDuration);
  }
}

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  showArrows: true,
  showIndicator: true,
  indicatorColor: '#5bb0dc'
};

Fade.PropTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  showArrows: PropTypes.bool,
  showIndicator: PropTypes.bool,
  indicatorColor: PropTypes.string
};

export default Fade;
