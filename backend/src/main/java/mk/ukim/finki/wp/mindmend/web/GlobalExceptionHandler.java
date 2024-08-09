package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.exceptions.UsernameAlreadyExistsException;
import mk.ukim.finki.wp.mindmend.model.exceptions.UserDoesNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<String> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<String> handleUserDoesNotExistException(UserDoesNotExistException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
