package lk.ijse.spring.repo;

import lk.ijse.spring.config.WebRootConfig;
import lk.ijse.spring.entity.Customer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@WebAppConfiguration//create testing context
@ContextConfiguration(classes = WebRootConfig.class)//test context ekeat awashshy config load krnw
@ExtendWith(SpringExtension.class)//jupitar api load krnw

class CustomerRepoTest {
@Autowired
    CustomerRepo repo;
@Test
    public void  testGetAllCustomer(){
    List<Customer> all = repo.findAll();
    for (Customer c:all) {
        System.out.println(c.toString());
    }

}
@Test
public void addCustomer(){
    Customer customer = new Customer("C00-003", "nimesha", "weeraketiya", new BigDecimal(120000));
    repo.save(customer);
}
@Test
public void getAllCustomer(){
    List<Customer> allCustomer = repo.gerAllCustomer2();
    for (Customer c:allCustomer) {
        System.out.println(c.toString());
    }
}
@Test
    public void searchWithANme(){
    Customer nimesha = repo.searchCustomerWithName1("tharindu");
    System.out.println(nimesha.toString());
}

}