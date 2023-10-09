package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface CustomerService {


    @PostMapping
    public void addCustomer(CustomerDTO dto);

    @DeleteMapping(params = {"id"})
    public  void DeleteCustomer(String id);

    @GetMapping
    public List<CustomerDTO> getAll();

    @GetMapping(params = {"id"})
    public CustomerDTO searchCustomer(String id);

    @PutMapping
    public void updateCustomer(@RequestBody CustomerDTO c);

}
