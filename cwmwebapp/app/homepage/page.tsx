export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white">
        <div className="relative h-screen">
          <video
            className="absolute inset-0 object-cover w-full h-full"
            src="/videobackgroundFcodes.mp4"
            autoPlay
            loop
            playsInline
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-teal-700/60"></div>
          <div className="relative flex items-center justify-center h-full text-center px-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                FCODES COMPUTER SUPPLY AND SERVICES
              </h1>
              <p className="mt-6 text-lg sm:text-xl">
                IT PRODUCTS AND SERVICES THAT YOU CAN TRUST
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full relative"
            >
              <defs>
                <linearGradient id="fadeGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                fill="url(#fadeGradient)"
                d="M0,128L40,138.7C80,149,160,171,240,160C320,149,400,107,480,101.3C560,96,640,128,720,154.7C800,181,880,203,960,213.3C1040,224,1120,224,1200,197.3C1280,171,1360,117,1400,90.7L1440,64V320H0Z"
              ></path>
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <img
                src="/images/Computers.png"
                className="drop-shadow-lg max-w-5xl w-full sm:w-auto translate-y-1/4"
                alt="product list"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
