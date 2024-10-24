package com.example.api.resource;

import com.example.api.security.CustomJwt;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.text.MessageFormat;



@RestController
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = { RequestMethod.GET }
)
public class AuthController {
    @GetMapping("/hello-regular")
    @PreAuthorize("hasAuthority('regular')")
    public Message hello_regular() {
        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = MessageFormat
                .format("Hello User {0} {1}, how is it going today?",
                        jwt.getFirstname(), jwt.getLastname());
        return new Message(message);
    }

    @GetMapping("/hello-admin")
    @PreAuthorize("hasAuthority('admin')")
    public Message hello_admin() {
        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = MessageFormat
                .format("Hello User {0} {1}, how is it going today?",
                        jwt.getFirstname(), jwt.getLastname());
        return new Message(message);
    }

    @GetMapping("/hello-both")
    @PreAuthorize("hasAuthority('regular') or hasAuthority('admin')")
    public Message hello_both() {
        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = MessageFormat
                .format("Hello User {0} {1}, how is it going today?",
                        jwt.getFirstname(), jwt.getLastname());
        return new Message(message);
    }

    record Message(String message) {}
}