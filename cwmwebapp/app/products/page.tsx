"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../components/ProductCard";
import { get_all_products } from "../Services/Admin/product";
import useSWR from "swr";
import { RootState } from "@/Store/store";
import { useSelector } from "react-redux";
import FeaturedProduct from "../components/FeaturedProduct";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCatLoading,
  setCategoryData,
  setOrderData,
  setProdLoading,
  setProductData,
} from "@/utils/AdminSlice";

interface userData {
  email: String;
  role: String;
  _id: String;
  name: String;
}

export default function Products() {
  const dispatch = useDispatch();

  const { data: productData, isLoading: productLoading } = useSWR(
    "/gettingAllProductsFOrAdmin",
    get_all_products
  );
  useEffect(() => {
    dispatch(setProductData(productData?.data));
    dispatch(setProdLoading(productLoading));
  }, [productData, productLoading]);

  const router = useRouter();
  const prodData = useSelector((state: RootState) => state.Admin.product);
  const user = useSelector(
    (state: RootState) => state.User.userData
  ) as userData | null;

  const prodLoading = useSelector(
    (state: RootState) => state.Admin.productLoading
  );

  type ProductData = {
    productName: string;
    productImage: string;
    productSlug: string;
    productPrice: Number;
    productFeatured: Boolean;
    productCategory: {
      categoryName: string;
      _id: string;
      categoryDescription: string;
    };
    _id: string;
  };

  const FeaturedProducts = prodData?.filter((prod: ProductData) => {
    if (prod?.productFeatured) {
      return prod;
    }
  });
  const filteredProducts = FeaturedProducts?.slice(0, 9);

  const products = [
    {
      id: 1,
      name: "NOVOSMART Drops 20ML",
      description:
        "NOVOSMART Drops offer a premium daily dose of Omega 3 specifically formulated for children, ensuring optimum health and development. Our meticulously crafted Omega 3 is sourced from Europe, promising an unparalleled level of high quality and purity that you can confidently rely on.",
      price: "₱590.00",
      image: "/products/NOVOSMART.webp",
    },
    {
      id: 2,
      name: "ZENTOKID ZINC (Box of 20s)",
      description:
        "Zentokid combines non acidic Vitamin C and Zinc, to help children maintain a healthy immune system, support growth and development and promote overall well-being",
      price: "₱320.00",
      image: "/products/zentokid zinc.webp",
    },
    {
      id: 3,
      name: "CENTRACID GEL",
      description:
        "Generic Name: Aluminum Hydroxide+Magensium Hydroxide+Oxetacaine Centracid is an effective solution for managing the discomfort and symptoms associated with hyperacidity and related conditions, offering patients comprehensive and immediate relief.",
      price: "₱850.00",
      image: "/products/centracid.webp",
    },
    {
      id: 4,
      name: "MOMOR SPF 50 SUNSCREEN (NON GREASY, MATTE FINISHED)",
      description:
        "Your skin deserves the best defense against harmful UV rays while nourishing it for a radiant, healthy glow. MOMOR offers broad-spectrum protection with lightweight, skin-loving ingredients for all-day confidence.",
      price: "$45.99",
      image: "/products/MOMOR SPF 50 SUNSCREEN.webp",
    },
  ];

  const handleAddToCart = (product: any) => {
    // Display toast notification with product name
    toast.success(`${product.name} has been added to your cart!`, {
      position: "bottom-left",
      icon: "🛒",
    });

    console.log(product.id, product.name, "added to cart");
  };

  return (
    <div className="min-h-screen md: mt-10 bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-950 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold">Explore Our Products</h1>
          <p className="mt-4 text-lg">
            Shop a wide range of high-quality healthcare products.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm"
        />
        <select className="mt-4 md:mt-0 md:ml-4 p-2 border border-gray-300 rounded shadow-sm">
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Products Grid */}
      {/* <FeaturedProduct /> */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts?.length < 1 ? (
          <h1 className="text-2xl font-semibold text-gray-500">
            No available Products
          </h1>
        ) : (
          filteredProducts?.map((item: ProductData) => {
            return (
              <ProductCard
                productName={item?.productName}
                productPrice={item?.productPrice}
                productFeatured={item?.productFeatured}
                productImage={item?.productImage}
                productCategory={item?.productCategory}
                productSlug={item?.productSlug}
                _id={item?._id}
                key={item?._id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
