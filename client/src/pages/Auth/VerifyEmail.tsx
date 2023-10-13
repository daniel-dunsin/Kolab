import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaT, FaTriangleExclamation } from "react-icons/fa6";
import { verifyAccount } from "../../services/thunks/auth.thunk";
import Button from "../../components/UI/Button";
import { BiCheck, BiLoaderAlt } from "react-icons/bi";
import VerirfcationEmailModal from "../../components/Modals/VerirfcationEmailModal";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [verificationModalOpen, setVerificationModalOpen] =
    useState<boolean>(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verify = async () => {
    setLoading(true);
    setError(false);

    const data = await dispatch(verifyAccount(token));

    if (data.error) {
      setError(true);
      setLoading(false);
    } else {
      setLoading(false);
      setError(false);
      await Swal.fire({
        title: "Account verified",
        text: "Your account has been verified successfully",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <section className="bg-[#f3f3f3] min-h-screen w-full flex items-center justify-center">
      {verificationModalOpen && (
        <VerirfcationEmailModal
          closeModal={() => setVerificationModalOpen(false)}
        />
      )}
      <div className="w-full bg-white max-w-[500px] rounded-md flex items-center flex-col justify-center gap-[.7rem] p-[1rem]">
        {error && !loading && (
          <>
            <span>
              <FaTriangleExclamation className="text-red-500" />
            </span>
            <p>Unable to verify your account</p>
            <Button
              text="Resend Email"
              onClick={() => setVerificationModalOpen(true)}
            />
          </>
        )}

        {loading && !error && (
          <>
            <span>
              <BiLoaderAlt className="animate-spin" />
            </span>
            <p>Verifying your account</p>
          </>
        )}

        {!loading && !error && (
          <>
            <span>
              <BiCheck className="text-green-500 text-[1.2rem]" />
            </span>
            <p>Account verified successfully</p>
          </>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
