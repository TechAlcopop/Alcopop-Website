// Age gate state, shared by the gate page and the protected routes.
// Verification is remembered for 24 hours, then the gate shows again.
export const VERIFICATION_TTL = 24 * 60 * 60 * 1000;

export const isAgeVerified = () => {
  try {
    if (localStorage.getItem("isVerified") !== "true") return false;
    const verifiedAt = parseInt(localStorage.getItem("verificationTime"), 10);
    if (!verifiedAt) return false;
    return Date.now() - verifiedAt < VERIFICATION_TTL;
  } catch {
    // Private browsing / blocked storage: treat as unverified
    return false;
  }
};

export const setAgeVerified = () => {
  try {
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("verificationTime", String(Date.now()));
  } catch {
    // Storage unavailable: the visitor passes this session, gate returns next visit
  }
};
