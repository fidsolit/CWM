// import { bookmark_product } from "@/app/Services/common/bookmark";
// import { add_to_cart } from "@/app/Services/common/cart";
// import { RootState } from "@/Store/store";
// import { setUserData } from "@/utils/UserDataSlice";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { BsCartPlus } from "react-icons/bs";
// import { GrFavorite } from "react-icons/gr";
// import { MdFavorite } from "react-icons/md";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// type ProductData = {
//   productName: string;
//   productImage: string;
//   productSlug: string;
//   productPrice: Number;
//   productFeatured: Boolean;
//   productCategory: {
//     categoryName: string;
//     categoryDescription: string;
//     _id: string;
//   };
//   _id: string;
// };

// type User = {
//   email: string;
//   name: string;
//   _id: string;
// };

// export default function ProductCard({
//   productName,
//   productFeatured,
//   productImage,
//   productCategory,
//   productPrice,
//   _id,
//   productSlug,
// }: ProductData) {
//   const router = useRouter();

//   const user = useSelector(
//     (state: RootState) => state.User.userData
//   ) as User | null;

//   const AddToCart = async () => {
//     const finalData = { productID: _id, userID: user?._id };
//     const res = await add_to_cart(finalData);
//     if (res?.success) {
//       toast.success(res?.message);
//     } else {
//       toast.error(res?.message);
//     }
//   };

//   const AddToBookmark = async () => {
//     const finalData = { productID: _id, userID: user?._id };
//     const res = await bookmark_product(finalData);
//     if (res?.success) {
//       toast.success(res?.message);
//     } else {
//       toast.error(res?.message);
//     }
//   };

//   return (
//     <div className="card text-black cursor-pointer card-compact m-3 w-80 bg-white shadow-xl relative">
//       <div
//         onClick={() => router.push(`/product/product-detail/${_id}`)}
//         className="w-full rounded relative h-60"
//       >
//         <Image
//           src={productImage || "/images98.jpg"}
//           alt="no Image"
//           className="rounded"
//           fill
//         />
//       </div>

//       <div className="card-body">
//         <h2
//           className="card-title"
//           onClick={() => router.push(`/product/product-detail/${_id}`)}
//         >
//           {productName}{" "}
//         </h2>
//         <p
//           className="font-semibold"
//           onClick={() => router.push(`/product/product-detail/${_id}`)}
//         >{`Php ${productPrice}`}</p>
//         <div className="card-actions justify-end z-20">
//           <button onClick={AddToCart} className="btn  btn-circle btn-ghost ">
//             <BsCartPlus className="text-2xl text-orange-600 font-semibold" />
//           </button>
//           <button
//             onClick={AddToBookmark}
//             className="btn btn-circle btn-ghost absolute top-0 right-0 "
//           >
//             <MdFavorite className="text-2xl text-orange-600 font-semibold" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { bookmark_product } from "@/app/Services/common/bookmark";
import { add_to_cart } from "@/app/Services/common/cart";
import { RootState } from "@/Store/store";
import { setUserData } from "@/utils/UserDataSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

/**
 * Types
 */
type ProductData = {
  productName: string;
  productImage: string;
  productSlug: string;
  productPrice: number;
  productFeatured: boolean;
  productCategory: {
    categoryName: string;
    categoryDescription: string;
    _id: string;
  };
  _id: string;
};

type User = {
  email: string;
  name: string;
  _id: string;
};

/**
 * ProductCard Component
 */
export default function ProductCard({
  productName,
  productFeatured,
  productImage,
  productCategory,
  productPrice,
  _id,
  productSlug,
}: ProductData) {
  const router = useRouter();
  const user = useSelector(
    (state: RootState) => state.User.userData
  ) as User | null;

  const AddToCart = async () => {
    const finalData = { productID: _id, userID: user?._id };
    const res = await add_to_cart(finalData);
    res?.success ? toast.success(res?.message) : toast.error(res?.message);
  };

  const AddToBookmark = async () => {
    const finalData = { productID: _id, userID: user?._id };
    const res = await bookmark_product(finalData);
    res?.success ? toast.success(res?.message) : toast.error(res?.message);
  };

  return (
    <div className="w-80 rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 bg-white border border-gray-200">
      <div
        onClick={() => router.push(`/product/product-detail/${_id}`)}
        className="relative w-full h-60 cursor-pointer"
      >
        <Image
          src={productImage || "/images98.jpg"}
          alt={productName}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          priority
        />
        {productFeatured && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h2
            onClick={() => router.push(`/product/product-detail/${_id}`)}
            className="text-lg font-bold text-gray-800 cursor-pointer hover:text-orange-600"
          >
            {productName}
          </h2>
          <p
            onClick={() => router.push(`/product/product-detail/${_id}`)}
            className="text-md text-gray-600 cursor-pointer"
          >
            Php {productPrice.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={AddToCart}
            className="p-2 rounded-full hover:bg-orange-100 transition"
            title="Add to Cart"
          >
            <BsCartPlus className="text-2xl text-orange-600" />
          </button>
          <button
            onClick={AddToBookmark}
            className="p-2 rounded-full hover:bg-orange-100 transition"
            title="Add to Wishlist"
          >
            <MdFavorite className="text-2xl text-orange-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
