(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {

        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            var largestSize = $('input[value="Coffee-zilla"]:checked').size();
            var anyFlavor = document.getElementById('flavorShot').value;
            var strengthLevel = document.getElementById('strengthLevel').value;
            var powerUpChoice = document.getElementById('powerUp').value;

            if (powerUpChoice != '') {
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
                document.getElementById('strengthValue').innerText = 30;
                document.getElementById('strengthValue').style.color = 'green';
            } else {
                if (largestSize && anyFlavor != '' && strengthLevel == 100) {
                    $('#myModal').modal('show');
                    console.log('trigger the MODAL option now');
                    $(document).on('click', '#accept', function(){
                        $('#powerUpForm').show();
                    });
                }
                else {
                    console.log(data);
                    fn(data);
                    this.reset();
                    this.elements[0].focus();
                    document.getElementById('strengthValue').innerText = 30;
                    document.getElementById('strengthValue').style.color = 'green';
                    $('#powerUpForm').hide();
                }
            }
        });
    };

    FormHandler.prototype.resetHandler = function () {
        this.$formElement.on('reset', function () {
            document.getElementById('strengthValue').innerText = 30;
            document.getElementById('strengthValue').style.color = 'green';
            $('#powerUpForm').hide();
        });
    };

    FormHandler.prototype.showSliderValueHandler = function() {
        $(document).ready(function() {
            document.addEventListener('input', function() {
                var sliderValue = document.getElementById('strengthLevel').value;
                if (sliderValue < 35) {
                    document.getElementById('strengthValue').style.color = 'green';
                } else if (sliderValue < 75) {
                    document.getElementById('strengthValue').style.color = 'gold';
                } else {
                    document.getElementById('strengthValue').style.color = 'red';
                }
                document.getElementById('strengthValue').innerText = sliderValue;
            });
        });
    };

    // FormHandler.prototype.showModalHandler = function() {
    //     $('#myModal').on('show.bs.modal', function () {
    //         console.log('ayyyy2');
    //     });
    // };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
