package lk.ijse.spring.repo;

import lk.ijse.spring.config.WebRootConfig;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@WebAppConfiguration//create testing context
@ContextConfiguration(classes = WebRootConfig.class)//test context ekeat awashshy config load krnw
@ExtendWith(SpringExtension.class)
@Transactional
class ItemRepoTest {

    @Autowired
    ItemRepo repo;

    @Test
    public void addItem(){
        Item item = new Item("i00-004", "rice", 5, new BigDecimal(200));
        repo.save(item);

    }
    @Test
    public void  testGetAllCustomer(){
        List<Item> all = repo.findAll();
        for (Item c:all) {
            System.out.println(c.toString());
        }

    }
}