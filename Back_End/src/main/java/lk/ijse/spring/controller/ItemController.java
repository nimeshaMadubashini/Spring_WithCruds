package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.utill.ResponseUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@CrossOrigin
public class ItemController {
    @Autowired
    ItemService itemService;

    @PostMapping
    public ResponseUtill addItem(ItemDTO dto){
        itemService.addItem(dto);
        return new ResponseUtill("ok","save Successfull",dto) ;
    }

    @DeleteMapping(params = {"code"})
    public ResponseUtill DeleteItem(@RequestParam("code") String code){
        itemService.DeleteItem(code);
        return new ResponseUtill("ok","delete Successfull", code);
    }


    @GetMapping
    public ResponseUtill getAll(){

        List<ItemDTO> all = itemService.getAll();
        return new ResponseUtill("ok","load All Successfull",all);
    }
    @GetMapping(params = {"id"})
    public ResponseUtill searchCustomer(String id){
        return new ResponseUtill("ok","search Successfull",  itemService.searchItem(id));
    }
    @PutMapping
    public ResponseUtill updateCustomer(@RequestBody ItemDTO c){
        itemService.updateItem(c);
        return new ResponseUtill("ok","update Successfull",c);
    }

}
