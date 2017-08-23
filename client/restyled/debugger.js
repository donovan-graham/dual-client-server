import React from 'react';
import styled from 'styled-components';
import { MEDIA_SMALL, MEDIA_MEDIUM, MEDIA_LARGE, MEDIA_EXTRA_LARGE } from './media';

const MediaWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  font-size: 12px;

  > div {
    width: 100%;
    text-align: center;
    padding: 5px 0;
  }
  @media (max-width: ${MEDIA_SMALL}) {
    /* 0-300 */
    > .small {
      display: block;
      background-color: #e293e9;
    }
    > .medium,
    > .large,
    > .extraLarge,
    > .extraLargePlus {
      display: none;
    }
  }
  @media (min-width: ${MEDIA_SMALL}) and (max-width: ${MEDIA_MEDIUM}) {
    /* 300-500 */
    > .medium {
      display: block;
      background-color: #77e3da;
    }
    > .small,
    > .large,
    > .extraLarge,
    > .extraLargePlus {
      display: none;
    }
  }
  @media (min-width: ${MEDIA_MEDIUM}) and (max-width: ${MEDIA_LARGE}) {
    /* 500-700 */
    > .large {
      display: block;
      background-color: #959ce9;
    }
    > .small,
    > .medium,
    > .extraLarge,
    > .extraLargePlus {
      display: none;
    }
  }
  @media (min-width: ${MEDIA_LARGE}) and (max-width: ${MEDIA_EXTRA_LARGE}) {
    /* 700-900 */
    > .extraLarge {
      display: block;
      background-color: #79e4a6;
    }
    > .small,
    > .medium,
    > .large,
    > .extraLargePlus {
      display: none;
    }
  }
  @media (min-width: ${MEDIA_EXTRA_LARGE}) {
    /* 900+ */
    > .extraLargePlus {
      display: block;
      background-color: #e994c6;
    }
    > .small,
    > .medium,
    > .large,
    > .extraLarge {
      display: none;
    }
  }
`;

const MediaDebugger = () =>
  <MediaWrapper>
    <div className="small">Small: 0-300</div>
    <div className="medium">Medium: 300-500</div>
    <div className="large">Large: 500-700</div>
    <div className="extraLarge">Extra Large: 700-900</div>
    <div className="extraLargePlus">Extra Large Plus: 900+</div>
  </MediaWrapper>;

export default MediaDebugger;
