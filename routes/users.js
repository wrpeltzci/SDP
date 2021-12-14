import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import db from "../Firestore.js";

const userRoutes = (router) => {
  router.get("/users", async (req, res) => {
    const { filterOptions: optionsJson, searchTerm } = req.query;
    const filterOptions = JSON.parse(optionsJson);
    const filterLength = filterOptions.length;
    let users = [];
    let q;

    if (searchTerm || filterLength) {
      if (searchTerm && filterLength) {
        q = query(
          collection(db, "users"),
          where("name", "==", searchTerm),
          where("status", "in", filterOptions)
        );
      } else if (searchTerm) {
        q = query(collection(db, "users"), where("name", "==", searchTerm));
      } else {
        q = query(
          collection(db, "users"),
          where("status", "in", filterOptions)
        );
      }
    } else q = query(collection(db, "users"));

    try {
      const snap = await getDocs(q);
      snap.forEach((v) => users.push({ ...v.data(), id: v.id }));
      res.send(users);
    } catch (err) {
      console.log("Error getting users: ", err);
      res.status(400).send("Problem getting users");
    }
  });

  /*
      getUser
      login
      signup
      updateUser
      removeUser
      getUsers(as an admin to pull all managed users)
  */

  router.post("/users", async (req, res) => {
    const date = new Date().toISOString();
    const auth = getAuth();

    try {
      if (!req.body) throw new Error(`New user not defined`);
      const { email, password, ...userRest } = req.body;

// check if email exists

      const loggedIn = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return { email, id: user.uid, token: user.accessToken };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );

    //   const { uid } = userCredential.user;
    //   const docRef = doc(db, "users", uid);

    //   const newUser = {
    //     starred: false,
    //     labels: [],
    //     emailUsage: 0.0, // GB
    //     status: "active",
    //     suspendedBy: "Admin",
    //     suspendedAt: date,
    //     lastLoginAt: date,
    //     createdAt: date,
    //     updatedAt: date,
    //     ...userRest,
    //   };
    //   await setDoc(docRef, newUser);
    //   const docSnap = await getDoc(docRef);
    //   res.send({ ...docSnap.data(), id: docSnap.id });
    if(loggedIn !== undefined) {
      res.send(loggedIn);
    } else {
      console.log("Error values incorrect");
      res.status(400).send({error: 400, message: "Email and password do not match."})
    }
    } catch (e) {
      console.error("Error creating user: ", e);
      res.status(400).send("Error creating user");
    }
  });

  router.put("/users", async (req, res) => {
    const user = req.body;
    const docRef = doc(db, "users", user.id);
    try {
      await setDoc(doc(db, "users", user.id), user);
      const docSnap = await getDoc(docRef);
      res.send({ ...docSnap.data(), id: docSnap.id });
    } catch (e) {
      res.status(400).send("Error putting user");
    }
  });

  router.put("/users/update-status", async (req, res) => {
    const { status, id } = req.body;
    const docRef = doc(db, "users", id);
    try {
      await updateDoc(docRef, { status });
      const docSnap = await getDoc(docRef);
      res.send({ ...docSnap.data(), id: docSnap.id });
    } catch (e) {
      console.error("Error updating user status: ", e);
      res.status(400).send("Problem updating user status");
    }
  });

  router.put("/users/bulk-delete", async (req, res) => {
    const batch = writeBatch(db);
    const { userIds } = req.body;
    const q = query(collection(db, "users"), where("__name__", "in", userIds));
    try {
      const docsRef = await getDocs(q);
      await Promise.all(
        docsRef.docs.map(async (doc) => await batch.delete(doc.ref))
      );
      batch.commit();
      res.send();
    } catch (e) {
      console.error("Error deleting user: ", e);
      res.status(400).send("Problem deleting user");
    }
  });

  router.delete("/users", async (req, res) => {
    const { id } = req.query;
    try {
      await deleteDoc(doc(db, "users", id));
      res.send();
    } catch (e) {
      console.error("Error deleting user: ", e);
      res.status(400).send("Problem deleting user");
    }
  });
};

export default userRoutes;
