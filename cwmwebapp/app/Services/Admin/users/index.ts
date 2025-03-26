import Cookies from "js-cookie";

// this is for the users

export const get_all_UsersCount = async () => {
  try {
    const res = await fetch(`/api/Admin/UsersCount/get-all-usersCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await res.json();
    console.log("API Response:", data);
    return data.usersCount;
  } catch (error) {
    console.log("error on getting all users count (service) =>", error);
  }
};

export const get_all_Users = async () => {
  try {
    const res = await fetch("/api/Admin/UsersCount/get-all-users", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getting all users (service) =>", error);
  }
};

// export const delete_a_product = async (id: string) => {
//   try {
//     const res = await fetch(`/api/Admin/product/delete-product?id=${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${Cookies.get("token")}`,
//       },
//     });

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log("Error in deleting Product (service) =>", error);
//   }
// };

// export const update_a_product = async (formData: any) => {
//   try {
//     const res = await fetch(`/api/Admin/product/update-product`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${Cookies.get("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log("Error in updating Product (service) =>", error);
//   }
// };

// export const get_product_by_id = async (id: string) => {
//   try {
//     const res = await fetch(`/api/common/product/get-product-by-id?id=${id}`, {
//       method: "GET",
//     });

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log("Error in getting product by ID (service) =>", error);
//   }
// };

// export const get_product_by_category_id = async (id: string) => {
//   try {
//     const res = await fetch(
//       `/api/common/product/get-product-by-category-id?id=${id}`,
//       {
//         method: "GET",
//       }
//     );

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log("Error in getting product by category ID (service) =>", error);
//   }
// };
