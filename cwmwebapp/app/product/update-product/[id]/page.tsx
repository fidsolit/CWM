"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
// import { TailSpin } from 'react-loader-spinner';
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setNavActive } from "@/utils/AdminNavSlice";
import { RootState } from "@/Store/store";
import {
  get_product_by_id,
  update_a_product,
} from "@/app/Services/Admin/product";
import { get_product_by_category_id } from "@/app/Services/Admin/product";
import Cookies from "js-cookie";

type Inputs = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  feature: Boolean;
  price: Number;
  quantity: Number;
  categoryID: string;
  warranty: {
    type: "standard" | "extended";
    duration: number;
    description: string;
    terms: string;
    coverage: string;
  };
};

type ProductData = {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productSlug: string;
  productPrice: Number;
  productQuantity: Number;
  productFeatured: Boolean;
  productCategory: string;
  warranty: {
    type: "standard" | "extended";
    duration: number;
    description: string;
    terms: string[];
    coverage: string[];
  };
  createdAt: string;
  updatedAt: string;
};

type CategoryData = {
  _id: string;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
};

interface pageParam {
  id: string;
}

interface userData {
  email: String;
  role: String;
  _id: String;
  name: String;
}

export default function Page({
  params,
  searchParams,
}: {
  params: pageParam;
  searchParams: any;
}) {
  const [loader, setLoader] = useState(false);
  const Router = useRouter();
  const dispatch = useDispatch();
  const [prodData, setprodData] = useState<ProductData | undefined>(undefined);
  const category = useSelector((state: RootState) => state.Admin.category) as
    | CategoryData[]
    | undefined;

  useEffect(() => {
    const user: userData | null = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    if (!Cookies.get("token") || user?.role !== "admin") {
      Router.push("/");
    }
  }, [Router]);

  const { data, isLoading } = useSWR("/gettingProductbyID", () =>
    get_product_by_id(params.id)
  );
  if (data?.success !== true) toast.error(data?.message);

  useEffect(() => {
    setprodData(data?.data);
  }, [data]);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (prodData) {
      setValue("name", prodData?.productName);
      setValue("description", prodData?.productDescription);
      setValue("slug", prodData?.productSlug);
      setValue("feature", prodData?.productFeatured);
      setValue("quantity", prodData?.productQuantity);
      setValue("price", prodData?.productPrice);
      setValue("warranty.type", prodData?.warranty?.type || "standard");
      setValue("warranty.duration", prodData?.warranty?.duration || 12);
      setValue("warranty.description", prodData?.warranty?.description || "");
      setValue(
        "warranty.terms",
        Array.isArray(prodData?.warranty?.terms)
          ? prodData.warranty.terms.join("\n")
          : ""
      );
      setValue(
        "warranty.coverage",
        Array.isArray(prodData?.warranty?.coverage)
          ? prodData.warranty.coverage.join("\n")
          : ""
      );
    }
  }, [prodData, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoader(true);
    try {
      const formData = {
        productName:
          data.name !== prodData?.productName
            ? data.name
            : prodData?.productName,
        productDescription:
          data.description !== prodData?.productDescription
            ? data.description
            : prodData?.productDescription,
        productSlug:
          data.slug !== prodData?.productSlug
            ? data.slug
            : prodData?.productSlug,
        productFeatured:
          data.feature !== prodData?.productFeatured
            ? data.feature
            : prodData?.productFeatured,
        productQuantity:
          data.quantity !== prodData?.productQuantity
            ? data.quantity
            : prodData?.productQuantity,
        productPrice:
          data.price !== prodData?.productPrice
            ? data.price
            : prodData?.productPrice,
        productCategory: data.categoryID
          ? data.categoryID
          : prodData?.productCategory,
        warranty: {
          type: data.warranty?.type || prodData?.warranty?.type || "standard",
          duration:
            data.warranty?.duration || prodData?.warranty?.duration || 12,
          description:
            data.warranty?.description || prodData?.warranty?.description || "",
          terms: (data.warranty?.terms || "")
            .split("\n")
            .filter((term) => term.trim()),
          coverage: (data.warranty?.coverage || "")
            .split("\n")
            .filter((item) => item.trim()),
        },
      };

      const res = await update_a_product(formData);
      if (res?.success) {
        toast.success(res?.message);
        dispatch(setNavActive("Base"));
        setTimeout(() => {
          Router.push("/Dashboard");
        }, 2000);
      } else {
        toast.error(res?.message);
        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoader(false);
    }
  };

  return (
    <div className="w-full dark:text-black p-4 min-h-screen  bg-gray-50 flex flex-col ">
      <div className="text-sm breadcrumbs  border-b-2 border-b-orange-600">
        <ul>
          <li onClick={() => dispatch(setNavActive("Base"))}>
            <Link href={"/Dashboard"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Update Product
          </li>
        </ul>
      </div>
      <div className="w-full h-20 my-2 text-center">
        <h1 className="text-2xl py-2 ">Update Product</h1>
      </div>
      {isLoading || loader ? (
        <div className="w-full  flex-col h-96 flex items-center justify-center ">
          {/* <TailSpin
            height="50"
            width="50"
            color="orange"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> */}
          <h6>Loading...</h6>
          <p className="text-sm mt-2 font-semibold text-orange-500">
            updating product Hold Tight ....
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex items-start justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg  py-2 flex-col "
          >
            <div className="form-control w-full max-w-full">
              <label className="label">
                <span className="label-text">Choose Category</span>
              </label>
              <select
                {...register("categoryID", { required: true })}
                className="select select-bordered"
              >
                <option disabled selected>
                  Pick one category{" "}
                </option>
                {category?.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Product Slug</span>
              </label>
              <input
                {...register("slug", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.slug && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.slug && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                {...register("quantity", { required: true })}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              {errors.slug && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control py-2">
              <label className="label cursor-pointer">
                <span className="label-text">Featured Product</span>
                <input
                  {...register("feature")}
                  type="checkbox"
                  className="checkbox dark:border-black"
                />
              </label>
            </div>
            {prodData && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Old Image</span>
                </label>
                <Image
                  src={prodData?.productImage || ""}
                  alt="No Image Found"
                  width={200}
                  height={200}
                />
              </div>
            )}

            {/* Warranty Section */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Warranty Information
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="warranty.type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty Type
                  </label>
                  <select
                    id="warranty.type"
                    {...register("warranty.type")}
                    className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  >
                    <option value="standard">Standard Warranty</option>
                    <option value="extended">Extended Warranty</option>
                  </select>
                </div>

                <div className="relative">
                  <label
                    htmlFor="warranty.duration"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty Duration (months)
                  </label>
                  <input
                    type="number"
                    id="warranty.duration"
                    {...register("warranty.duration")}
                    className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="warranty.description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty Description
                  </label>
                  <textarea
                    id="warranty.description"
                    {...register("warranty.description")}
                    rows={3}
                    className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="warranty.terms"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty Terms (one per line)
                  </label>
                  <textarea
                    id="warranty.terms"
                    {...register("warranty.terms")}
                    rows={4}
                    className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                    placeholder="Enter each term on a new line"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="warranty.coverage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Warranty Coverage (one per line)
                  </label>
                  <textarea
                    id="warranty.coverage"
                    {...register("warranty.coverage")}
                    rows={4}
                    className="border border-indigo-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                    placeholder="Enter each coverage item on a new line"
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-block mt-3">Done !</button>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        aria-label="Notifications"
      />
    </div>
  );
}
