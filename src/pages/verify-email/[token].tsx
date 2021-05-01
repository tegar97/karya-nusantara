import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Token = () => {
  const router = useRouter();

  const { token } = router.query;
  useEffect(() => {
    const verifyEmail = async () => {
      await axios
        .put(`v1/users/verify/ukm/${token}`)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {});
      await axios
        .put(`v1/users/verify/${token}`)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {});
    };
    verifyEmail();
  }, [token]);

  return <p>Verify....</p>;
};

export default Token;
