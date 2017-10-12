import styled from 'styled-components';
import { MEDIA_SMALL, MEDIA_MEDIUM, MEDIA_LARGE, MEDIA_EXTRA_LARGE } from './media';

const Container = styled.div`
  border: 1px solid #efefef;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 450px;

  @media (max-width: ${MEDIA_SMALL}) {
    /* 0-300 */
    width: 200px;
  }
  @media (min-width: ${MEDIA_SMALL}) and (max-width: ${MEDIA_MEDIUM}) {
    /* 300-500 */
    width: 250px;
  }
  @media (min-width: ${MEDIA_MEDIUM}) and (max-width: ${MEDIA_LARGE}) {
    /* 500-700 */
    width: 450px;
  }
  @media (min-width: ${MEDIA_LARGE}) and (max-width: ${MEDIA_EXTRA_LARGE}) {
    /* 700-900 */
    width: 650px;
  }
  @media (min-width: ${MEDIA_EXTRA_LARGE}) {
    /* 900+ */
    width: 1170px;
  }
`;

export default Container;
