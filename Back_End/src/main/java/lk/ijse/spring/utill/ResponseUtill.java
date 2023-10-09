package lk.ijse.spring.utill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResponseUtill {
    private String state ;
    private String message;
    private Object data;

}
