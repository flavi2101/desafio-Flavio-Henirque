import { modifyingArrayEntrada } from "./modifyArrayEntrada.js";
import { handleError } from "./handleError.js";
import { nameConsts } from "./constantes.js";
import { validationOfExtra } from "./validationOfExtra.js";
import { incressingErrorSize } from "./handleError.js";


//Gerar um erro quando quantidade for igual zero
function checkQuantity(item) {
  return item > 0 ? true : handleError(nameConsts.QUANTIDADEZERO);
}


function validationItens(itensPedido, itens, erroMessage) {

  //Validar se o carrinho esta vazio
  if(itensPedido.length ===0){
    incressingErrorSize(erroMessage,nameConsts.EMPTYCARRINHO)
   
  }

  //Transformar a entra ex: 'cafe,2' em [cafe,2]
  let itenAndQuantity = modifyingArrayEntrada(itensPedido);

  /*Verificar se entrada esta sem item ou quantidade
  Estruta de itenAndQuantity = [[cafe,2],[suco,4]] 
  */

  if (itenAndQuantity.some((val) => val.length !== 2)) {
    incressingErrorSize(erroMessage,nameConsts.SEM_QUANTIDADE)

  }

  //Clousure relacionar dados modificado e itens cardapio
  return function (checkItenInCardapio) {
    if (erroMessage.size !== 0) return;

    for (let i = 0; i < itenAndQuantity.length; i++) {
      let isValidItem = checkItenInCardapio(itenAndQuantity[i]);
      let isVAlidQuantity = checkQuantity(Number(itenAndQuantity[i][1]));

      //Criação do objeto cruzado entrada do usuario e cardapio
      if (typeof isValidItem === "string") {
        erroMessage.message = isValidItem;
        erroMessage.size++
        itens = [];
        return null
      } if (typeof isVAlidQuantity === "string") {
        erroMessage.message = isVAlidQuantity;
        erroMessage.size++
        itens = [];
        return null
      } else {
        let item = {
          codigoItem: itenAndQuantity[i][0],
          quantidade: Number(itenAndQuantity[i][1]),
          preco: isValidItem.preco,
          principal: isValidItem.principal,
        };
        itens.push(item);
       
      }
    }

    validationOfExtra(erroMessage,itens)
  };
}






export { validationItens };
