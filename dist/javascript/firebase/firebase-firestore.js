console.log("FIRBASE-FIRESTORE: WORKS");


// import { db } from './firebase-config.mjs';

// import {
//   doc,
//   getDoc,
//   onSnapshot,
//   setDoc,
//   updateDoc,
// } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// /** Merge user data into Firestore without overwriting existing fields */
// export async function mergeUserData(userId, newUserData) {
//   try {
//     const userDocRef = doc(db, 'users', userId);
//     const userDocSnapshot = await getDoc(userDocRef);

//     if (userDocSnapshot.exists()) {
//       const existingData = userDocSnapshot.data();

//       const mergedData = {
//         ...existingData,
//         ...newUserData,
//         progress: { ...existingData.progress, ...newUserData.progress },
//         boltScores: { ...existingData.boltScores, ...newUserData.boltScores },
//         favorites: { ...existingData.favorites, ...newUserData.favorites },
//       };

//       await setDoc(userDocRef, mergedData, { merge: true });
//     } else {
//       await setDoc(userDocRef, newUserData);
//     }
//   } catch (error) {
//     console.error('🚨 Error merging user data:', error.message);
//     throw error;
//   }
// }

// /** Save or update user data in Firestore */
// export async function saveUserData(userId, userData) {
//   try {
//     await setDoc(doc(db, 'users', userId), userData, { merge: true });
//   } catch (error) {
//     console.error('Error saving user data:', error.message);
//   }
// }

// /** Fetch user data from Firestore */
// export async function fetchUserData(userId) {
//   try {
//     const userDoc = await getDoc(doc(db, 'users', userId));
//     return userDoc.exists() ? userDoc.data() : null;
//   } catch (error) {
//     console.error('Error fetching user data:', error.message);
//     throw error;
//   }
// }

// /** Listen for real-time updates to user data */
// export function listenToUserUpdates(userId, callback) {
//   const userDocRef = doc(db, 'users', userId);
//   return onSnapshot(userDocRef, (snapshot) => {
//     if (snapshot.exists()) {
//       callback(snapshot.data());
//     } else {
//       console.warn('No user data found!');
//     }
//   });
// }

// /** Submit a course module */

// export async function submitModule(userId, moduleKey) {
//   const userDocRef = doc(db, 'users', userId);
//   const userSnapshot = await getDoc(userDocRef);

//   if (userSnapshot.exists()) {
//     const userData = userSnapshot.data();
//     const progress = userData.progress || {};
//     const totalModules = userData.totalModules || 21;

//     // Ensure the current module is marked as completed
//     if (!progress[moduleKey]?.completed) {
//       progress[moduleKey] = {
//         completed: true,
//         disabled: true, // Keep the current module disabled after completion
//         timestamp: new Date().toISOString(),
//       };

//       // Enable the next module (but do not mark it as completed)
//       const nextModuleKey = `module${
//         parseInt(moduleKey.replace('module', '')) + 1
//       }`;
//       if (progress[nextModuleKey]) {
//         progress[nextModuleKey].disabled = false; // Unlock the next module
//         progress[nextModuleKey].completed = false; // Ensure it's not marked as completed
//       }

//       // Calculate progress stats
//       const modulesCompleted = Object.keys(progress).filter(
//         (key) => progress[key].completed,
//       ).length;

//       const percentageCompleted = Math.round(
//         (modulesCompleted / totalModules) * 100,
//       );

//       // Update Firestore
//       await updateDoc(userDocRef, {
//         progress,
//         modulesCompleted,
//         percentageCompleted,
//       });

//       updateAsideMenuUI(progress); // Update the UI
//     }
//   }
// }
// /** Update the aside menu UI based on progress */
// function updateAsideMenuUI(progress) {
//   console.log('$$$$-Updating aside menu with progress:', progress);
//   document.querySelectorAll('.course-module-block-list-items').forEach((li) => {
//     const moduleKey = li.dataset.moduleKey;
//     console.log(`Processing moduleKey: ${moduleKey}`);

//     if (progress[moduleKey]) {
//       const anchor = li.querySelector('a');
//       const existingIcon = anchor.querySelector(
//         'current-svg-icon, unreleased-svg-icon, completed-svg-icon',
//       );

//       // Remove the existing icon if it exists
//       if (existingIcon) {
//         existingIcon.remove();
//       }

//       // Add the correct icon based on the progress state
//       if (progress[moduleKey].completed) {
//         console.log(`Marking ${moduleKey} as completed`);
//         li.classList.add('completed');
//         li.classList.remove('unreleased');
//         anchor.insertAdjacentHTML(
//           'afterbegin',
//           '<completed-svg-icon></completed-svg-icon>',
//         );
//       } else if (!progress[moduleKey].disabled) {
//         console.log(`Unlocking ${moduleKey}`);
//         li.classList.remove('unreleased');
//         anchor.insertAdjacentHTML(
//           'afterbegin',
//           '<current-svg-icon></current-svg-icon>',
//         );
//       } else {
//         console.log(`Locking ${moduleKey}`);
//         li.classList.add('unreleased');
//         anchor.insertAdjacentHTML(
//           'afterbegin',
//           '<unreleased-svg-icon></unreleased-svg-icon>',
//         );
//       }
//     } else {
//       console.warn(`No progress data found for moduleKey: ${moduleKey}`);
//     }
//   });
// }

// /** Initialize real-time updates and update UI */
// export function initializeRealTimeUpdates(userId) {
//   const userDocRef = doc(db, 'users', userId);

//   // Fetch the user's progress data on page load
//   getDoc(userDocRef).then((docSnapshot) => {
//     if (docSnapshot.exists()) {
//       const userData = docSnapshot.data();
//       const progress = userData.progress || {};
//       updateAsideMenuUI(progress); // Restore the UI state
//     }
//   });

//   // Listen for real-time updates to the user's progress
//   onSnapshot(userDocRef, (docSnapshot) => {
//     if (docSnapshot.exists()) {
//       const userData = docSnapshot.data();
//       const progress = userData.progress || {};
//       updateAsideMenuUI(progress); // Update the UI in real time

//       // Update progress bar
//       const progressBar = document.getElementById('progress-bar');
//       const percentage = userData.percentageCompleted || 0;
//       if (progressBar) {
//         progressBar.style.width = `${percentage}%`;
//       }

//       // Update modules completed count
//       const daysCompleted = document.getElementById('days-completed');
//       if (daysCompleted) {
//         daysCompleted.textContent = userData.modulesCompleted || 0;
//       }
//     }
//   });
// }

// // Run real-time updates when switching modules via menu
// // document.addEventListener('DOMContentLoaded', () => {
// //   document
// //     .querySelectorAll('.course-module-block-list-items a')
// //     .forEach((link) => {
// //       link.addEventListener('click', () => {
// //         const userId = localStorage.getItem('userId');
// //         if (userId) {
// //           initializeRealTimeUpdates(userId);
// //         }
// //       });
// //     });
// // });
