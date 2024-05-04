import useAuthStore from "../../lib/authStore";
const User = () => {
    const {user} = useAuthStore()
    console.log(user)
  return (
    <div className="flex  items-center justify-center py-12">
      <div className="card  bg-base-100 bg-opacity-55 ">
        <div className="card-body">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p className="text-sm text-gray-600">Name: John Doe</p>
          <p className="text-sm text-gray-600">Email: john@example.com</p>
          <button className="btn btn-sm btn-info">Edit Profile</button>
          <button className="btn btn-sm btn-success">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default User;
