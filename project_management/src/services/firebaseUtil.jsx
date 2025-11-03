import { db, storage } from "./config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const salvarEdital = async (nome, conteudo, file) => {
    const storageRef = ref(storage, `editais/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);

    const edital = {
        nome,
        conteudo,
        arquivoUrl: fileUrl,
        data: new Date()
    };

    await addDoc(collection(db, "editais"), edital);
};
export { db };