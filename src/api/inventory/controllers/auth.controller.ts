// Import the functions you need from the SDKs you need
import { Body, Controller, Param, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LocalAuthGuard } from "src/auth/guards";
import { AdminAuthService } from "src/auth/services";
import { User } from "src/entity";
import { Repository } from "typeorm";
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from '../../../config';
import { Login } from "../dto/auth.dto";

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

@ApiTags("Admin:Auth")
@Controller("/api/admin/auth")
export class AuthController {
    constructor(
      @InjectRepository(User)
      private readonly userRepo: Repository<User>,
      private readonly auth: AdminAuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Body() body: Login, @Request() req) {
      console.log(body)
      return {token: req.user};
    }

    // @Post("signup")
    // async signup(@Body() body: Login, @Request() req) {
    //   return this.userRepo.save({ 
    //     email: body.username,
    //     uid: body.password
    //   });
    // }
}