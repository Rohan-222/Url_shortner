const Navbar = () => {
    return (
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold">URL-SHORTNER</div>
        <div className="space-x-4">
          <a href="/shorten" className="hover:text-gray-300">Short URL</a>
          <a href="/analytics" className="hover:text-gray-300">Analytics</a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  