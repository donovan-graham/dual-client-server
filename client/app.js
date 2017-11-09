import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import Container from './restyled/container';
import MediaDebugger from './restyled/debugger';
import { BASE_FONT_SIZE } from './restyled/fonts';

import Chart from './restyled/performance';
import Menu from './restyled/menu';
import MenuAccordion from './restyled/menu-accordion';

import Content from './restyled/content';
import menuConfig from './restyled/menu-config';
import MenuBuilder from './restyled/menu-builder';

injectGlobal`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: ${BASE_FONT_SIZE}px;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const SvgPerson = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 299.997 299.997">
    <path d="M149.996,0C67.157,0,0.001,67.158,0.001,149.997c0,82.837,67.156,150,149.995,150s150-67.163,150-150    C299.996,67.156,232.835,0,149.996,0z M150.453,220.763v-0.002h-0.916H85.465c0-46.856,41.152-46.845,50.284-59.097l1.045-5.587    c-12.83-6.502-21.887-22.178-21.887-40.512c0-24.154,15.712-43.738,35.089-43.738c19.377,0,35.089,19.584,35.089,43.738    c0,18.178-8.896,33.756-21.555,40.361l1.19,6.349c10.019,11.658,49.802,12.418,49.802,58.488H150.453z" />
  </svg>
);

const SvgChart = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512">
    <g>
      <path d="M488.399,492h-21.933V173.536c0-14.823-12.06-26.882-26.882-26.882H390.56c-14.823,0-26.882,12.06-26.882,26.882V492    h-55.692V317.825c0-14.823-12.059-26.882-26.882-26.882H232.08c-14.823,0-26.882,12.06-26.882,26.882V492h-55.692v-90.204    c0-14.823-12.06-26.882-26.882-26.882H73.599c-14.823,0-26.882,12.06-26.882,26.882V492H23.601c-5.523,0-10,4.477-10,10    s4.477,10,10,10h464.798c5.523,0,10-4.477,10-10S493.922,492,488.399,492z M129.504,492H66.716v-90.204    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z M287.985,492h-62.788V317.825    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.794,0,6.882,3.087,6.882,6.882V492z M446.466,492h-62.788V173.536    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z" />
      <path d="M466.442,10.516c0.14-2.729-0.82-5.504-2.904-7.588c-2.084-2.084-4.859-3.045-7.588-2.904    C455.789,0.017,455.63,0,455.466,0h-60.5c-5.523,0-10,4.477-10,10s4.477,10,10,10h37.357l-98.857,98.858l-37.28-37.28    c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.196,1.054-7.071,2.929l-179.769,179.77c-3.905,3.905-3.905,10.237,0,14.143    c1.953,1.951,4.512,2.927,7.071,2.927s5.119-0.976,7.071-2.929L289.115,102.79l37.28,37.28c3.905,3.905,10.237,3.905,14.143,0    L446.466,34.143v33.81c0,5.523,4.477,10,10,10s10-4.477,10-10V11C466.466,10.837,466.449,10.678,466.442,10.516z" />
      <circle cx="75.64" cy="303.31" r="10" />
    </g>
  </svg>
);

const SvgGear = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 300 300">
    <g>
      <circle cx="149.996" cy="156.072" r="28.197" />
      <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003     S232.835,0,149.996,0z M228.82,171.799l-21.306,1.372c-1.193,4.02-2.783,7.866-4.746,11.482l14.088,16.039l-22.245,22.243     l-16.031-14.091c-3.618,1.961-7.464,3.551-11.482,4.741l-1.377,21.311l-31.458-0.003l-1.375-21.309     c-4.015-1.19-7.861-2.78-11.479-4.741l-16.034,14.091l-22.243-22.25l14.088-16.031c-1.963-3.618-3.553-7.464-4.746-11.482     l-21.306-1.375v-31.458l21.306-1.375c1.193-4.015,2.786-7.864,4.746-11.479l-14.088-16.031l22.245-22.248l16.031,14.088     c3.618-1.963,7.464-3.551,11.484-4.744l1.375-21.309h31.452l1.377,21.309c4.017,1.193,7.864,2.78,11.482,4.744l16.036-14.088     l22.243,22.248l-14.088,16.031c1.961,3.618,3.553,7.464,4.746,11.479l21.306,1.375L228.82,171.799z" />
    </g>
  </svg>
);

const PersonIcon = styled(SvgPerson)`
  width: 22px;
  height: 22px;
  fill: white;
  float: left;
  margin-right: 10px;
  margin-bottom: 2px;
`;

const ChartIcon = styled(SvgChart)`
  width: 22px;
  height: 22px;
  fill: white;
  float: left;
  margin-right: 10px;
  margin-bottom: 2px;
`;

const GearIcon = styled(SvgGear)`
  width: 22px;
  height: 22px;
  fill: white;
  float: left;
  margin-right: 10px;
  margin-bottom: 2px;
`;

const SubMenuItem = styled.div`
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  padding: 6px 8px 6px 8px;
  overflow: hidden;
  display: block;
  word-break: break-word;
  background-color: #d5d5d5;
  color: #fff;
  transition: background-color 100ms linear;
  &:hover {
    background-color: #b5b5b5;
  }
`;

const App = () => (
  <div>
    <Menu>
      <MenuAccordion
        icon={<PersonIcon />}
        title={'Your Account'}
        maxHeight={130}
        panel={
          <div>
            <SubMenuItem>Update details</SubMenuItem>
            <SubMenuItem>Reset password</SubMenuItem>
            <SubMenuItem>Change billing</SubMenuItem>
          </div>
        }
      />
      <MenuAccordion
        icon={<ChartIcon />}
        title={'Charts'}
        maxHeight={350}
        panel={
          <div>
            <SubMenuItem>Sub 1</SubMenuItem>
            <SubMenuItem>Sub 2</SubMenuItem>
            <SubMenuItem>Sub 3</SubMenuItem>
            <SubMenuItem>Sub 4</SubMenuItem>
            <SubMenuItem>Sub 5</SubMenuItem>
          </div>
        }
      />
      <MenuAccordion
        icon={<GearIcon />}
        title={'Stuff'}
        maxHeight={130}
        panel={
          <div>
            <SubMenuItem>Sub 1</SubMenuItem>
            <SubMenuItem>Sub 2</SubMenuItem>
            <SubMenuItem>Sub 3</SubMenuItem>
          </div>
        }
      />
    </Menu>
    <Content>
      <Container>
        Some text goes here
        <MenuBuilder config={menuConfig} />
      </Container>
    </Content>
    <MediaDebugger />
  </div>
);

export default App;
