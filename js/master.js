// Random background option
let backgroundOption= true;
//variable to control interval
let interval;
// about us change images
let imagesAbout=document.querySelector('.about-us .image-box img');


//toggle menu
let toggleBtn=document.querySelector('.toggle-menu');
let nav=document.querySelector('header .nav');
document.querySelector('.toggle-menu').addEventListener('click',(e)=>{
    //stop propagation
    e.stopPropagation()
    nav.classList.toggle('open');
    toggleBtn.classList.toggle('menu-active')
})

document.addEventListener('click',(e)=>{
    if(e.target !== toggleBtn && e.target !== nav){
    //check if menu is open
    if(nav.classList.contains('open')){
        nav.classList.toggle('open');
        toggleBtn.classList.toggle('menu-active')
    }
    }
    }) 
    //stop propagation menu
    nav.onclick=(e)=>e.stopPropagation();


//check if there is local storage color options
let mainColor=localStorage.getItem('color_option');
if(mainColor!== null){
    document.documentElement.style.setProperty('--main-color',mainColor);
    //check for active class
    document.querySelectorAll('.colors-list li').forEach(e=>{
    e.classList.remove('active')
    // add active class ton element with colorSet=== local storage item
    if(e.dataset.color===mainColor){
        e.classList.add('active')
    }
  })
//check if there local storage about section image color
if(mainColor=='#d117ed'){
    imagesAbout.src='../images/about1.png';
}else if(mainColor=='#ff5d8f'){
    imagesAbout.src='../images/about2.png';  
}else if(mainColor=='#9d4edd'){
    imagesAbout.src='../images/about3.png';  
}else if(mainColor=='#db00b6'){
    imagesAbout.src='../images/about4.png';  
}else{
    imagesAbout.src='../images/about5.png';
}
}

//select landing page elements
let landing=document.querySelector('.landing-page')
/// setting box
let icon=document.querySelector('.gear');

icon.onclick=function(){
// add class to setting box for open menu setting    
document.querySelector('.settings-box').classList.toggle("open")
// add class to icon for rotation
this.classList.toggle('fa-spin')
}

// switch colors
const colorsLi=document.querySelectorAll('.colors-list li')
//loop in list-items
colorsLi.forEach(li=>{
               li.addEventListener('click',(e)=>{
                //remove class active in all li
                colorsLi.forEach(li=>{
                    li.classList.remove('active')
                })
                //set color on root
                document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
                li.classList.add('active');
                //set color in local storage
                localStorage.setItem('color_option',e.target.dataset.color)
                //change color about image

                if(e.target.dataset.color=='#d117ed'){
                    imagesAbout.src='../images/about1.png';
                }else if(e.target.dataset.color=='#ff5d8f'){
                    imagesAbout.src='../images/about2.png';  
                }else if(e.target.dataset.color=='#9d4edd'){
                    imagesAbout.src='../images/about3.png';  
                }else if(e.target.dataset.color=='#db00b6'){
                    imagesAbout.src='../images/about4.png';  
                }else{
                    imagesAbout.src='../images/about5.png';
                }
            })
    
})
// switch random Background option
const randomBackEl=document.querySelectorAll('.random-background span')
//loop in All-spans

 randomBackEl.forEach(span=>{
              //click in everyspan
                span.addEventListener('click',(e)=>{
                        handleActive(e)
                    if(e.target.dataset.background === "yes"){
                        backgroundOption= true;
                        randomizeBackground()
                        localStorage.setItem('background_option',backgroundOption)
                        }else{
                        backgroundOption= false;
                        clearInterval(interval)
                        localStorage.setItem('background_option',backgroundOption)
                        }
                   
                
            })
    
})

//check if local storage contain background randomize 
let backgroundLocalItem=localStorage.getItem('background_option');
//check if random background in local storage is not empty
if(backgroundLocalItem !==null){
    
    if(backgroundLocalItem==='true'){
        backgroundOption=true;
    }else{
        backgroundOption=false;
    }
    //remove active class for all spans
    randomBackEl.forEach(ele=>{
        ele.classList.remove('active')
    })
    if(backgroundLocalItem==='true'){
    document.querySelector('.yes').classList.add('active')
    }
    else{
        document.querySelector('.no').classList.add('active')
    }

}




//get array of images

let imgsArray=["1.jpg","2.jpg","3.jpg","4.jpg"]
//function to randomize background
function randomizeBackground(){
    if(backgroundOption===true){
        interval=setInterval(()=>{
    //get random number
    let random=Math.floor(Math.random()*imgsArray.length);
    //change background image url
    landing.style.backgroundImage=`url('../images/${imgsArray[random]}')`
}   ,10000)}
}
randomizeBackground()


//for class active add or remove in a(li)
let lis=document.querySelectorAll('.nav li a');
lis.forEach(function(ele){
    ele.onclick=function(){
        lis.forEach(function(ele){
            ele.classList.remove('active')
           
        })
        this.classList.add('active')
    }
})

//select skills selector
let ourSkills=document.querySelector(".skills");
let spans=document.querySelectorAll('.skills span')
window.onscroll=()=>{

    if(scrollY>=ourSkills.offsetTop - 100){
        spans.forEach(e=>{
            e.style.width=e.dataset.progress;
        })
    }
    else{
        spans.forEach(e=>{
            e.style.width='0';
    })
}
}


// to top button
let up=document.querySelector('.up');
window.addEventListener('scroll',()=>{
if(scrollY > landing.offsetTop){
    up.style.display='block';
}else{
    up.style.display='none';
}
})
up.onclick=()=>scrollTo({
    top:0,
    left:0,
    behavior:"smooth"
});
// create popup with Image
let ourGallery=document.querySelectorAll('.gallery img')

ourGallery.forEach(img =>{
    img.addEventListener('click',(e)=>{
        //create overlay Element
        let overlay=document.createElement('div');

        //Add class to overlay
        overlay.className='popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create popup
        let popupBox=document.createElement('div'); 

        //Add class to the popup box
        popupBox.className='popup-box';

        if(img.alt !==null){
            //create Heading
            let imgHeading=document.createElement('h3');

            //create text for heading
            let imgText=document.createTextNode(img.alt);
            //append text in img heading
            imgHeading.appendChild(imgText);
            //append the heading to the popup text
            popupBox.appendChild(imgHeading)
        }
        

        //create the Image
        let popupImage=document.createElement('img');

        //set image source
        popupImage.src=img.src;

        //Add image to popup box
        popupBox.appendChild(popupImage);

        // append the popup box in body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton=document.createElement('span');

        //create the close span text
        let closeButtonText=document.createTextNode('X')

        //Append text to close button
        closeButton.appendChild(closeButtonText);

        //Add class to close button
        closeButton.className='close-button';

        //Add the close button to the popup box
        popupBox.appendChild(closeButton) ;
    })
})

//close popup

document.addEventListener('click',(e)=>{
    //remove the current popup
    if(e.target.className==='close-button'){
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector('.popup-overlay').remove()
    }
})

//time line animation

let leftTime=document.querySelectorAll('.timeline .timeline-content .left');
let rightTime=document.querySelectorAll('.timeline .timeline-content .right');
let timeline=document.querySelector('.timeline')

window.addEventListener('scroll',()=>{
    if(scrollY > timeline.offsetTop - 600){
     leftTime.forEach(element=>{
        element.style.left='0'
     })
     rightTime.forEach(element=>{
        element.style.right='0'
     })
    }else{
        leftTime.forEach(element=>{
            element.style.left='-100%'
         })
         rightTime.forEach(element=>{
            element.style.right='-100%'
         })
    }
})

//Select All bullets (scroll to section)
const AllBullets=document.querySelectorAll('.nav-bullets .bullet');
const AllSection=document.querySelectorAll('header .nav li a')
function scrollToSection(elements){
    elements.forEach(e=>{
        
        e.addEventListener('click',(e)=>{
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth',
            })
        })
    })
}
scrollToSection(AllBullets);
scrollToSection(AllSection);

//handle active state
function handleActive(e){
    e.target.parentElement.querySelectorAll('.active').forEach(element=>{
        element.classList.remove('active');
       
    })
    e.target.classList.add("active");  
}

let bulletSpan=document.querySelectorAll('.bullets-option span');

let bulletContainer=document.querySelector('.nav-bullets');

let bulletLocalItem=localStorage.getItem('bullets_option');

if(bulletLocalItem !==null){
    bulletSpan.forEach(span=>{
    span.classList.remove('active')
    })

    if(bulletLocalItem === 'block'){
        bulletContainer.style.display='block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        bulletContainer.style.display='none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}
bulletSpan.forEach(e=>{
    e.addEventListener('click',(e)=>{
        if(e.target.dataset.display==='show'){
            localStorage.setItem('bullets_option',"block");
            bulletContainer.style.display='block';
        }else{
            localStorage.setItem('bullets_option',"none");
            bulletContainer.style.display='none';
        }
        handleActive(e);
    })
})


//Reset button
document.querySelector('.reset-option').onclick=()=>{
//localStorage.clear();
localStorage.removeItem('background_option');
localStorage.removeItem('color_option');
localStorage.removeItem('bullets_option');
localStorage.removeItem('backgroundSelect');
//reload window
window.location.reload();
};

//footer
let footer=document.querySelector('.footer');
let year=new Date();
footer.innerHTML=` made with wesam hen ${year.getFullYear()}`