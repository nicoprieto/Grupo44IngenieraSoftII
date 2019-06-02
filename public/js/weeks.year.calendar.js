$(function() {
    var currentYear = new Date().getFullYear();

    var isRangePremiumStart = false;
    var isRangePremiumEnd = false;
    var isRangeBiddingStart = false;
    var isRangeBiddingEnd = false;
    var isRangeHotSaleStart = false;
    var isRangeHotSaleEnd = false;

    var rangePremiumStart = $('#weekYearCalendarRangePremiumStart').val() || '';
    var rangePremiumEnd = $('#weekYearCalendarRangePremiumEnd').val() || '';

    var rangeBiddingStart = $('#weekYearCalendarRangeBiddingStart').val() || '';
    var rangeBiddingEnd = $('#weekYearCalendarRangeBiddingEnd').val() || '';
    
    var rangeHotSaleStart = $('#weekYearCalendarRangeHotSaleStart').val() || '';
    var rangeHotSaleEnd = $('#weekYearCalendarRangeHotSaleEnd').val() || '';

    var premiumRange = null;
    var biddingRange = null;
    var hotSaleRange = null;

    function setPremiumRange() {
        if(rangePremiumStart !== '' && rangePremiumEnd !== '') {
            premiumRange = {
                startDate: formattedDateToDate(rangePremiumStart),
                endDate: formattedDateToDate(rangePremiumEnd),
                color: '#ffc107'
            };
        }
    }

    function setBiddingRange() {
        if(rangeBiddingStart !== '' && rangeBiddingEnd !== '') {
            biddingRange = {
                startDate: formattedDateToDate(rangeBiddingStart),
                endDate: formattedDateToDate(rangeBiddingEnd),
                color: '#28a745',
            };
        }
    }

    function setHotSaleRange() {
        if(rangeHotSaleStart !== '' && rangeHotSaleEnd !== '') {
            hotSaleRange = {
                startDate: formattedDateToDate(rangeHotSaleStart),
                endDate: formattedDateToDate(rangeHotSaleEnd),
                color: '#dc3545',
            };
        }
    }

    function formatDate(date) {
        // date is instance of Date object
        var arr = date.toJSON().split('T')[0].split('-');
        return arr[2] + '/' + arr[1] + '/' + arr[0];
    }

    function formattedDateToDate(date) {
        // date is the output of formatDate
        var arr = date.split('/');
        return new Date(parseInt(arr[2], 10), parseInt(arr[1], 10)-1, parseInt(arr[0], 10));
    }

    $('#weekYearCalendar').calendar({ 
        language: 'es',
        displayWeekNumber: true,
        dataSource: [
        ],
        clickDay: function(element) {
            var date = formatDate(element.date);
            if(isRangePremiumStart) {
                rangePremiumStart = date;
                $('#weekYearCalendarRangePremiumStart').val(rangePremiumStart);
            } else if(isRangePremiumEnd) {
                rangePremiumEnd = date;
                $('#weekYearCalendarRangePremiumEnd').val(rangePremiumEnd);
            } else if(isRangeBiddingStart) {
                rangeBiddingStart = date;
                $('#weekYearCalendarRangeBiddingStart').val(rangeBiddingStart);
            } else if(isRangeBiddingEnd) {
                rangeBiddingEnd = date;
                $('#weekYearCalendarRangeBiddingEnd').val(rangeBiddingEnd);
            } else if(isRangeHotSaleStart) {
                rangeHotSaleStart = date;
                $('#weekYearCalendarRangeHotSaleStart').val(rangeHotSaleStart);
            } else if(isRangeHotSaleEnd) {
                rangeHotSaleEnd = date;
                $('#weekYearCalendarRangeHotSaleEnd').val(rangeHotSaleEnd);
            }
        },
    });

    function isRangeValid(range) {
        if(range === null) {
            alert('No hay rango especificado');
            return false;
        }
        if(range.endDate <= range.startDate) {
            alert('Rango fin es menor/igual a rango comienzo');
            return false;
        }
        return true;
    }

    function updateDataSource() {
        var dataSource = [];
        if(premiumRange !== null) {
            dataSource.push(premiumRange);
        }
        if(biddingRange !== null) {
            dataSource.push(biddingRange);
        }
        if(hotSaleRange !== null) {
            dataSource.push(hotSaleRange);
        }
        $('#weekYearCalendar').data('calendar').setDataSource(dataSource);
    }

    $('#weekYearCalendarRangePremium').on('click', function() {
        setPremiumRange();
        if(isRangeValid(premiumRange)) {
            updateDataSource();
        }
    });

    $('#weekYearCalendarRangeBidding').on('click', function() {
        setBiddingRange();
        if(isRangeValid(biddingRange)) {
            updateDataSource();
        }
    });

    $('#weekYearCalendarRangeHotSale').on('click', function() {
        setHotSaleRange();
        if(isRangeValid(hotSaleRange)) {
            updateDataSource();
        }
    });

    $('#weekYearCalendarRangePremiumStart').on('focus', function() {
        isRangePremiumStart = true;
        isRangePremiumEnd = false;
        isRangeBiddingStart = false;
        isRangeBiddingEnd = false;
        isRangeHotSaleStart = false;
        isRangeHotSaleEnd = false;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    $('#weekYearCalendarRangePremiumEnd').on('focus', function() {
        isRangePremiumStart = false;
        isRangePremiumEnd = true;
        isRangeBiddingStart = false;
        isRangeBiddingEnd = false;
        isRangeHotSaleStart = false;
        isRangeHotSaleEnd = false;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    $('#weekYearCalendarRangeBiddingStart').on('focus', function() {
        isRangePremiumStart = false;
        isRangePremiumEnd = false;
        isRangeBiddingStart = true;
        isRangeBiddingEnd = false;
        isRangeHotSaleStart = false;
        isRangeHotSaleEnd = false;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    $('#weekYearCalendarRangeBiddingEnd').on('focus', function() {
        isRangePremiumStart = false;
        isRangePremiumEnd = false;
        isRangeBiddingStart = false;
        isRangeBiddingEnd = true;
        isRangeHotSaleStart = false;
        isRangeHotSaleEnd = false;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    $('#weekYearCalendarRangeHotSaleStart').on('focus', function() {
        isRangePremiumStart = false;
        isRangePremiumEnd = false;
        isRangeBiddingStart = false;
        isRangeBiddingEnd = false;
        isRangeHotSaleStart = true;
        isRangeHotSaleEnd = false;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    $('#weekYearCalendarRangeHotSaleEnd').on('focus', function() {
        isRangePremiumStart = false;
        isRangePremiumEnd = false;
        isRangeBiddingStart = false;
        isRangeBiddingEnd = false;
        isRangeHotSaleStart = false;
        isRangeHotSaleEnd = true;
    }).on('change keyup keydown paste', function(e) {
        e.preventDefault();
    });

    // after dom loaded, try setting range
    setPremiumRange();
    setBiddingRange();
    setHotSaleRange();
    updateDataSource();
});