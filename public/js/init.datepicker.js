$(function() {
  $.datepicker.setDefaults( $.datepicker.regional[ "es" ] );
  $('.i-am-a-datepicker').datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    onChangeMonthYear: function (year, month, inst) {
        var date = $(this).val();
        if ($.trim(date) != "") {
            var newDate = inst.currentDay + "/" + (month < 10 ? "0" + month : month) + "/" + year;
            $(this).val(newDate);
        }
    }
  });
});