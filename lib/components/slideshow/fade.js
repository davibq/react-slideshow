'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _fadeStyle = require('./fade-style');

var _fadeStyle2 = _interopRequireDefault(_fadeStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fade = function (_Component) {
  _inherits(Fade, _Component);

  function Fade(props) {
    _classCallCheck(this, Fade);

    var _this = _possibleConstructorReturn(this, (Fade.__proto__ || Object.getPrototypeOf(Fade)).call(this, props));

    _this.state = {
      images: []
    };
    _this.imageRefs = [];
    _this.width = 0;
    _this.height = 0;
    _this.timeout = null;
    _this.imageContainer = null;
    _this.getImageDim = _this.getImageDim.bind(_this);
    return _this;
  }

  _createClass(Fade, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        return _this2.fadeImages('next');
      }, this.props.duration);
      this.setState({
        images: this.props.images.reverse()
      });
      this.width = document.querySelector('.' + this.props.classes.fadeWrapper).clientWidth;
      this.applyStyle();
      this.addResizeListener();
    }
  }, {
    key: 'getImageDim',
    value: function getImageDim() {
      this.height = this.imageContainer.children[0].clientHeight;
      this.imageContainer.style.height = this.height + 'px';
    }
  }, {
    key: 'addResizeListener',
    value: function addResizeListener() {
      var _this3 = this;

      window.addEventListener('resize', function () {
        _this3.width = document.querySelector('.' + _this3.props.classes.fadeWrapper).clientWidth;
        _this3.applyStyle();
      });
    }
  }, {
    key: 'applyStyle',
    value: function applyStyle() {
      var _this4 = this;

      this.imageRefs.forEach(function (eachImage, index) {
        if (!eachImage) return;
        eachImage.style.width = _this4.width + 'px';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var classes = this.props.classes;
      var images = this.state.images;

      return _react2.default.createElement(
        'div',
        { className: classes.container },
        this.props.showIndicator && _react2.default.createElement('div', {
          className: classes.indicator,
          style: {
            backgroundColor: this.props.indicatorColor,
            animationDuration: (this.props.duration + this.props.transitionDuration) / 1000 + 's'
          }
        }),
        _react2.default.createElement(
          'div',
          { className: classes.fadeWrapper },
          _react2.default.createElement(
            'div',
            {
              className: classes.imagesWrap,
              ref: function ref(wrap) {
                return _this5.imageContainer = wrap;
              }
            },
            images.map(function (each, key) {
              return _react2.default.createElement(
                'div',
                {
                  ref: function ref(el) {
                    _this5.imageRefs.push(el);
                  },
                  onLoad: key === 0 ? _this5.getImageDim : null,
                  'data-index': key,
                  key: key,
                  className: classes.imagesWrapDiv
                },
                _react2.default.createElement('img', { alt: each.alt, src: each.src, className: classes.image })
              );
            })
          )
        )
      );
    }
  }, {
    key: 'fadeImages',
    value: function fadeImages(type) {
      var _this6 = this;

      var images = this.state.images;

      var newImageArr = [];
      clearTimeout(this.timeout);
      var lastImage = this.imageContainer.children[images.length - 1];
      if (type === 'prev') {
        newImageArr = images.slice(1);
        newImageArr.splice(newImageArr.length - 1, 0, images[0]);
        this.setState({ images: newImageArr });
        newImageArr = images.slice(1, images.length);
        newImageArr.splice(newImageArr.length, 0, images[0]);
      } else {
        newImageArr = [images[images.length - 1]].concat(images.slice(0, images.length - 1));
      }
      lastImage.style.transition = 'all ' + this.props.transitionDuration / 1000 + 's';
      lastImage.style.opacity = '0';
      setTimeout(function () {
        lastImage.style.opacity = '1';
        lastImage.style.transition = 'none';
        _this6.timeout = setTimeout(function () {
          return _this6.fadeImages('next');
        }, _this6.props.duration);
        _this6.setState({ images: newImageArr });
      }, this.props.transitionDuration);
    }
  }]);

  return Fade;
}(_react.Component);

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  showArrows: true,
  showIndicator: true,
  indicatorColor: '#5bb0dc'
};

Fade.PropTypes = {
  images: _propTypes2.default.array.isRequired,
  duration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number,
  showArrows: _propTypes2.default.bool,
  showIndicator: _propTypes2.default.bool,
  indicatorColor: _propTypes2.default.string
};

exports.default = (0, _reactJss2.default)(_fadeStyle2.default)(Fade);