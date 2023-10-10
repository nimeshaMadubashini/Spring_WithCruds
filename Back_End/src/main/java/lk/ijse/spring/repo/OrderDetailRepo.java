package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepo extends JpaRepository<OrderDetails,String> {
}
