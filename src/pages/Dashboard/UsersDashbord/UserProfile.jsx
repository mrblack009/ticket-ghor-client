import Loader from "../../../components/Shared/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const UserProfile = () => {
  const { user: authUser } = useAuth();

  const {user, loading} = useUser();


  
console.log(user);

  if (loading) return <Loader />;


  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6 max-w-2xl border border-base-300">
      <h3 className="text-2xl font-bold mb-6 border-b border-base-300 pb-3">
        My Profile
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={authUser?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={user?.name || authUser?.displayName}
          className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20"
        />

        {/* User Info */}
        <div className="space-y-4 w-full text-center sm:text-left">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <h4 className="text-xl font-semibold">
              {user?.name || authUser?.displayName || "N/A"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{user?.email || authUser?.email}</p>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <p className="text-sm text-gray-500">Role</p>

            <span className="badge badge-primary badge-outline">
              {user?.role || "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;