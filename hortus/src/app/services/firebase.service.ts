import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, updateProfile,
  sendPasswordResetEmail } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, Firestore } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { getDatabase, ref, push } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsService = inject(UtilsService);


  getAuth(){
    return getAuth();
  }

  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  updateUser(displayName: any) {
    return updateProfile(getAuth().currentUser, {displayName} );
  }

  setDocument(path: any, data: any) {
    return setDoc(doc(getFirestore(),path), data)
  }

  async getDocument(path: any) {
    const docRef = doc(getFirestore(), path); // Referencia al documento
    const docSnapshot = await getDoc(docRef); // Obtener el snapshot
    if (!docSnapshot.exists()) {
      console.error(`El documento en la ruta "${path}" no existe.`);
      return null; // Devuelve null si el documento no existe
    }
    return docSnapshot.data(); // Devuelve los datos si el documento existe
  }
  

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerLink('/auth');
  }

  //formulario modal
  async addDocumentToFirestore(path: string, data: any) {
    try {
      const colRef = this.firestore.collection(path); // Colección en AngularFirestore
      const docRef = await colRef.add(data); // Añadir documento
      console.log('Documento guardado en Firestore:', docRef.id);
      return docRef;
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      throw error;
    }
  }

  async saveImageToRealtimeDatabase(imageDataUrl: string) {
    try {
      const db = getDatabase(); // Instancia de Realtime Database
      const dbRef = ref(db, 'plantImages'); // Referencia al nodo 'plantImages'
      const newImageRef = await push(dbRef, { imageUrl: imageDataUrl }); // Guardar imagen
      console.log('Imagen guardada en Realtime Database con ID:', newImageRef.key);
      return newImageRef; // Retorna la referencia del nodo creado
    } catch (error) {
      console.error('Error al guardar en Realtime Database:', error);
      throw error;
    }
  }
}
