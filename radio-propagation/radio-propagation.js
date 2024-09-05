$(document).ready(function() {
    insertPropagationWidget();
});

function insertPropagationWidget() {
    // Domyślny HTML dla przycisku i widżetu
    let propagationButton = `<div class="button-wrapper" id="button-wrapper">
        <button id="togglePropagation" class="propagation-button bg-color-2" alt="radio propagation button" style="border-radius: 0px; width: 100px; position: relative; margin-top: 16px; right: 0px;"><strong>PROPAGATION</strong></button></div>
    `;

    let propagationWidgetDesktop = `
        <div class="radio-propagation-container panel-100 hover-brighten" style="display: none!important; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 10px;">
            <p class="rp-head-text" style="margin-bottom: 15px;"><b>RADIO PROPAGATION</b></p>
            <div class="radio-options" style="display: flex; justify-content: center; gap: 6px;">
                <label><input type="radio" name="propagationOption" value="option1" alt="custom version of propagation map"> Label 1</label>
                <label><input type="radio" name="propagationOption" value="option2" alt="second version of propagation map"> Option 2</label>
                <label><input type="radio" name="propagationOption" value="option3" alt="third version of propagation map"> Option 3</label>
                <label><input type="radio" name="propagationOption" value="option4" alt="fourth version of propagation map"> Option 4</label>
                <label><input type="radio" name="propagationOption" value="option5" alt="fifth version of propagation map"> Option 5</label>
            </div>
            <img id="propagationImage" src="https://www.hamqsl.com/solar101vhfper.php" alt="radio propagation map" style="max-width: 100%; height: auto; object-fit: contain;">
        </div>
    `;

    let propagationWidgetMobile = `
        <div class="radio-propagation-container panel-100 hover-brighten" style="display: none!important; border-radius: 15px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px;">
            <p class="rp-head-text" style="margin-bottom: 15px; font-size:20px;"><b>RADIO PROPAGATION</b></p>
            <select id="propagationSelect" style="margin-bottom: 15px;">
                <option value="option1" alt="custom version of propagation map">Label 1</option>
                <option value="option2" alt="second version of propagation map">Label 2</option>
                <option value="option3" alt="third version of propagation map">Label 3</option>
                <option value="option4" alt="fourth version of propagation map">Label 4</option>
                <option value="option5" alt="fifth version of propagation map">Label 5</option>
            </select>
            <a href="https://www.hamqsl.com/solar.html" title="radio propagation map">
                <img id="propagationImage" src="https://www.hamqsl.com/solarvhf.php" alt="radio propagation map" style="max-width: 100%; height: auto; object-fit: contain;">
            </a>
        </div>
    `;

    // Wstawienie przycisku nad widżetem
    $('#tuner-name').append(propagationButton);

    // Wstawienie widżetu pod przyciskiem, wybór widżetu w zależności od szerokości
    if ($(window).width() >= 516) {
        $('#tuner-name').append(propagationWidgetDesktop);
    } else {
        $('#tuner-name').append(propagationWidgetMobile);
    }

    // Dodanie funkcji przełączania widoczności widżetu po kliknięciu przycisku
    $('#togglePropagation').click(function() {
        $('.radio-propagation-container').toggle();
    });

    function updateStylesBasedOnWidth() {
        let src;
        if ($(window).width() < 516) {
            switch ($('#propagationSelect').val()) {
                case 'option2':
                    src = 'https://www.hamqsl.com/solarpic.php';
                    break;
                case 'option3':
                    src = 'https://www.hamqsl.com/solarn0nbh.php';
                    break;
                case 'option4':
                    src = 'https://www.hamqsl.com/solar.php';
                    break;
                case 'option5':
                    src = 'https://www.hamqsl.com/solar2.php';
                    break;
                default:
                    src = 'https://www.hamqsl.com/solarvhf.php';
            }
        } else {
            switch ($('input[name="propagationOption"]:checked').val()) {
                case 'option2':
                    src = 'https://www.hamqsl.com/solar101vhf.php';
                    break;
                case 'option3':
                    src = 'https://www.hamqsl.com/solar101vhfpic.php';
                    break;
                case 'option4':
                    src = 'https://www.hamqsl.com/solar101sc.php';
                    break;
                case 'option5':
                    src = 'https://www.hamqsl.com/solar101pic.php';
                    break;
                default:
                    src = 'https://www.hamqsl.com/solar101vhfper.php';
            }
        }
        $('#propagationImage').attr('src', src);
    }

    // Wywołanie funkcji przy załadowaniu strony
    updateStylesBasedOnWidth();

    // Dodanie listenera do sprawdzania zmian rozmiaru okna
    $(window).resize(function() {
        updateStylesBasedOnWidth();
    });

    // Funkcja zapisu wybranej opcji do localStorage
    function saveOption(option) {
        localStorage.setItem('propagationOption', option);
    }

    // Odczyt zapisanej opcji z localStorage
    function loadOption() {
        return localStorage.getItem('propagationOption');
    }

    // Przywracanie zapisanej opcji przy ładowaniu strony
    let savedOption = loadOption();
    if (savedOption) {
        if ($(window).width() < 516) {
            $('#propagationSelect').val(savedOption);
        } else {
            $(`input[name="propagationOption"][value="${savedOption}"]`).prop('checked', true);
        }
        updateStylesBasedOnWidth();  // Zaktualizuj mapę na podstawie zapisanej opcji
    }

    // Dodanie obsługi zmiany opcji radiowej (desktop)
    $('.radio-options input').change(function() {
        if ($(window).width() >= 516) {
            let selectedOption = $(this).val();
            saveOption(selectedOption);  // Zapisz opcję w localStorage
            updateStylesBasedOnWidth();
        }
    });

    // Dodanie obsługi zmiany wyboru w selekcie (mobile)
    $('#tuner-name').on('change', '#propagationSelect', function() {
        if ($(window).width() < 516) {
            let selectedOption = $(this).val();
            saveOption(selectedOption);  // Zapisz opcję w localStorage
            updateStylesBasedOnWidth();
        }
    });
}
