const validator = {
  validateForm: (fieldName, formFields, formErrors) => {
    let fields = formFields;
    let errors = formErrors;
    errors['formIsValid'] = true;

    // Validate Product 
    if ((fieldName == 'product' || fieldName == null) && 'product' in fields) {
      if (!fields['product']) {
        errors['product'] = 'Please Select Product';
        errors['formIsValid'] = false;
      } else {
        errors['product'] = '';
      }
    }

    // Validate Order Date
    if ((fieldName == 'orderDate' || fieldName == null) && 'orderDate' in fields) {
      if (!fields['orderDate']) {
        errors['orderDate'] = 'Please Enter Order Date ';
        errors['formIsValid'] = false;
      } else {
        errors['orderDate'] = '';
      }
    }

        //validate Sale Price
    let pricePattern = new RegExp(/^\d+\.\d{0,2}$/);
      let numberPattern= new RegExp(/^-?[0-9]+$/)
    if ((fieldName == 'salePrice' || fieldName == null) && 'salePrice' in fields) {
      if (!fields['salePrice']) {
        errors['salePrice'] = 'Please Enter Sale Price.';
        errors['formIsValid'] = false;
      } else if (isNaN(fields['salePrice'])) {
        errors['salePrice'] = "Please Enter Number Only";
        errors['formIsValid'] = false;
      } else if((!numberPattern.test(fields['salePrice']))){
         if ((!pricePattern.test(fields['salePrice']))) {
          errors['salePrice'] = "Decimal Limit Upto Two Digit";
          errors['formIsValid'] = false;
        }else{
          errors['salePrice'] = '';
        }
      }      
        else {
        errors['salePrice'] = '';
      }
    }

    return errors;
  },
};
module.exports = validator;