import type { AppProps } from 'next/app';
import Image from 'next/image';

import logoImg from '../assets/logo.svg';

import { Container, Header } from '../styles/pagesStyles/app';
import { globalStyles } from '../styles/global';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
