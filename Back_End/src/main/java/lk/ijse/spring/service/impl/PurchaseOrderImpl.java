package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailRepo;
import lk.ijse.spring.repo.OrderRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class PurchaseOrderImpl implements PurchaseOrderService {
    @Autowired
    OrderRepo orderRepo;
    @Autowired
    OrderDetailRepo orderDetailRepo;
    @Autowired
    ItemRepo itemRepo;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public void purchaseOrder(OrdersDTO dto) {
        if (!orderRepo.existsById(dto.getOid())) {
            Orders map = modelMapper.map(dto, Orders.class);
            orderRepo.save(map);
            if(dto.getOrderDetails().size()<1)throw new RuntimeException("No Item");
            for (OrderDetails o:map.getOrderDetails()) {
                Item item = itemRepo.findById(o.getItemCode()).get();
                item.setQtyOnHand(item.getQtyOnHand()-o.getQty());
                itemRepo.save(item);
            }

        }else {
            throw new RuntimeException("PurchaseOrder fail");
        }
    }
}
