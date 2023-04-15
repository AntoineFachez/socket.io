import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

const UpdateArrray = ({ dataPack }) => {
  const firestoreContext = dataPack.firestoreContext;
  console.log(dataPack);
  console.log(dataPack.firestoreContext);
  const handleUpdateDoc = async () => {
    // console.log(dataPack.firestoreContext);
    //   const washingtonRef = doc(db, "cities", "DC");
    // const docRef = doc(db, firestoreContext, dataPack.id);
    // Atomically add a new region to the "regions" array field.
    // await updateDoc(docRef, {
    //   regions: arrayUnion("greater_virginia"),
    // });
  };
  // const id = dataPack.id;
  const handleCreateNewVersion = async () => {
    const treatmentVersion = arrayUnion({
      versionId: uuidv4(),
      publish: false,
      createdAt: new Date(),
      treatmentVersionName: dataPack.message,
    });
    const data = {
      treatmentName: dataPack.message,
      treatmentVersions: dataPack.status,
      createdAt: uuidv4(),
      // id: id,
      id: "9kyiZsJRh4GT8fEw1gcK",
      publish: false,
    };
    const newTreatmentRef = doc(db, firestoreContext, data.id);
    await updateDoc(newTreatmentRef, data);
    const docTreatmentRef = doc(db, firestoreContext, data.id);
    const docSnapTreatment = await getDoc(docTreatmentRef);
    //   getAllTreatments();
  };
  handleUpdateDoc();
  handleCreateNewVersion();
};
export { UpdateArrray };
