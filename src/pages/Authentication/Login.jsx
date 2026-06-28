import { useForm } from "react-hook-form";

import { FaMapMarkerAlt, FaLock, FaCreditCard } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { IoTicketOutline } from "react-icons/io5";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  // sign user from Auth Provider
  const { signUser } = useAuth();

  // navigate
  const navigate = useNavigate();

  // location
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = data;
      console.log(userInfo);

      // sign in user
      // const res = await signUser(userInfo.email, userInfo.password);
      // console.log(res.user);

      const res = toast.promise(signUser(userInfo.email, userInfo.password), {
        loading: "Signing...",
        success: "Login successful!",
        error: "Invalid credentials",
      });

      console.log(res.user);

      // reset form data
      reset();

      // navigae to home or dashboard
      navigate(from);
    } catch (error) {
      console.log(error.message);
    }

    // axios.post("https://dev-vault-server-a6ps.onrender.com/tasks", resourcesData)
    // .then(res => {
    //     console.log(res.data);
    // })
  };

  return (
    <div className="relative min-h-screen w-full bg-secondary flex items-center justify-center overflow-hidden p-4">
      {/* LEFT SIDE ARTWORK DECORATION (DJ/Party Concept) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center opacity-40 select-none pointer-events-none">
        <div className="w-64 h-48 border-2 border-slate-800 rounded-lg flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-sm relative transform -skew-y-12 shadow-2xl">
          {/* <FaMusic className="text-blue-500 text-5xl mb-2 animate-pulse" /> */}
          <IoTicketOutline className="text-blue-500 text-5xl mb-2 animate-pulse" />
          <div className="w-32 h-2 bg-slate-700 rounded-full mb-1"></div>
          <div className="w-24 h-2 bg-slate-700 rounded-full"></div>
          {/* Audio waves */}
          <div className="absolute bottom-4 flex gap-1 items-end h-8">
            <span className="w-1 bg-purple-500 h-4 rounded-full"></span>
            <span className="w-1 bg-pink-500 h-7 rounded-full"></span>
            <span className="w-1 bg-blue-500 h-5 rounded-full"></span>
            <span className="w-1 bg-purple-500 h-8 rounded-full"></span>
          </div>
        </div>
        {/* Floating Pin Map Element */}
        <div className="mt-16 text-blue-500/80 animate-bounce">
          <FaMapMarkerAlt size={48} />
        </div>
      </div>

      {/* CENTER LOGIN CARD */}
      <div className="relative w-full max-w-[480px] bg-white rounded-xl border border-secondary/50 shadow-[0_0_50px_rgba(0,0,0,0.6)] px-8 py-12 z-10">
        {/* Watermark/Background shape inside card */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden rounded-xl">
          <div className="w-72 h-72 border-8 border-white transform rotate-45 skew-x-12"></div>
        </div>

        <div className="relative z-10 text-center">
          <span className="text-secondary tracking-widest text-sm font-semibold uppercase block mb-2">
            Hello
          </span>
          <h1 className="text-primary text-3xl font-extrabold tracking-wide mb-10">
            WELCOME BACK
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-left"
          >
            {/* Email Field */}
            <div>
              <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className={`w-full bg-transparent border-b ${
                  errors.email
                    ? "border-red-500"
                    : "border-secondary focus:border-blue-500"
                } py-2 text-secondary placeholder-slate-600 focus:outline-none transition-colors text-sm`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className={`w-full bg-transparent border-b ${
                  errors.password
                    ? "border-red-500"
                    : "border-secondary focus:border-red-400"
                } py-2 text-secondary placeholder-slate-600 focus:outline-none transition-colors text-sm`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Utilities Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mr-2 accent-[#00e5a3] rounded bg-secondary border-none"
                  {...register("rememberPassword")}
                />
                Remember Password
              </label>
              <Link
                to="/forgot-password"
                className="text-secondary hover:text-primary transition-colors"
              >
                Forget Password
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <Button type="submit" className="w-full" text="Login" />
            </div>
          </form>

          {/* Registration Redirect */}
          <div className="mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up now
            </Link>
          </div>

          {/* Divider Line */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/40"></div>
            </div>
            <span className="relative px-4 bg-primary text-xs font-bold text-white uppercase">
              OR
            </span>
          </div>

          {/* Social Logins */}
          <SocialLogin />
        </div>
      </div>

      {/* RIGHT SIDE ARTWORK DECORATION (Booking/Security Concept) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center opacity-40 select-none pointer-events-none">
        <div className="w-60 h-64 border border-slate-800 rounded-xl bg-slate-900/30 backdrop-blur-sm p-4 flex flex-col justify-between transform skew-y-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <FaLock className="text-yellow-500 text-xl" />
            <div className="w-12 h-3 bg-slate-800 rounded"></div>
          </div>
          <div className="my-4 p-3 bg-slate-950/50 rounded border border-slate-800/80 flex items-center gap-3">
            <FaCreditCard className="text-blue-400 text-2xl" />
            <div className="flex-1 space-y-1">
              <div className="w-16 h-2 bg-slate-700 rounded"></div>
              <div className="w-24 h-1.5 bg-slate-800 rounded"></div>
            </div>
          </div>
          <div className="w-full h-16 border border-dashed border-slate-700 rounded flex items-center justify-center text-[10px] text-slate-500">
            Stadium / Arena Seat
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
