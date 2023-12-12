import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pagesStyles/success";

export default function Success() {
   return (
      <SuccessContainer>
         <h1>Compra efetuada</h1>

         <ImageContainer>

         </ImageContainer>

         <p>
            Uhuul <strong>Pedro Marques</strong>, sua Camiseta <strong>Ignite Aboard</strong> já está a caminho da sua casa.
         </p>

         <Link href="/">
            Voltar ao catálogo
         </Link>
      </SuccessContainer>
   )
}