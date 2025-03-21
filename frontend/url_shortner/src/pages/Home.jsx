import Navbar from '../Components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Centered Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to the URL Shortener
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Shorten your links and track clicks with ease!
        </p>
      </div>
    </div>
  );
};

export default Home;
