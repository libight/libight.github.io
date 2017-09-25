import React from 'react'

import {
  Router,
  Route,
  browserHistory,
  Link
} from 'react-router'

import {
  createApp,
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'

import { injectGlobal } from 'styled-components'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles'

import {
  Provider,
  theme,
  Container,
  Hero,
  HeroLead,
  Text,
  Heading,
  Link as OLink,
  Pre,
  Code
} from 'ooni-components'

injectGlobal`
  /* CSS reset */
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
      font-size: 100%;
      font: inherit;
      font-family: "Fira Sans";
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
`

const Layout = props => (
  <div>
    <Provider theme={theme}>
      <div className='content'>
        { props.children }
      </div>
    </Provider>
  </div>
)

const Home = () => (
  <Layout>
    <p>This is a homepage</p>
  </Layout>
)

const Highlighted = ({children}) => {
  const codeString = children[0].props.children[0] || ''
  return <SyntaxHighlighter language='cpp' style={docco}>{codeString}</SyntaxHighlighter>
}

const componentsMap = {
  h1: ({children}) => (<Heading h={1}>{children}</Heading>),
  h2: ({children}) => (<Heading h={2}>{children}</Heading>),
  h3: ({children}) => (<Heading h={3}>{children}</Heading>),
  h4: ({children}) => (<Heading h={4}>{children}</Heading>),
  p: Text,
  a: OLink,
  pre: Highlighted,
  code: Code
}

const DocPage = ({ isLoading, page }) => (
  <Layout>
    <Hero pb={4} pt={4}>
      <HeroLead>
        Measurement Kit
      </HeroLead>
    </Hero>
    {isLoading && "Loading..."}
    {!isLoading &&
    page.node && (
      <Container>
        <h1>{page.node.title}</h1>
        <BodyRenderer components={componentsMap}>{page.node.body}</BodyRenderer>
      </Container>
    )}
    <footer>
    </footer>
  </Layout>
)

const DocContainer = createContainer(DocPage, props => ({
  page: query({ path: 'measurement-kit/doc', id: props.params.splat })
}))

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/doc/*" component={DocContainer} />
  </Router>
))
