package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.utill.ResponseUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtill addCustomer(CustomerDTO dto){
        customerService.addCustomer(dto);
       return new ResponseUtill("ok","save Successfull",dto) ;
    }

    @DeleteMapping("/{id}")
    public ResponseUtill DeleteCustomer(@PathVariable String id) {
        customerService.DeleteCustomer(id);
        return new ResponseUtill("ok", "delete Successfull", id);
    }

    @GetMapping
    public ResponseUtill getAll(){

        List<CustomerDTO> all = customerService.getAll();
        return new ResponseUtill("ok","load All Successfull",all);
    }
    @GetMapping(params = {"id"})
    public ResponseUtill searchCustomer(String id){
        return new ResponseUtill("ok","search Successfull",  customerService.searchCustomer(id));
    }
    @PutMapping
    public ResponseUtill updateCustomer(@RequestBody CustomerDTO c){

        customerService.updateCustomer(c);
        return new ResponseUtill("ok","update Successfull",c);
    }

@GetMapping(path = "/one")
public  ResponseUtill loadCusId(){
        return new ResponseUtill("ok","load CusID Successfull",customerService.loadCusId());

}
}
