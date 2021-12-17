package com.example.server.utils;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class MyExceptionHandler {

    public static void TokenValidationHandler(HttpHeaders headers) {
        try {
            String bearer = headers.getFirst(HttpHeaders.AUTHORIZATION);
            System.out.println(" ------ breaer: " + bearer);
            String idToken = bearer.split(" ")[1];
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
        } catch (FirebaseAuthException e) {
            // Token invalid
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You Are Not Authorized for this resource");
        } catch (NullPointerException e) {
            // Token not found
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You Are Not Authorized for this resource");
        }
    }

    public static void TokenValidationHandler(HttpHeaders headers, String Fid) {
        try {
            String bearer = headers.getFirst(HttpHeaders.AUTHORIZATION);
            String idToken = bearer.split(" ")[1];
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
        } catch (FirebaseAuthException e) {
            // Token invalid
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You Are Not Authorized for this resource");
        } catch (NullPointerException e) {
            // Token not found
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You Are Not Authorized for this resource");
        }
    }
}
