function slider({container,slide,nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){
//Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),  
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper =document.querySelector(wrapper),
          slidesField =document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach((slides)=>{
        slides.style.width = width;
    });

    slider.style.position = 'relative';

    const indicator = document.createElement('ol'),
        dots = [];

    indicator.classList.add('carousel-indicators');
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicator);

    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0){
            dot.style.opacity = 1;
        }
        indicator.append(dot);
        dots.push(dot);
    }
    
    function dotStyle (){
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    };

    function currentNumber (){
        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };

    function deletNotNumber(str){
        return +str.replace(/\D/g, '');  // замена на +width.replace(/\D/g, "")
    }
    next.addEventListener('click', ()=>{
        if(offset == deletNotNumber(width) * (slides.length - 1)){ //.slice(width.lenght -2) => .replace(/\D/g, "");
            offset = 0;
        } else {
            offset += deletNotNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        
        currentNumber();
        dotStyle();
    });

    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = deletNotNumber(width)  * (slides.length - 1);
        } else {
            offset -= deletNotNumber(width) ;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentNumber();        
        dotStyle();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deletNotNumber(width)  * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentNumber();
           dotStyle();
        });
    });
    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // }else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }

    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     }else{
    //         current.textContent = slideIndex ;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
    // }

    // function plusSlide(n){
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', ()=>{
    //     plusSlide(-1);
    // });
    // next.addEventListener('click', ()=>{
    //     plusSlide(1);
    // });
}

export default slider;