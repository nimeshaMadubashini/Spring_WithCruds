package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional//manage all transaction here

public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;
    @Autowired
ModelMapper modelMapper;

    @Override
    public void addCustomer(CustomerDTO dto) {
        if(customerRepo.existsById(dto.getId())){
            throw new RuntimeException(dto.getId()+" "+"Customer is allReady exists please give new ID");
        }
        Customer map = modelMapper.map(dto, Customer.class);
        //first param is source
        //second type you want convert
        customerRepo.save(map);
    }

    @Override
    public void DeleteCustomer(String id) {
        if(!customerRepo.existsById(id)){
            throw new RuntimeException(id+" " +"Customer is not Available please check the ID");
        }
customerRepo.deleteById(id);
    }

    @Override
    public List<CustomerDTO> getAll() {
        List<Customer> all = customerRepo.findAll();
       return modelMapper.map(all,new TypeToken<List<CustomerDTO>>(){}.getType());
       //new TypeToken<>(){}.getType()
        //new TypeToken<List<CustomerDTO>>(){}.getType()
    }

    @Override
    public CustomerDTO searchCustomer(String id) {
        if(!customerRepo.existsById(id)){
            throw new RuntimeException(id+" " +"Customer is not Available please check the ID");
        }
        Customer customer = customerRepo.findById(id).get();
        return modelMapper.map(customer,CustomerDTO.class);
    }

    @Override
    public void updateCustomer(CustomerDTO c) {
        if(!customerRepo.existsById(c.getId())){
            throw new RuntimeException(c.getId()+" " +"Customer is not Available please check the ID");
        }
customerRepo.save(modelMapper.map(c, Customer.class));
    }
}
