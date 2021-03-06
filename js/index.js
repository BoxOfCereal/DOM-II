function app(){
        // Your code goes here
    const nav = document.querySelector('nav')
    console.log(nav)

    // this as an example of event delegation
    // where setting the event listener on the parent
    // is more efficient and then adding one to each child
    nav.addEventListener('mouseover',e=>{
        if(e.target &&e.target.matches('a.nav-link')  ){
            e.target.classList.toggle('emphasize')
            // console.log(e.target.classList.toggle('.emphasize'))
        }
    })
    nav.addEventListener('mouseout',e=>{
        if(e.target &&e.target.matches('a.nav-link')  ){
            e.target.classList.toggle('emphasize')
            // console.log(e.target.classList.toggle('.emphasize'))
        }
    })
    // prevents the default of the links opening in a new page
    nav.addEventListener('click',e=>{
        if(e.target&&e.target.matches('a.nav-link')){
            e.preventDefault()
            e.stopPropagation()
        }
    })

    const header= document.querySelector('.main-navigation')
    header.addEventListener('click',e=>{
        console.log(e)
        let bus = document.createElement('span')
        bus.textContent = '🚌'
        bus.style = `position:absolute;top:${e.clientY}px;left:${e.clientX}px;`
        // document.body.appendChild(bus);
        header.appendChild(bus);
        // console.log(e.clientY,e.clientX);
    })

    // section content pick event delegation
    const contentPick= document.querySelector('section.content-pick');
    const signupForm= document.querySelector('.sign-up')
    console.log(signupForm)
    contentPick.addEventListener('click',e=>{
        if(e.target &&e.target.matches('div.btn')){
            console.log(e.target)
            signupForm.classList.toggle('display-none')
        }
    })

    signupForm.addEventListener('click',e=>{
        if(e.target){
            if(e.target.matches('div.close')){
                console.log(e.target)
                signupForm.classList.toggle('display-none')
            }
            if(e.target.matches(' input[type= submit]')){
                e.preventDefault();
                signupForm.classList.toggle('display-none')
            }
        }
    })

    // add and remove dash border to elements that are not the submit button
    signupForm.addEventListener('focus',e=>{
        if(e.target && !e.target.matches("input[type= sumbit]") ){
            console.log(e.target)
            e.target.classList.toggle('text-highlight') 
        }
    },true)

    signupForm.addEventListener('blur',e=>{
        if(e.target && !e.target.matches("input[type= sumbit]") ){
            console.log(e.target)
            e.target.classList.toggle('text-highlight') 
        }
    },true)


    //  konami code key press event

    // array to hold user entered keys
    let arrayOfKeys= [];
    const konamiCode= ["ArrowUp","ArrowUp","ArrowDown","ArrowDown",
                    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
                    "b","a","Enter"];

    let intervalId= null;

    // resets the array holding the combination of keys
    function resetCombo(){
        arrayOfKeys= [];
        console.log(`timeout`)
    }

    document.addEventListener('keydown',e=>{
        // add key to array
        arrayOfKeys.push(e.key)
        // if key has been entered within one second reset timer
        if(intervalId){
            window.clearInterval(intervalId)
            intervalId = window.setTimeout(resetCombo,1000)
        }else{
            intervalId = window.setTimeout(resetCombo,1000)
        }
        // if entered keys in the code keys length is the same
        // check to see if the code is correct
        if(arrayOfKeys.length ==konamiCode.length){
            if(arrayOfKeys.every((e,i)=>e===konamiCode[i]))
                alert(`30 lives granted`)
        }
    })

    // sets the width of the div based on the percentage of the page scrolled
    const body = document.querySelector('Body');
    const percentDiv = document.querySelector('.border-bar')

    document.addEventListener('scroll',e=>{
        let percentScrolled= Math.round(body.parentNode.scrollTop /(body.parentNode.scrollHeight-body.parentNode.clientHeight) * 100) 
        percentDiv.setAttribute('style',`width: ${percentScrolled}%;`)
    })


    // opens all images and a new tab
    document.addEventListener('dblclick',e=>{
        if(e.target&&e.target.matches('img') ){
            window.open(`${e.target.src}`,'_blank') 
        }
    })

    // replaces user's copy function
    document.addEventListener('copy',e=>{
        e.clipboardData.setData('text/plain','Don\'t copy that floppy!')
        e.preventDefault()
    })
}

window.addEventListener('load', app)
