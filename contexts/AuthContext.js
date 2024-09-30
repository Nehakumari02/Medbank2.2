// contexts/AuthContext.js
import { createContext, useState, useContext } from 'react';

//Usage
//import { useAuth } from '@/contexts/AuthContext';
//const { oauthToken, logout etc } = useAuth();

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [session, setSession] = useState(null);
  const [oauthToken, setOauthToken] = useState('');

  // useEffect(() => {
  //   const checkSession = async () => {
  //     console.log("checking Session");
  //     const { data: { session } } = await supabase.auth.getSession();
  //     setUser(session?.user || null);
  //     setSession(session);

  //     // Client-side cookie access, for upgraded scope access
  //     const accessToken = Cookies.get('accessToken'); // Using js-cookie
  //     if (accessToken) {
  //       setOauthToken(accessToken);
  //       console.log("Updated Oauth from cookie, deleting cookie");
  //       const expiryTimestamp = new Date().getTime() + 3600 * 1000; //assuming token duration of one hour
  //       setOauthTokenExpiry(expiryTimestamp);
  //       Cookies.remove('accessToken', { path: '/' });
  //     }

  //     if (session?.provider_token && !oauthToken) {
  //       console.log("Setting Oauth Token from Supabase");
  //       setOauthToken(session.provider_token);
  //       const expiresIn = session.expires_in;
  //       const expiryTimestamp = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
  //       setOauthTokenExpiry(expiryTimestamp);
  //     }

  //     refreshAuthTokenIfNeeded();
  //   }

  //   checkSession();

  //   const {data: {subscription}} = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       console.log("Supabase event: ", event, session);
  //       setUser(session?.user || null);
  //       setSession(session);
  //     }
  //   );

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, []);

  // const logout = async() => {
  //   await supabase.auth.signOut();
  //   setUser(null);
  //   setSession(null);
  //   setOauthToken("");
  //   setOauthTokenExpiry(null);
  //   // Perform navigation after state update
  //   router.push("/");
  // };

  // const refreshAuthTokenIfNeeded = async () => {
  //   console.log("Entered refresh Token check");
  //   const currentTime = new Date().getTime();
  //   const bufferTime = 300000; // 5 minutes * 60 seconds * 1000 milliseconds
  //   if (!oauthTokenExpiry || currentTime >= oauthTokenExpiry-bufferTime) {
  //     console.log("Going to refresh token");

  //     const response = await fetch('/api/refreshGoogleToken', { method: 'GET' });
  //     const data = await response.json();
      
  //     if (response.ok && data.accessToken) {
  //       console.log("Updated refresh token");
  //       setOauthToken(data.accessToken);
  //       const newExpiryTime = currentTime + 3600 * 1000; // Assuming 1 hour for example
  //       setOauthTokenExpiry(newExpiryTime);
  //     } else {
  //       console.error('Failed to refresh token:', data.error);
  //       console.log("Have to log you out" );
  //       logout();
  //       // Handle failure, possibly by logging out the user or showing an error message
  //     }
  //   }
  // };

  const value = {
    user,
    setUser,
    oauthToken,
    setOauthToken,
    session,
    setSession,
    // logout,
    // refreshAuthTokenIfNeeded
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
