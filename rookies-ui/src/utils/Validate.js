export const validateFirstName = (value) => {  
  var re = /^[A-Z]$|^[A-Z][a-z]+$/;
  return re.test(value) ;
}

export const validateLastname = (value) => {
  var re = /^([A-Z]$|^[A-Z][a-z]{1,})([ ]([A-Z]$|[A-Z][a-z]{1,})){0,}$/;
  return re.test(value);
}

export const validatePassword = (value) => {
  var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return re.test(value);
}

export const validateDate = (date) => {
  const oneDay=1000*60*60*24;


  const minDate = new Date('1900-01-01');
  const maxDate = new Date('2100-01-01');

  const diffMinDate = Math.round((minDate.getTime()-date.getTime())/oneDay)
  const diffMaxDate = Math.round((maxDate.getTime()-date.getTime())/oneDay)

  if(diffMinDate > 0 || diffMaxDate <= 0) return false;
  return date instanceof Date && !isNaN(date);
}