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
       if (orderRepo.existsById(dto.getOid())) {
           throw new RuntimeException(dto.getOid() + "Is already exists");
       }
        Orders map = modelMapper.map(dto, Orders.class);
         orderRepo.save(map);
        List<OrderDetailsDTO> orderDetails = dto.getOrderDetails();
        for (OrderDetailsDTO d:orderDetails) {
            OrderDetails map1 = modelMapper.map(d, OrderDetails.class);
            orderDetailRepo.save(map1);
            Item byCode = itemRepo.findByCode(d.getItemCode());
            int qtyOnHand = byCode.getQtyOnHand();
            itemRepo.UpdateQty(qtyOnHand-d.getQty(), d.getItemCode());
        }

    }
}
