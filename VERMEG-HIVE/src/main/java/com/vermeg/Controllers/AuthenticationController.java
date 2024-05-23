package com.vermeg.Controllers;


import com.vermeg.services.implementation.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

//    @Autowired
//    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;


//    @PostMapping("/login")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) {
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
//            );
//        } catch (BadCredentialsException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect email or password");
//        } catch (DisabledException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or account disabled");
//        }
//
//        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
//        final String jwt = jwtUtil.generateToken(userDetails.getUsername()); // Use jwtUtil instance to generate token
//
//        return ResponseEntity.ok(new AuthenticationResponse(jwt));
//    }
}
