function ready() {
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            
                center: [59.9386300, 30.3141300],
                zoom: 12
            }, {
                searchControlProvider: 'yandex#search'
            }),
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Бургер',
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '././img/map-marker.png',
                // Размеры метки.
                iconImageSize: [45, 45],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }),
            myPlacemarkWith = new ymaps.Placemark([59.90, 30.32], {
                hintContent: 'Бургер',
                balloonContent: '2',
               }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: '././img/map-marker.png',
                // Размеры метки.
                iconImageSize: [45, 45],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            }),
            myPlacemarkWithContent = new ymaps.Placemark([59.930, 30.3], {
                hintContent: 'Бургер',
                balloonContent: '3',
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: '././img/map-marker.png',
                // Размеры метки.
                iconImageSize: [45, 45],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-24, -24],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 15],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            });

        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent)
            .add(myPlacemarkWith);
            myMap.behaviors.disable('scrollZoom'); 
    });



    //--------------fullpage-----------
    $('#fullpage').fullpage({
        menu: '#navigation',
    });
    $('.slider__list').slick({
        nextArrow: '.scroll__link-right',
        prevArrow: '.scroll__link-left'
    });
    



    //--------------hamburger-----------

    let openMenu = (e) => {
        e.preventDefault();
        hamburgerWindow.classList.add("hamburger-window--active");
    }

    let closeMenu = (e) => {
        e.preventDefault();
        hamburgerWindow.classList.remove("hamburger-window--active");
    }

    const hamburgerWindow = document.getElementById("hamburger-window");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const closeLink = document.getElementById("close__link");

    hamburgerMenu.addEventListener('click', openMenu);
    closeLink.addEventListener('click', closeMenu);


    //--------------accordion menu-----------
    let openAccordionMenu = (e) => {
        e.preventDefault();
        if (e.target.closest('.accordion-menu__item').classList.contains("accordion-menu__item--active")) {
            for (let i = 0; i < accordionMenu.length; i++) {
                accordionMenu[i].classList.remove("accordion-menu__item--active");
            }
        } else {
            for (let i = 0; i < accordionMenu.length; i++) {
                accordionMenu[i].classList.remove("accordion-menu__item--active");
            }

            e.target.closest('.accordion-menu__item').classList.add("accordion-menu__item--active");
        }
    }

    const accordionMenu = document.getElementsByClassName("accordion-menu__item");
    for (let i = 0; i < accordionMenu.length; i++) {
        accordionMenu[i].addEventListener('click', openAccordionMenu)
    }
    //--------------accordion team-----------

    let openAccordionTeam = (e) => {
        e.preventDefault();
        if (e.target.closest('.accordion-team__item').classList.contains("accordion-team__item--active")) {
            for (let i = 0; i < accordionTeam.length; i++) {
                accordionTeam[i].classList.remove("accordion-team__item--active");
            }
        } else {
            for (let i = 0; i < accordionTeam.length; i++) {
                accordionTeam[i].classList.remove("accordion-team__item--active");
            }

            e.target.closest('.accordion-team__item').classList.add("accordion-team__item--active");
        }
    };

    const accordionTeam = document.getElementsByClassName("accordion-team__item");
    for (let i = 0; i < accordionTeam.length; i++) {
        accordionTeam[i].addEventListener('click', openAccordionTeam)
    }

    //--------------myForm-----------
    const myForm = document.querySelector('#myForm');
    const send = document.querySelector("#send");
    
    let closeOverlay = (e) => {
        e.preventDefault();

        overlay.classList.remove("overlay--active");
       
        document.querySelector('body').onwheel = e =>{ return false;};//вернуть скрол
    }

    let openOverlay = (e) => {
        overlay.classList.add("overlay--active");
        overlay.style.background= '#0008';
        document.querySelector('body').onwheel = e => e.stopPropagation();//убрать скрол
    }
    const feedName = document.getElementsByClassName("feed__name");
    const overlayClose = document.getElementById("overlay__close");
    const overlay = document.getElementById("overlay");
    const text = document.getElementById("feed__name");

    var input=document.createElement('input');
    input.type = 'text';
    input.name = 'to';
    input.value = "s@mail.ru";
    input.style.display = "none";
    myForm.appendChild(input);

    send.addEventListener('click', event => {
        event.preventDefault();
        var formData = new FormData();

        formData.append(myForm.elements.name.name, myForm.elements.name.value);
        formData.append(myForm.elements.phone.name, myForm.elements.phone.value);
        formData.append(myForm.elements.to.name, myForm.elements.to.value);
        formData.append(myForm.elements.comment.name, myForm.elements.comment.value);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            displayResponse(xhr.status);
        });
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');//https://webdev-api.loftschool.com/sendmail  https://webdev-api.loftschool.com/sendmail/fail
        xhr.responseType = "json";
        xhr.send(formData);
        function displayResponse (status){
            var statusText = "";
            if (status < 400) {
                statusText='Ваш заказ принят!';
            }
            else{
                statusText='Произошла ошибка!';
            }
            text.textContent = xhr.response.message;
             openOverlay();
        }
    });

    overlayClose.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', closeOverlay);

  
    //--------popup----------------
    let openPopup = (e) => {
        e.preventDefault();
        popup.classList.add("popup--active");
        // document.body.style.position = 'fixed';
        // document.body.style.width= '100%';
        document.querySelector('body').onwheel = e => e.stopPropagation();
        popup.style.background= '#0008';
       
    }
    let closePopup = (e) => {
        e.preventDefault();
        popup.classList.remove("popup--active");
        document.querySelector('body').onwheel = e =>{ return false;};

    }
    const feedButton = document.getElementsByClassName("feed__button");
    const popup = document.getElementById("popup");
    const popupClose = document.getElementById("popup__close");

    for (let i = 0; i < feedButton.length; i++) {
        feedButton[i].addEventListener('click', openPopup);
    }
    popupClose.addEventListener('click', closePopup);
    popup.addEventListener('click', closePopup);
    
// // //------button---------
// let butclick= (e) => {
//     // e.preventDefault();
//     console.log('ff');
// //    e.style.outline="none";
//    for (let i = 0; i < but.length; i++) {
//     but[i].style.outline="none";
// }
// }
// const but = document.getElementsByClassName("button");
// for (let i = 0; i < but.length; i++) {
//     but[i].addEventListener('click', butclick);
// }


//---------------video----------
let videoClick= (e) => {
    e.preventDefault();
    console.log('fff');
        if (video.paused) {
            video.play();
            videoImg.style.display = 'none';
        } else {
            video.pause();
            videoImg.style.display = 'block';
        }
        
}
const video = document.getElementById('video-pl');
const videoImg = document.getElementById('video-img');

videoImg.addEventListener('click', videoClick);
video.addEventListener('click', videoClick);
  

};
document.addEventListener("DOMContentLoaded", ready);