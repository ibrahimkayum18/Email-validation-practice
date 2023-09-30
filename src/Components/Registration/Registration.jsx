import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser, updateProfile } from "firebase/auth";
import auth from "../../../firebase";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

const Registration = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.checked.checked;
    console.log(name, email, password, accepted);

    setError("");
    setSuccess('');
    if (password.length < 6) {
      setError("Password should be at least 6 characters or more");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Please provide atlest 1 or more uppercase character");
      return;
    }
    else if(!accepted){
        setError('Please Accept our terms and conditions')
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUsers(user);
        setSuccess("User Created Successfully.");
        console.log(user);

        //Update Profile
        updateProfile(user, {
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() => {
            console.log('Profile updated Successfully');
        })
        .catch(error => {
            console.log(error.message);
        })

        //Send Verification Email to verify the account
        sendEmailVerification(user)
        .then( () => {
            alert('Please check your email to verify the account')
        })
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="w-3/4 mx-auto border-2 border-sky-500 px-20 py-10 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">
          Please Register your account first
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="py-2 border-black px-4 rounded-md mb-4 w-full bg-gray-300"
            placeholder="Your Name..."
          />
          <br />
          <input
            type="email"
            name="email"
            className="py-2 px-4 rounded-md w-full mb-4 bg-gray-300"
            placeholder="Your email..."
            required
          />
          <br />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="py-2 px-4 w-full rounded-md bg-gray-300"
              placeholder="Your password..."
              required
            />
            <label
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4"
              htmlFor="password"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </label>
          </div>
          <br />
          <div>
            <input type="checkbox" name="checked" id="" className="my-2" />
            <span>
              Please accept our <a>terms and conditions</a>
            </span>
          </div>
          <br />
          <input
            type="submit"
            value="Register"
            className="btn w-full btn-secondary mt-5"
          />
        </form>
        <div>
          <p>
            Already have an account? Please{" "}
            <span className="underline text-blue-700 font-bold">
              <Link to={"/login"}>LogIn</Link>
            </span>
          </p>
        </div>
        {success && <p className="text-green-700">{success} </p>}
        {error && <p className="text-red-700">{error}</p>}
      </div>
    </div>
  );
};

export default Registration;
