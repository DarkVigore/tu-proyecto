// Importa los módulos necesarios de Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://activity-3-b0116-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Exporta la base de datos
export { db, ref, set, get, child, onValue };
