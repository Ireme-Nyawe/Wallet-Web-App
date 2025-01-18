export default function LoginPage() {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <div className="bg-secondary p-8 rounded-lg shadow-lg text-center w-[500px]"> {/* Increased width */}
          <h1 className="text-accent text-3xl font-bold mb-4">Wallet App</h1>
          <p className="text-dark mb-6">Welcome! Please log in to continue.</p>
          
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-primary py-3 rounded-md font-semibold hover:bg-highlight transition"
            >
              Login
            </button>
          </form>
  
          <div className="mt-4">
            <a
              href="#"
              className="text-highlight hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
  