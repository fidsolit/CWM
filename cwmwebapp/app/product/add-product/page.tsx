"use client";

import Link from "next/link";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { storage } from "@/utils/Firebase";
import { storage } from "@/utils/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
// import { TailSpin } from 'react-loader-spinner';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import Cookies from "js-cookie";
import { useSWRConfig } from "swr";
// import { add_new_product } from '../Services/Admin/product';
import { add_new_product } from "@/app/Services/Admin/product";
import { motion } from "framer-motion";

type Inputs = {
  name: string;
  description: string;
  slug: string;
  feature: Boolean;
  price: Number;
  quantity: Number;
  categoryID: string;
  image: Array<File>;
};

interface loaderType {
  loader: Boolean;
}

const uploadImages = async (file: File) => {
  const createFileName = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${file?.name}-${timestamp}-${randomString}`;
  };

  const fileName = createFileName();
  const storageRef = ref(storage, `ecommerce/category/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    );
  });
};

const maxSize = (value: File) => {
  const fileSize = value.size / 1024 / 1024;
  return fileSize < 1 ? false : true;
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

interface userData {
  email: String;
  role: String;
  _id: String;
  name: String;
}

interface ProductData {
  name: string;
  brand: string;
  description: string;
  category: string;
  sellingPrice: number;
  unitPrice: number;
  availableQty: number;
  dosageForm: string;
  strength: string;
  sku: string;
  expirationDate: string;
  batchNumber: string;
  storageConditions: string;
  warranty: {
    type: "standard" | "extended";
    duration: number;
    description: string;
    terms: string[];
    coverage: string[];
  };
}

export default function AddProduct() {
  const [loader, setLoader] = useState(false);
  const Router = useRouter();
  const category = useSelector((state: RootState) => state.Admin.category) as
    | CategoryData[]
    | undefined;
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    brand: "",
    description: "",
    category: "",
    sellingPrice: 0,
    unitPrice: 0,
    availableQty: 0,
    dosageForm: "",
    strength: "",
    sku: "",
    expirationDate: "",
    batchNumber: "",
    storageConditions: "",
    warranty: {
      type: "standard",
      duration: 12,
      description: "",
      terms: [],
      coverage: [],
    },
  });

  useEffect(() => {
    const user: userData | null = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    if (!Cookies.get("token") || user?.role !== "admin") {
      Router.push("/");
    }
  }, [Router]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("warranty.")) {
      const warrantyField = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        warranty: {
          ...prev.warranty,
          [warrantyField]: value,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleWarrantyTermsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const terms = e.target.value.split("\n").filter((term) => term.trim());
    setProductData((prev) => ({
      ...prev,
      warranty: {
        ...prev.warranty,
        terms,
      },
    }));
  };

  const handleWarrantyCoverageChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const coverage = e.target.value.split("\n").filter((item) => item.trim());
    setProductData((prev) => ({
      ...prev,
      warranty: {
        ...prev.warranty,
        coverage,
      },
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoader(true);
    const CheckFileSize = maxSize(data.image[0]);
    if (CheckFileSize) return toast.error("Image size must be less then 1MB");
    const uploadImageToFirebase = await uploadImages(data.image[0]);
    // const uploadImageToFirebase = 'https://firebasestorage.googleapis.com/v0/b/socialapp-9b83f.appspot.com/o/ecommerce%2Fcategory%2Fimages131.jpg-1683339363348-c4vcab?alt=media&token=f9303ff9-7d34-4514-a53f-832f72814337';

    const finalData = {
      productName: data.name,
      productDescription: data.description,
      productImage: uploadImageToFirebase,
      productSlug: data.slug,
      productFeatured: data.feature,
      productPrice: data.price,
      productQuantity: data.quantity,
      productCategory: data.categoryID,
    };
    const res = await add_new_product(finalData);
    if (res.success) {
      toast.success(res?.message);
      setTimeout(() => {
        Router.push("/Dashboard");
      }, 2000);
      setLoader(false);
    } else {
      toast.error(res?.message);
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 h-screen px-2 md:mt-20 py-2">
      <div className="text-sm breadcrumbs  border-b-2 border-b-blue-600">
        <ul className="dark:text-black">
          <li>
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
            Add Product
          </li>
        </ul>
      </div>
      <div className="w-full h-20 my-2 text-center">
        <h1 className="text-2xl py-2 dark:text-black ">Add Product</h1>
      </div>
      {loader ? (
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
          <h6>Loading..</h6>
          <p className="text-sm mt-2 font-semibold text-orange-500">
            Adding Product Hold Tight ....
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
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Add product Image</span>
              </label>
              <input
                accept="image/*"
                max="1000000"
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full "
              />
              {errors.image && (
                <span className="text-red-500 text-xs mt-2">
                  This field is required and the image must be less than or
                  equal to 1MB.
                </span>
              )}
            </div>

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
                    name="warranty.type"
                    value={productData.warranty.type}
                    onChange={handleChange}
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
                    name="warranty.duration"
                    value={productData.warranty.duration}
                    onChange={handleChange}
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
                    name="warranty.description"
                    value={productData.warranty.description}
                    onChange={handleChange}
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
                    value={productData.warranty.terms.join("\n")}
                    onChange={handleWarrantyTermsChange}
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
                    value={productData.warranty.coverage.join("\n")}
                    onChange={handleWarrantyCoverageChange}
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

      {/* <ToastContainer /> */}
    </div>
  );
}
