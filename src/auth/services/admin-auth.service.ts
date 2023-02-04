import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { User } from "src/entity";
import { Repository } from "typeorm";
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from '../../config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "aurious-inventory-system.firebaseapp.com",
    projectId: "aurious-inventory-system",
    storageBucket: "aurious-inventory-system.appspot.com",
    messagingSenderId: "161977642304",
    appId: FIREBASE_APP_ID
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async login(userEmail: string, pass: string): Promise<any> {
        return await signInWithEmailAndPassword(auth, userEmail, pass)
          .then((userCredential) => {
            // Signed in 
            const payload = { username: userCredential.user.email, uid: userCredential.user.uid };

            console.log(userCredential.user.uid);
            console.log(userCredential.user.email);

            return this.jwtService.sign(payload);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw new UnauthorizedException();
        });
    }

    async attempt(credential: any) {
        return await this.userRepository.findOne({uid: credential.uid});
    }
}