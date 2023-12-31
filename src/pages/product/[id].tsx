import { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import { stripe } from "../../lib/stripe";
import Stripe from 'stripe';
import axios from 'axios';

import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pagesStyles/product';

import { GetStaticPaths, GetStaticProps } from 'next';
interface ProductProps {
   product: {
      id: number;
      name: string;
      imageUrl: string;
      price: string;
      description: string;
      defaultPriceId: string;
   }
}

export default function Product({ product }: ProductProps) {
   const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

   async function handleBuyProduct() {
      try {
         setIsCreatingCheckoutSession(true);

         const response = await axios.post('/api/checkout', {
            priceId: product.defaultPriceId,
         });

         const { checkoutUrl } = response.data;

         window.location.href = checkoutUrl;
      } catch (err) {
         //Conectar com uma ferramenta de observabilidade(Datadog/sentry)

         setIsCreatingCheckoutSession(false);

         alert('Falha ao redirecionar ao checkout!');
      }
   }

   return (
      <ProductContainer>
         <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt='' />
         </ImageContainer>

         <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>

            <p>{product.description}</p>

            <button
               onClick={handleBuyProduct}
               disabled={isCreatingCheckoutSession}
            >
               Comprar agora
            </button>
         </ProductDetails>
      </ProductContainer>
   )
}

//forma de gerar paginas estaticas que recebem parametros
export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
         { params: { id: 'prod_P8hhcLHum68rbX' } }
      ],
      fallback: 'blocking',
   }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
   const productId = params!.id;

   const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
   });

   const price = product.default_price as Stripe.Price;

   return {
      props: {
         product: {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            }).format(price.unit_amount! / 100),
            description: product.description,
            defaultPriceId: price.id,
         }
      },
      revalidate: 60 * 60 * 1, //1 hour
   }
}