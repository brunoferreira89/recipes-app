import PropTypes from 'prop-types';
import React from 'react';

function IframeYoutube({ mealsOrDrinks, className, objectPath }) {
  if (mealsOrDrinks === 'meals') {
    return (
      <iframe
        data-testid="video"
        className={ className }
        src={
          `https://www.youtube.com/embed/${objectPath.strYoutube
            .replace('https://www.youtube.com/watch?v=', '')}`
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }
}

IframeYoutube.propTypes = {
  className: PropTypes.any,
  objectPath: PropTypes.shape({
    strYoutube: PropTypes.shape({
      replace: PropTypes.func,
    }),
  }),
}.isRequired;

export default IframeYoutube;
