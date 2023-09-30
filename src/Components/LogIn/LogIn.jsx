import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase";
import { useRef, useState } from "react";


const LogIn = () => {
    const [error, setError] = useState('');
    const [users, setUsers] = useState(null);
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');
        if (password.length < 6) {
            setError('Password should be at least 6 characters or more');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setError('Please provide atlest 1 or more uppercase character');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setUsers(user)
            if(user.emailVerified){
                setSuccess('Log In Successfull.')
            }
            else{
                return alert('Please Verify your account first')
            }
        })
        .catch(error => {
            setError(error.message)
        })
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        console.log(email);
        setError('');
        if (!email) {
            console.log('Please provide an email')
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Please Provide an valid email');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email to change the password')
        })
        .catch(error => {
            setError(error.message);
        })
        
    }


  return (
    <div className="w-1/2 mx-auto border-2 border-sky-300 rounded-lg px-20 py-10">
        <h2 className="text-3xl font-bold mb-5">Please Log In first</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          ref={emailRef}
          className="py-2 px-4 rounded-md w-full mb-4 bg-gray-300"
          placeholder="Your email..."
          required
        />
        <br />
        <input
          type="password"
          name="password"
          className="py-2 px-4 w-full rounded-md bg-gray-300"
          placeholder="Your password..."
          required
        />
        <br />
        <a onClick={handleForgetPassword} className="text-blue-600 hover:underline cursor-pointer" >Forget Password?</a>
        <input
          type="submit"
          value="LogIn"
          className="btn w-full btn-secondary mt-5"
        />
      </form>
      {
        error && <p className="text-red-700">{error}</p>
      }
      {
        success && <p className="text-green-600">{success}</p>
      }
      <div>
        <p>IF you are new here please <span className="underline text-blue-700 font-bold"><Link to={'/registration'}>Register First</Link></span> </p>
      </div>
    </div>
  );
};

export default LogIn;
