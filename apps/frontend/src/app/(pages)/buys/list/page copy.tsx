// import { constBuy } from "core";

// export default function List() {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="w-full max-w-md bg-zinc-800 p-8 rounded-lg shadow-md">
//         {constBuy.map((shop) => (
//           <span key={shop.id}>
//             {shop.product.map((product) => {
//               return (
//                 <div className="flex justify-between h-8" key={product.id}>
//                   <div>
//                     <span>{product.description}</span>
//                   </div>
//                   <div className="flex flex-row">
//                     {product.mark.map((mark) => {
//                       return <div key={mark.id}>{mark.description}</div>;
//                     })}

//                     <div className="pl-10">
//                       <span>R$ {product.unitPrice.toLocaleString()}</span>
//                     </div>
//                     <span></span>
//                   </div>
//                 </div>
//               );
//             })}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
