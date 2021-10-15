package covid.simulation.exceptions.handler;

import covid.simulation.exceptions.ResourceNotFound;
import covid.simulation.exceptions.ResourceUnprocessable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ResourceNotFound.class})
    public ResponseEntity<Object> handleResourceNotFound(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), null, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {ResourceUnprocessable.class})
    public ResponseEntity<Object> handleResourceNotProvide(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), null, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}