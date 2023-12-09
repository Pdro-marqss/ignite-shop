import { useRouter } from 'next/router';
import Image from 'next/image';

import { ProductContainer, ImageContainer, ProductDetails } from '../../styles/pagesStyles/product';

export default function Product() {
   const { query } = useRouter();

   return (
      <ProductContainer>
         <ImageContainer>

         </ImageContainer>

         <ProductDetails>
            <h1>Camiseta X</h1>
            <span>R$ 79,99</span>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, iure temporibus fugiat voluptatum quidem quos debitis ad labore odio! Illum illo commodi quae quasi odit, officiis rerum reiciendis inventore libero.</p>

            <button>Comprar agora</button>
         </ProductDetails>
      </ProductContainer>
   )
}