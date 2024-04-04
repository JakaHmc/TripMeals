import { auth, googleProvider } from "../components/Firebase";
import { signInWithPopup } from "firebase/auth";
import ButtonSignIn from "../components/ButtonSignIn";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Sign-in successful, navigating to /home...");
      navigate("/home");
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  return (
    <div>
      <ButtonSignIn variant="primary" text="Prijava (Google)" onClick={signInWithGoogle} />
    </div>
  );
};

export default Login;
