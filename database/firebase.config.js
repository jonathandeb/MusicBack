
const firebaseConfig={
        
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID
    }
    module.exports={
        firebaseConfig
    }