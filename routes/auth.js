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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import db from "../Firestore.js";

const userRoutes = (router) => {

  router.post("/signin", async (req, res) => {
    const auth = getAuth();

    try {
      const { email, password, ...userRest } = req.body;

      const loggedIn = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return { email, id: user.uid, token: user.accessToken };
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      if (loggedIn !== undefined) {
        res.send(loggedIn);
      } else {
        console.log("Error values incorrect");
        res.status(400).send({ error: 400, message: "Email and password do not match." })
      }
    } catch (e) {
      console.error("Error values incorrect", e);
      res.status(400).send({ error: 400, message: "Email and password do not match." })
    }
  });

  router.post("/signup", async (req, res) => {
    const date = new Date().toISOString();
    const auth = getAuth();
    try {
      if (!req.body) throw new Error(`New user not defined`);
      const {
        email,
        password,
        businessName,
        businessPhone,
        businessEmail,
        address,
        address1,
        city,
        state,
        postalCode,
        fax,
        verifyPass, ...userRest } = req.body;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;
      const docRef = doc(db, "users", uid);
      const bizRef = doc(db, "businesses", `${uid}-biz`);
      const newBusiness = {
        name: businessName,
        city,
        state,
        businessPhone,
        businessEmail,
        fax,
        address1,
        createdAt: date,
        updatedAt: date
      }

      const newUser = {
        starred: false,
        labels: [],
        emailUsage: 0.0, // GB
        status: "active",
        suspendedBy: "Admin",
        role: "Admin",
        suspendedAt: date,
        lastLoginAt: date,
        createdAt: date,
        updatedAt: date,
        businessId: `${uid}-biz`,
        email,
        ...userRest,
      };

      await setDoc(bizRef, newBusiness);
      const bizSnap = await getDoc(bizRef);

      await setDoc(docRef, newUser);
      const docSnap = await getDoc(docRef);
      res.send({ ...docSnap.data(), id: docSnap.id, ...bizSnap.data(), bizId: bizSnap.id });
    } catch (e) {
      console.error("Error creating user: ", e);
      res.status(422).json({ status: 422, message: 'Account already exists' });
    }
  });

  router.get("/user/:uid", async (req, res) => {
    const auth = getAuth();
    const { uid } = req.params;

    try {
      if (!auth) throw new Error(`No user information provided`);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      res.send({ ...docSnap.data() });
      return;
    } catch (e) {
      console.error("Error user not found: ", e);
      res.status(422).json({ status: 422, message: 'User not found' });
    }
  });

  router.get("/signout", async (req, res) => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        res.status(200).send({ message: 'Signed out successful' });
      })
      .catch(err => {
        res.status(400).send({ message: `Signed out unsuccessful ${err}` });
      })
  });


};

export default userRoutes;
