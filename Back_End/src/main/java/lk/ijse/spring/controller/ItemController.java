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
    public ResponseUtill DeleteItem( String code){
        itemService.DeleteItem(code);
        return new ResponseUtill("ok","delete Successfull", code);
    }


    @GetMapping
    public ResponseUtill getAll(){

        List<ItemDTO> all = itemService.getAll();
        return new ResponseUtill("ok","load All Successfull",all);
    }
    @GetMapping(params = {"code"})
    public ResponseUtill searchItem(String code){
        return new ResponseUtill("ok","search Successfull",  itemService.searchItem(code));
    }
    @PutMapping
    public ResponseUtill updateCustomer(@RequestBody ItemDTO c){
        itemService.updateItem(c);
        return new ResponseUtill("ok","update Successfull",c);
    }
    @GetMapping(path = "/one")
    public  ResponseUtill  loadItemId(){
        List<String> list = itemService.loadId();
        return new ResponseUtill("ok","load Successfull",list);

    }
}
