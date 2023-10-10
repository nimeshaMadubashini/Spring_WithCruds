package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {
List<Customer> findCustomerByAddress(String address);

//sql queriry
    @Query(value ="SELECT* FROM Customer",nativeQuery = true)
    List<Customer> getAllCustomer();

    //jpql
    @Query(value = "select c from Customer c")
    List<Customer> gerAllCustomer2();

    //hql
    @Query(value = "from Customer c ")
    List<Customer> gerAllCustomer3();

    //we need  to search a customer by name
    //qery eka execute wenkta api dena value eka nm t set wenw
    //name parameter
    @Query(value ="select * from Customer where name=:nm",nativeQuery = true )
    Customer searchCustomerWithName(@Param("nm") String name);

    //positional parameter
    @Query(value ="select * from Customer where name=?1",nativeQuery = true )
    Customer searchCustomerWithName1(String name);

    @Query(value = "select id from Customer ",nativeQuery = true)
    List<String> loadCusId();
}
