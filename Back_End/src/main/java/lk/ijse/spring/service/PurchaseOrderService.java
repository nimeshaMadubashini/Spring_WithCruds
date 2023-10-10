package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrdersDTO;
import org.springframework.web.bind.annotation.PostMapping;

public interface PurchaseOrderService {
    @PostMapping
    public void purchaseOrder(OrdersDTO dto);
}
