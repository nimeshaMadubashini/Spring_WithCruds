package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface ItemService {
    @PostMapping
    public void addItem(ItemDTO dto);

    @DeleteMapping(params = {"id"})
    public  void DeleteItem(String id);

    @GetMapping
    public List<ItemDTO> getAll();

    @GetMapping(params = {"id"})
    public ItemDTO searchItem(String id);

    @PutMapping
    public void updateItem(@RequestBody ItemDTO c);
}
