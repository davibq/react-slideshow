'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var styles = {
  fadeWrapper: {
    overflow: 'hidden',
    width: '100%'
  },
  imagesWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  imagesWrapDiv: {
    position: 'absolute',
    width: '100%'
  },
  image: {
    width: '100%'
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative'
  },
  indicator: {
    animationIterationCount: 'infinite',
    animationName: 'indicatorwidth',
    borderRadius: '20px',
    boxShadow: '5px 1px 10px 0px #b7c5c7',
    height: '3px',
    left: '0',
    position: 'absolute',
    top: '0',
    transition: 'width .1s',
    zIndex: '1'
  },
  '@keyframes indicatorwidth': {
    from: {
      width: '0%'
    },
    to: {
      width: '100%'
    }
  }
};

exports.default = styles;