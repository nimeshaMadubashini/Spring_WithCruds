package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepo extends JpaRepository<Item,String> {
    Item findByCode(String code);

    @Query(value = "update Item set qtyOnHand=?1 where code=?2",nativeQuery = true)
    Item UpdateQty(int qtyOnHand,String code);

    @Query(value = "select code  from Item ",nativeQuery = true)
    List<String> loadItemCode();
}
