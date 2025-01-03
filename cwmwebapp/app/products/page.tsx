// pages/products.js
import Image from "next/image";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "NOVOSMART Drops 20ML",
      description:
        "NOVOSMART Drops offer a premium daily dose of Omega 3 specifically formulated for children, ensuring optimum health and development. Our meticulously crafted Omega 3 is sourced from Europe, promising an unparalleled level of high quality and purity that you can confidently rely on. Each pack of NOVOSMART Drops comes with a dedicated, easy-to-use syringe for exact dosing, making it exceptionally simple and precise for parents to administer the daily required amount. The product is carefully packed in a sturdy glass bottle, ensuring that Omega 3 remains stable and well-protected from harmful environmental effects such as light and air exposure. You can trust Central West Shop to consistently provide the very best products for your child’s wellness needs, as we prioritize your child’s health and developmental milestones.",
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
        "Generic Name: Aluminum Hydroxide+Magensium Hydroxide+Oxetacaine Centracid is an effective solution for managing the discomfort and symptoms associated with hyperacidity and related conditions, offering patients comprehensive and immdediate relief",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className=" bg-blue-950 text-white py-12">
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
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className="object-cover w-full"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mt-2 text-gray-600 text-sm">
                {/* {product.description} */}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-teal-600 font-bold">{product.price}</span>
                <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
