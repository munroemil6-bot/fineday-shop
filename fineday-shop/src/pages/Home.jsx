import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full">

        <img
          src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a"
          alt="Fineday General Store"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">

          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Fineday General Store
          </h1>

          <p className="text-gray-200 mt-4 text-lg max-w-xl">
            Your one-stop shop for fresh Eggs, household essentials, and everyday convenience.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Shop Now
          </button>

        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://media.istockphoto.com/id/172456695/photo/general-store-sign.webp?a=1&b=1&s=612x612&w=0&k=20&c=3sIKZFmp0YJY7gTVckRJBAftJ0O8IHnYwrGq9h5Usig="
          alt="Store shelves"
          className="rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Everything you need, in one place
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed">
            At Fineday General Store, we bring together quality products at affordable prices.
            From fresh Eggs to daily household goods, we ensure convenience and reliability
            for every customer walking through our doors.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
          >
            Browse Products
          </button>
        </div>
      </div>

      {/* FEATURE SECTION */}
      <div className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">
            Why Shop With Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Get the best deals on daily essentials without breaking your budget.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Quick checkout and smooth shopping experience every time.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow">
              <h3 className="font-bold text-xl mb-2">Quality Products</h3>
              <p className="text-gray-600">
                We only stock fresh and trusted products for your home.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="bg-black text-white text-center py-12">

        <h2 className="text-2xl font-bold">
          Ready to start shopping?
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Go to Products
        </button>

      </div>

    </div>
  );
}

export default Home;