(() => {
 const booking = document.getElementById('kk-booking');
 if (booking) {
  const params = new URLSearchParams(location.search);
  for (const field of ['check_in','check_out','guests']) {
   const value = params.get(field);
   if (value && (field === 'guests' ? /^\d{1,3}$/.test(value) : /^\d{4}-\d{2}-\d{2}$/.test(value))) {
    booking.elements[field].value = value;
    booking.elements[field].dispatchEvent(new Event('input', {bubbles:true}));
   }
  }
 }
 document.querySelectorAll('.kk-stay-search').forEach(form => {
  const arrival=form.elements.check_in, departure=form.elements.check_out;
  const validate=()=>{departure.setCustomValidity(departure.value && arrival.value && departure.value<=arrival.value ? 'Choose a check-out date after check-in.' : '');};
  arrival.addEventListener('input',validate); departure.addEventListener('input',validate);
 });
})();
