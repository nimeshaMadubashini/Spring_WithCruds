package lk.ijse.spring.advisor;

import lk.ijse.spring.utill.ResponseUtill;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler {
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)//500
    @ExceptionHandler({RuntimeException.class})
    public ResponseUtill exceptionHandler(RuntimeException e){
        return new ResponseUtill("Error", e.getMessage(), "");
    }
}
