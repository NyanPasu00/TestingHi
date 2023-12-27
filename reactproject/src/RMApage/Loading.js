import React, { useState, useLayoutEffect } from "react";

export default function Loading() {
  const [loadingUser, setLoadingUser] = useState(true);

  useLayoutEffect(() => {
    const delayRedirect = setTimeout(() => {
      setLoadingUser(false);
    }, 1000);

    return () => clearTimeout(delayRedirect);
  }, []);

  if (loadingUser) {
    // Show a loading indicator while waiting for user details
    return <p>Loading...</p>;
  }
}
