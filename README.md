# Sales Reciepts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[Demo Project](https://salesreciept.netlify.com/).
 
## How to use
```bash
git clone https://github.com/jasonbrandoo/sales-reciepts.git
cd sales-reciepts
npm install
npm start
```

## Todo
- [x] User can see an purchase panel containing buttons for each item containing
      the item number, description, and unit price, as well as a 'Clear' and a
      'Checkout' button.
- [x] User can click an item button to make a purchase.
- [x] User can see an field displaying the total sale amount incremented as
      items are purchased.
- [x] User can see a reciept panel displaying the date and time of the sale,
      as well as all items selected for purchase. This includes the item number,
      description, and unit price.
- [x] User can click the 'Clear' button to clear all purchases at any time
      before checking out.
- [x] User can click the 'Checkout' button to complete purchase all selected
      items. The final total purchase amount will be added to the end of the reciept
      panel and all selected items will be added to the database.
- [x] User can see the receipt panel cleared after all items have been added
      to the database.
- [x] User can see a 'Daily Sales' and a 'Clear All' button at the bottom of
      the app window.
- [x] User can click the 'Daily Sales' button to display all items purchased
      by all customers in the receipt panel along with the total of them all.
- [x] User can click the 'Clear All' button to clear the receipt panel and
      delete the record of all purchases from the database.

## Bonus features

- [ ] User can see an thumbnail image of the items on the item buttons.
- [x] User can see the 'Clear' button replaced by 'Clear Entry' and 'Cancel
      All' buttons under the purchase panel
- [x] User can click the 'Clear Entry' button to clear the last selected item
      from the receipt panel. This has the effect of unselecting that item.
- [x] User can click the 'Cancel All' button to clear all purchases made
      before checking out.
- [ ] User can see an input field in the input panel the user may enter the
      name of the customer into when a purchase is made. The customer name will be
      added to all items purchased by that customer in the receipt panel and in the
      rows added to the database.
