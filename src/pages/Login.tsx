import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Your password must contain between 4 and 60 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement authentication
      console.log('Form submitted:', { email, password, isSignUp });
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('/netflix-bg.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black/60 w-full h-full">
        <nav className="px-12 py-5">
          <Link to="/">
            <img src="/netflix-logo.png" alt="Logo" className="h-12" />
          </Link>
        </nav>
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <div className="bg-black/75 p-16 self-center w-full max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {isSignUp ? 'Sign up' : 'Sign in'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded-md bg-neutral-700 px-6 pt-6 pb-2 text-white text-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'focus:ring-red-500' : 'focus:ring-gray-400'
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className={`w-full rounded-md bg-neutral-700 px-6 pt-6 pb-2 text-white text-md focus:outline-none focus:ring-2 ${
                    errors.password ? 'focus:ring-red-500' : 'focus:ring-gray-400'
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-netflix-red w-full py-3 text-white rounded-md mt-6 hover:bg-red-700 transition"
              >
                {isSignUp ? 'Sign up' : 'Sign in'}
              </button>

              <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 cursor-pointer"
                  />
                  <label htmlFor="remember" className="cursor-pointer">
                    Remember me
                  </label>
                </div>
                <p className="hover:underline cursor-pointer">Need help?</p>
              </div>
            </form>

            <div className="text-neutral-500 mt-12">
              <p className="text-base">
                {isSignUp ? 'Already have an account?' : 'New to Netflix?'}{' '}
                <button
                  className="text-white hover:underline ml-1"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Sign in now' : 'Sign up now'}
                </button>
              </p>
              <p className="text-sm mt-4">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                <span className="text-blue-500 hover:underline cursor-pointer">Learn more</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 