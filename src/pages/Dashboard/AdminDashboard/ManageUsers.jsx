import Swal from "sweetalert2";
import api from "../../../api/api";
import Loader from "../../../components/Shared/Loader/Loader";
import useUsers from "../../../hooks/useUsers";

export default function ManageUsers() {
  const { users, loading, refetch } = useUsers();
  // const changeRole = (id, newRole) => {
  //   setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  // };

  // const markAsFraud = (id) => {
  //   setUsers(users.map(u => u.id === id ? { ...u, isFraud: true } : u));
  //   alert("Vendor has been marked as Fraud! Their tickets will be hidden.");
  // };

  const handleMakeAdmin = async (id) => {
    try {
      const res = await api.patch(`/users/admin/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User has been made Admin.",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleMakeVendor = async (id) => {
    try {
      const res = await api.patch(`/users/vendor/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User has been made Vendor.",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleMarkFraud = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This vendor will be marked as Fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark as Fraud!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await api.patch(`/users/fraud/${id}`);

      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Done!",
          text: "Vendor has been marked as Fraud.",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-200 text-gray-700 font-semibold text-sm">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {users.map((user) => (
              <tr
                key={user.id}
                className={`hover:bg-slate-50/50 transition ${user?.isFraud ? "bg-rose-50/50" : ""}`}
              >
                <td className="p-4 font-semibold text-gray-800">
                  {user.name}{" "}
                  {user?.isFraud && (
                    <span className="ml-2 text-xs bg-rose-600 text-white px-2 py-0.5 rounded font-normal">
                      FRAUD
                    </span>
                  )}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-green-400 text-white"
                        : user.role === "vendor"
                          ? "bg-amber-500 text-white"
                          : "bg-primary text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2 whitespace-nowrap">
                  <button
                    onClick={()=> handleMakeAdmin(user?._id)}
                    disabled={user.role === 'admin'}
                    className={`px-2.5 py-1.5  cursor-pointer text-white rounded-md text-xs font-medium transition disabled:opacity-50 ${user?.role == 'admin' ? 'bg-green-400': 'bg-primary'}`}
                  >
                    {
                      user?.role == 'admin' ? "Admin": "Make Admin"
                    }
                  </button>
                  <button
                    onClick={() => handleMakeVendor(user?._id)}
                    disabled={user.role === 'vendor'}
                    className="px-2.5 py-1.5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition disabled:opacity-50"
                  >
                    {user?.role == 'vendor' ? 'Vendor' : 'Make Vendor'}
                  </button>
                  {user.role === 'vendor' && (
                    <button
                      onClick={() => handleMarkFraud(user?.id)}
                      disabled={user.isFraud}
                      className="px-2.5 py-1.5 bg-amber-500 cursor-pointer hover:bg-amber-700 text-white rounded-md text-xs font-medium transition disabled:opacity-50"
                    >
                      Mark as Fraud
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
