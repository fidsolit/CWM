import Link from "next/link";
export default function Navbar() {
  return (
    <div>
      {" "}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-teal-700">
            <img src="LOGO_TRANSPARENT.avif" />
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-teal-600">
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-teal-600"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-teal-600"
            >
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-teal-600">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-teal-600">
              Contact
            </Link>
          </nav>
          <a
            href="#quote"
            className="hidden md:inline-block px-6 py-2 text-white bg-teal-600 rounded hover:bg-teal-500"
          >
            Get a Quote
          </a>
          <button className="block md:hidden text-teal-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
