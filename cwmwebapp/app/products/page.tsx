// pages/products.js
import Image from "next/image";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Pain Relief Tablets",
      description: "Effective relief from pain and inflammation.",
      price: "$15.99",
      image: "/images/pain-relief.jpg",
    },
    {
      id: 2,
      name: "Thermometers",
      description: "Accurate and easy-to-use digital thermometers.",
      price: "$9.99",
      image: "/images/thermometers.jpg",
    },
    {
      id: 3,
      name: "Vitamin Supplements",
      description: "Boost your immune system with premium vitamins.",
      price: "$24.99",
      image: "/images/vitamins.jpg",
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      description: "Reliable and accurate blood pressure monitoring.",
      price: "$45.99",
      image: "/images/blood-pressure.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-teal-600 text-white py-12">
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
                {product.description}
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
