import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { addUsers } from "../../api/usersApi";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  // location
  const location = useLocation();
  const from = location.state || "/";
  const handleGoogleLogin = async () => {
  try {
    console.log("clicked");

    // Google Sign In
    const res = await toast.promise(googleLogin(), {
      loading: "Signing in with Google...",
      success: "Google login successful!",
      error: "Google login failed!",
    });

    const user = res.user;

    const userInfo = {
      name: user.displayName,
      email: user.email,
      role: "user",
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      directLogin: true,
    };


    console.log(user);
    console.log(userInfo);

    const result = await addUsers(userInfo);

     console.log(result);

    // Navigate after successful login
    navigate(from || "/");
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <div className="flex justify-center gap-4">
      <button 
      onClick={handleGoogleLogin}
      className="w-9 h-9 rounded-full bg-primary/70 border border-secondary/20 hover:bg-primary cursor-pointer text-white flex items-center justify-center text-sm transition-all duration-300 ease-in-out shadow-md">
        <FaGoogle />
      </button>
      <button className="w-9 h-9 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-800 border-secondary/20 text-white flex items-center justify-center text-sm transition-all duration-300 ease-in-out shadow-md">
        <FaFacebookF />
      </button>
      <button className="w-9 h-9 rounded-full bg-primary/70 border border-secondary/20 hover:bg-primary cursor-pointer text-white flex items-center justify-center text-sm transition-all duration-300 ease-in-out shadow-md">
        <FaTwitter />
      </button>
    </div>
  );
};

export default SocialLogin;
