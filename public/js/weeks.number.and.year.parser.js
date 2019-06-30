$(function() {

  var format = 'DD/MM/YYYY';

  var $numberField = $('#number');
  var $yearField = $('#year');

  $('#number, #year').on('keyup change', function() {
    var number = parseInt($numberField.val(), 10);
    var year = parseInt($yearField.val(), 10);

    if(
      !isNaN(number) &&
      !isNaN(year) &&
      /^\d{4}$/.test(year.toString())
    ) {
      numberStr = number < 10 ? '0' + number : number.toString();
      yearStr = year.toString();
      var d = moment();
      d.year(yearStr);
      d.week(numberStr);
      if(d.isValid()) {
        var startDate = d.startOf('week').format(format);
        var endDate = d.endOf('week').format(format);
        $('#weekStartDate').html(startDate);
        $('#weekEndDate').html(endDate);
      }
    }
  });

});