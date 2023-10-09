
    getAllItem();

    function blindClickEvent() {
    $("#tblItem>tr").click(function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let price = $(this).children().eq(3).text();

        $("#itemCode").val(code);
        $("#itemName").val(name);
        $("#itemQty").val(qty);
        $("#itemPrice").val(price);


    })
}
    $("#btnItem").click(function () {
    let formdata=$("#itemForm").serialize();
    $.ajax({
    url:BASE_URL+"item",
    method:"POST",
    data:formdata,
    dataType:"json",

    success:function (res) {
    alert(res.message);
    setTextFeildValueEmpty();
    getAllItem();

},
    error:function (error) {
    alert(error.responseText.message)
}
})
});

    function getAllItem() {
    $("#tblItem").empty();
    $.ajax({
    url:BASE_URL+"item",
    method:"get",
    dataType: "json",
    success:function (res) {
    let  item=res.data;
    for (let i in item) {
    let itm=item[i];
    let code = itm.code;
    let name = itm.description;
    let qty = itm.qtyOnHand;
    let price = itm.unitPrice;
    let row=`<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${price}</td></tr>`
    $("#tblItem").append(row)
}
    blindClickEvent();
},
    error:function (error) {
    alert(error.responseText.message);
}
})
}
    $("#btnItemGetAll").click(function () {
    getAllItem();
});

    function setTextFeildValueEmpty() {
    let code = $("#itemCode").val(" ");
    let name = $("#itemName").val(" ");
    let qty = $("#itemQty").val(" ");
    let price = $("#itemPrice").val(" ");

}
    $("#btnItemUpdate").click(function () {
    let code = $("#itemCode").val();
    let name = $("#itemName").val();
    let qty = $("#itemQty").val();
    let price = $("#itemPrice").val();

    let itemObj={
    code:code,
        description:name,
        qtyOnHand:qty,
        unitPrice:price
}
    $.ajax({
    url:BASE_URL+"item",
    method:"put",
    data:JSON.stringify(itemObj),
    dataType:"json",
    contentType:"application/json",
    success:function (res) {
    alert(res.message)
    getAllItem();
    setTextFeildValueEmpty();
},
    error:function (error) {
    alert(error.responseText.message)
}
})
});

    $("#btnItemDelete").click(function () {
    let code =$("#itemCode").val();
    $.ajax({
    url:BASE_URL+"item?code="+code,
    method:"DELETE",
    dataType: "json",
    success:function (res) {
    alert(res.message);
    getAllItem();
    setTextFeildValueEmpty();
},
    error:function (error) {
    alert(error.responseText.message)
}
});

})

