package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepo itemRepo;
@Autowired
    ModelMapper modelMapper;
    @Override
    public void addItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())){
            throw new RuntimeException(dto.getCode()+" "+"Item is allReady exists please give new ID");
        }
        itemRepo.save(modelMapper.map(dto, Item.class));
    }



    @Override
    public void DeleteItem(String id) {
        if(!itemRepo.existsById(id)){
            throw new RuntimeException(id+" " +"item is not Available please check the ID");
        }
        itemRepo.deleteById(id);
    }

    @Override
    public List<ItemDTO> getAll() {
        List<Item> all = itemRepo.findAll();
        return modelMapper.map(all,new TypeToken<List<ItemDTO>>(){}.getType());

    }

    @Override
    public ItemDTO searchItem(String id) {
        if(!itemRepo.existsById(id)){
            throw new RuntimeException(id+" " +"Item is not Available please check the ID");
        }
        Item item = itemRepo.findById(id).get();
        return modelMapper.map(item,ItemDTO.class);
    }

    @Override
    public void updateItem(ItemDTO c) {
        if(!itemRepo.existsById(c.getCode())){
            throw new RuntimeException(c.getCode()+" " +"Item is not Available please check the ID");
        }
        itemRepo.save(modelMapper.map(c, Item.class));
    }
    @Override
    public List<String> loadId(){
        List<String> list = itemRepo.loadItemCode();
        return list;
    }
}
