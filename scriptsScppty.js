faces = ['◕‿◕', '´ヮ`', '´ ▽ `', '｡•́‿•̀｡', '･д･', '｡• ω •｡', '･ᴗ･', '・ ε ・','⁄⁄•⁄ω⁄•//', '´ д `',  '╥﹏╥', '＞＿＜;', '╬ Ò﹏Ó', '¬‿¬', '⊙_⊙',  
'. •́ _ʖ •̀ .', '˵◕ω◕˵', '•ㅅ•❀',  '◉‿◉',  '͡ಠ ʖ̯ ͡ಠ', '´〇`'];
pagename = '';
active = -1;
wiped = false;

function saveState(){
    pN = gelm('pageName');
    pagename = pN.innerHTML;
}

function gelm(id){
    return document.getElementById(id);
}
function replay(elm){
    elm.src = elm.src;
}

function expand(elm, second){
    elm.classList.toggle("active");
    var content = gelm(second);
    if (content.style.maxHeight){
        content.style.padding = '0 auto';
        content.style.maxHeight = null;
        content.style.overflow = 'hidden';
    }
    else {
        if (content.style.padding != '0 auto'){
            content.style.padding = '0 auto';
        }
        else{
            content.style.padding = '18px 10px 20px 20px';
        }
        content.style.maxHeight = '100%';
    } 
}

function wipe(elm){
    var fronts = document.getElementsByClassName("front");
    var easeIn_anims = ['ei1-4', 'ei2-4', 'ei3-4', 'ei4-4'];
    var easeOut_anims = ['eo1-4', 'eo2-4', 'eo3-4', 'eo4-4'];
    var up_anims = ['u1-1', 'u2-1', 'u3-1', 'u4-1'];
    var down_anims = ['d1-1', 'd2-1', 'd3-1', 'd4-1'];
    var scoot_anims = ['s1-1', 's2-2', 's3-3', 's4-4'];
    var scootBack_anims = ['sb1-1', 'sb2-2', 'sb3-3', 'sb4-4'];
    
    if (wiped == false){
       for (i = 0; i < fronts.length; i++){
            fronts[i].classList.remove('fadeInDown');
            fronts[i].classList.remove(scootBack_anims[i]);
            fronts[i].classList.remove(down_anims[i]);
            void fronts[i].offsetWidth;
            if (fronts[i] != elm){
                fronts[i].classList.add(scoot_anims[i]);
            } else {
                fronts[i].classList.add(up_anims[i]);
                active = i;
            }
        }
        wiped = true;
    } else{
        idx = 0;
        for (i = 0; i < fronts.length; i++){
            if (fronts[i] == elm){
                idx = i
            }
        }
        fronts[active].classList.remove(up_anims[active]);
        fronts[active].classList.remove(down_anims[active]);
        fronts[active].classList.remove(scoot_anims[active]);
        fronts[active].classList.remove(scootBack_anims[active]);
        fronts[active].classList.remove(easeIn_anims[active]);
        fronts[active].classList.remove(easeOut_anims[active]);
        void fronts[active].offsetWidth;
        fronts[active].classList.add(easeOut_anims[active]);

        if (active != idx){ //so something else currently active; swap. still wiped
            elm.classList.remove(up_anims[idx]);
            elm.classList.remove(down_anims[idx]);
            elm.classList.remove(scoot_anims[idx]);
            elm.classList.remove(scootBack_anims[idx]);
            elm.classList.remove(easeIn_anims[idx]);
            elm.classList.remove(easeOut_anims[idx]);
            void elm.offsetWidth;
            elm.classList.add(easeIn_anims[idx]);
            active = idx;
        } else{
            active = -1
            wiped = false;
            for (i = 0; i < fronts.length; i++){
                fronts[i].classList.remove(scoot_anims[i]);
                fronts[i].classList.remove(up_anims[i]);
                void fronts[i].offsetWidth;
                if (fronts[i] != elm){
                    fronts[i].classList.add(scootBack_anims[i]);
                } else{
                    fronts[i].classList.add(down_anims[i]);
                }
            }
        }
        
    }
}


function changeExpression(){
    face = gelm('mainExpression');
    face.innerHTML = faces[Math.floor(Math.random() * faces.length)]; 
}

function changeBg(src){
    document.body.style.backgroundImage = 'url(' + src + ')';
}

function wipeBg(){
    document.body.style.backgroundImage = '';
}

function hover(str, elm){
    pN = gelm('pageName');
    pN.innerHTML = str;
}
function unhover(){
    pN = gelm('pageName');
    pN.innerHTML = pagename;
}

function swap(elm, match){
    elm.classList.remove('flipInX');
    elm.classList.add('flipOutXMatch');
    var back = gelm(match);
    back.classList.remove('flipOutXMatch');
    back.classList.add('flipInX');
    elm.style.zIndex = '0';
    back.style.zIndex = '1';
}

function zidx(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.style.zIndex=10;
}

function pulseOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('pulseIn');
    elm.classList.add('pulseOut');
}

function pulseIn(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('pulseOut');
    elm.classList.add('pulseIn');
}

function shakeIn(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.add('shakeSmall');
    setTimeout(function(){shakeOut(elm);}, 2000);
}

function shakeOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('shakeSmall');
}
function fadeIn(elm, col, src, repeat, size){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    if (elm.style.backgroundImage == ''){
        rgba = 'rgba('+ col +')'
        elm.style.backgroundImage = 'linear-gradient(0deg,' + rgba + ',' + rgba + '), url(' + src + ')';
        elm.style.backgroundRepeat = repeat;
        elm.style.backgroundSize = size;
    
        elm.classList.remove('fadeOut');
        elm.classList.add('fadeIn');
    } else {
        elm.classList.remove('fadeIn');
        elm.classList.add('fadeOut');
        setTimeout(function(){elm.style.backgroundImage = ''; fadeIn(elm, col, src, repeat, size);}, 400);
    }
}

function fadeOut(elm){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    elm.classList.remove('fadeIn');
    elm.classList.add('fadeOut');
    setTimeout(function(){elm.style.backgroundImage = '';}, 400);
}

function fadeToggle(elm, col, src, repeat, size){
    if (typeof(elm) == 'string'){
        elm = gelm(elm);
    }
    if (elm.style.backgroundImage == ''){
        rgba = 'rgba('+ col +')'
        elm.style.backgroundImage = 'linear-gradient(0deg,' + rgba + ',' + rgba + '), url(' + src + ')';
        elm.style.backgroundRepeat = repeat;
        elm.style.backgroundSize = size;
    
        elm.classList.remove('fadeOut');
        elm.classList.add('fadeIn');
    } else {
        elm.classList.remove('fadeIn');
        elm.classList.add('fadeOut');
        setTimeout(function(){elm.style.backgroundImage = '';}, 400);
    }
}