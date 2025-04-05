import { setWarrantyClaims, setWarrantyClaimsLoading } from "./AdminSlice";

export const fetchWarrantyClaims = async (dispatch: any) => {
  try {
    dispatch(setWarrantyClaimsLoading(true));

    const response = await fetch("/api/admin/warranty-claims", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      dispatch(setWarrantyClaims(data.claims));
    } else {
      console.error("Failed to fetch warranty claims:", data.message);
    }
  } catch (error) {
    console.error("Error fetching warranty claims:", error);
  } finally {
    dispatch(setWarrantyClaimsLoading(false));
  }
};
