package lk.ijse.spring.controller;

import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.utill.ResponseUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/purchase_order")
@CrossOrigin
public class PurchaseOrder {
    @Autowired
    PurchaseOrderService purchaseOrderService;
    @PostMapping
    public ResponseUtill purchaseOrder(@RequestBody OrdersDTO dto){
        purchaseOrderService.purchaseOrder(dto);
        return new ResponseUtill("ok","Sucsessfull purchase",dto);
    }
}
