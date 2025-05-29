
console.log("FIRBASE-AUTH: WORKS");
// import { app } from './firebase-config.mjs';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   sendPasswordResetEmail,
//   signOut,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

// import { mergeUserData } from './firebase-firestore.mjs';

// export const auth = getAuth(app);

// /** Register a new user with email and password */
// export async function registerWithEmail(email, password, firstName, lastName) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const user = userCredential.user;

//     console.log('✅ Firebase Auth user created:', user.uid);

//     await mergeUserData(user.uid, {
//       firstName,
//       lastName,
//       email: user.email,
//       boltScores: {
//         day1: {
//           score: null,
//           timestamp: null,
//           locked: false,
//           statusSaved: false,
//         },
//         day10: {
//           score: null,
//           timestamp: null,
//           locked: true,
//           statusSaved: false,
//         },
//         day20: {
//           score: null,
//           timestamp: null,
//           locked: true,
//           statusSaved: false,
//         },
//       },
//       progress: Object.fromEntries(
//         Array.from({ length: 21 }, (_, i) => [
//           `module${i + 1}`,
//           { completed: false, disabled: i !== 0, timestamp: null },
//         ]),
//       ),
//       modulesCompleted: 0,
//       percentageCompleted: 0,
//       totalModules: 21,
//       createdAt: new Date().toISOString(),
//       favorites: {}, // ✅ Ensure favorites is stored as an object
//     });

//     console.log('✅ Firestore user document written! Fetching it now...');

//     // ✅ Fetch and log Firestore data to confirm it's written
//     const userDocRef = doc(db, 'users', user.uid);
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       console.log('✅ Firestore data confirmed:', userDocSnapshot.data());
//     } else {
//       console.error('🚨 Firestore document is missing!');
//       alert('Registration failed due to Firestore issue.');
//       return;
//     }

//     console.log('✅ Registration complete! Redirecting...');
//     window.location.href = '/respira-dashboard';
//   } catch (error) {
//     console.error(
//       '🚨<<<<<<<<<<<<<<<<<<<<<<<< Error during registration:',
//       error.message,
//     );
//     // alert("Registration failed. Please try again.");
//   }
// }

// /** Log in a user with email and password */
// export async function loginWithEmail(email, password) {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password,
//     );
//     const user = userCredential.user;

//     console.log('✅ User logged in via email:', user.uid);

//     // ✅ Ensure Firestore document is merged/updated for email users
//     await mergeUserData(user.uid, {
//       email: user.email,
//       totalModules: 21, // Ensure `totalModules` exists
//     });

//     console.log('✅ Firestore user document merged/updated for email login.');

//     window.location.href = '/respira-dashboard';
//   } catch (error) {
//     console.error('🚨 Error logging in:', error.message);
//     alert('Login failed. Please check your credentials.');
//   }
// }

// /** Google login */
// const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });

// export async function loginWithGoogle() {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     console.log('Google login successful:', user);

//     await mergeUserData(user.uid, {
//       firstName: user.displayName?.split(' ')[0] || 'FirstName',
//       lastName: user.displayName?.split(' ')[1] || 'LastName',
//       email: user.email,
//       boltScores: {
//         day1: {
//           score: null,
//           timestamp: null,
//           locked: false,
//           statusSaved: false,
//         },
//         day10: {
//           score: null,
//           timestamp: null,
//           locked: true,
//           statusSaved: false,
//         },
//         day20: {
//           score: null,
//           timestamp: null,
//           locked: true,
//           statusSaved: false,
//         },
//       },
//       progress: Object.fromEntries(
//         Array.from({ length: 21 }, (_, i) => [
//           `module${i + 1}`,
//           { completed: false, disabled: i !== 0, timestamp: null },
//         ]),
//       ),
//       modulesCompleted: 0,
//       percentageCompleted: 0,
//       totalModules: 21,
//       createdAt: new Date().toISOString(),
//       favorites: {},
//     });

//     console.log('Firestore user document merged/updated for Google login.');

//     window.location.href = '/respira-dashboard';
//   } catch (error) {
//     console.error('Error during Google login:', error.message);
//     alert('Login failed. Please try again.');
//   }
// }

// /** Send a password reset email */
// export async function resetPassword(email) {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert('Password reset email sent successfully!');
//     console.log('Password reset email sent!');
//   } catch (error) {
//     console.error('Error sending password reset email:', error.message);
//     alert('Error: Could not send password reset email. Please try again.');
//   }
// }

// /** Log out the current user */
// export async function logout() {
//   try {
//     await signOut(auth);
//     console.log('User logged out!');
//     window.location.href = '/login.html';
//   } catch (error) {
//     console.error('Error logging out:', error.message);
//   }
// }

// /** Listen to auth state changes and update login link */
// function updateLoginLink() {
//   const loginLink = document.querySelector('.user-profile-link');

//   if (!loginLink) {
//     console.error('User profile link element not found!');
//     return;
//   }

//   onAuthStateChanged(auth, (user) => {
//     if (!user) {
//       // No user: Reset profile link
//       localStorage.removeItem('userId');
//       loginLink.innerHTML = ''; // Clear any old content
//       loginLink.href = '/login.html';
//       return;
//     }

//     // User is logged in - store ID
//     localStorage.setItem('userId', user.uid);

//     console.log('Authenticated User:', user);
//     console.log('User Provider Data:', user.providerData);

//     // Detect login method
//     const isGoogleUser = user.providerData.some(
//       (provider) => provider.providerId === 'google.com',
//     );

//     let profileElement;
//     if (isGoogleUser && user.photoURL) {
//       // Use Google profile picture
//       profileElement = `<img src="${user.photoURL}" class="user-profile-pic" alt="User Profile">`;
//     } else {
//       // Use inline SVG for email login (not an <img>)
//       profileElement = `
//         <?xml version="1.0" encoding="utf-8"?>
//         <svg class="user-profile-icon" 
//         width="30px" 
//         height="30px" 
//         viewBox="0 0 24 24" 
//         fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         <path d="M9.42864 15.0036L8.5715 16.8486C8.5715 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42864 21 6.42864 21H8.50007L10.7501 19.75L13.5001 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         <path d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>
//       `;
//     }

//     // Apply the correct icon to the user-profile-link
//     loginLink.innerHTML = profileElement;
//     loginLink.href = '/respira-dashboard';
//   });
// }

// updateLoginLink();
