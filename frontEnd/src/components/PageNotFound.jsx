import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-lg mb-6 text-center">
          {"The page you're looking is not available right, check url, if not case be assured. team is working on it."}
        </p>
        <Link
          to="/"
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-highlight transition"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
