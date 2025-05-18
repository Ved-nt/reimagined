const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y:'-10',
        opacity:0,
        ease: Expo.easeInOut,
        duration:1.5
    })
        .to(".boundingelem",{
            y:0,
            ease: Expo.easeInOut,
            duration:1.5,
            delay:-1,
            stagger: .2
        })
        .from("#herofooter",{
            y:-10,
            opacity:0,
            duration:1.5,
            ease:Expo.easeInOut,
            delay:-1
        })

}
function circleChapta(){
    //dets.clientX - location of mouse at x-axis
    //define default scale value
    //we need to set limit for the movement of the mouse
    //xdiff will be more when movement of mouse is very fast
    //xdiff will be less when movement of mouse is slow
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);
        //if mouse is moved to the new location then it will store the difference between the old and new position of the mouse
        xprev = dets.clientX;//it will store the previous postion of the mouse
        yprev = dets.clientY;
        circleMouseFollower(xscale,yscale);//it will tell the circleMouseFollower ki x-axis mein kitna scale karna hai aur y-axis mein kitna scale karna hai 
        

    })
}
circleChapta();
function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circleMouseFollower();
firstPageAnim();
//dets.clientY-mouse screen pe kahan par hai height-wise
//elem.getBoundingClientRect-ki elem top se kitna duri pe hai
//upar dono ka difference hame mouse ki position dega elem se kitni duri par hai
//teeno elements ko select karo,uske baad teeno par ek mousemove lagao,jab mousemove ho toh yeh pata karo ki mouse kaha par hai,
//jiska matlab hai mouse ki x and y position ke badle us image ko show karo and us image ko move karo.

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;//it will store the previous position of mouse in x-axis
    var duff = 0;

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:0.5
        });
    });

    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        duff = dets.clientX-rotate;//difference between current and previous position of mouse in x-axis
        rotate = dets.clientX;//new value of rotate will be the previous position of the mouse
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate:gsap.utils.clamp(-20,20,duff*.5)

        });
    });
});

//agar 0 se 10 jaa rahe hai toh 
//rotate=0, dets.clientX=10 and duff=10
//then if we are moving from 10 to 80 
//then rotate = 10 , dets.clientX = 80 and duff=70