var W = window.innerWidth
var H = window.innerHeight
var Ypos=0
var gap = W*0.01
var gsize;
var pgs=[]
var pgis=[]
var imgobjs=[]
// 角度
var ab = 70
var at = 40
var title = document.getElementById('title')
var offsetH = H-120*H/Math.abs(120)
var about = document.getElementById('about')



document.addEventListener("wheel", (e) => {
    
    Ypos+=e.wheelDelta
  
    offsetH = H-Math.abs(e.wheelDelta)*int(H/Math.abs(e.wheelDelta))
    // console.log(offsetH)
  
    if (Ypos>0){
      Ypos=0
    }
  
  if (Ypos<windowHeight*-0.30){
    title.children[0].style.color='white'
    title.children[1].style.color='green'
    about.style.display='block'
    about.children[2].style.color='yellow'
    about.children[3].style.color='yellow'
  }else if (Ypos>=windowHeight*-0.30){
    title.children[0].style.color='black'
    title.children[1].style.color='red'
    about.style.display='none'
  }
    
  if (Ypos<windowHeight*-0.5){
      title.style.display = 'none';
      about.style.display='none'
    }else{
      title.style.display = 'block';
      if (Ypos>windowHeight*-0.15){
        about.style.display = 'none';
      }else{
        about.style.display = 'block';
        // about.children[2].style.color='grey'
        // about.children[3].style.color='grey'
      }
      
      // about.style.display='block'
  }
  
  if (Ypos + pgis[pgis.length-1].imgmark<(H-pgis[pgis.length-1].h)){
    Ypos = -1*pgis[pgis.length-1].imgmark+(H-pgis[pgis.length-1].h)
  }
  console.log(Ypos,-1*pgis[pgis.length-1].imgmark)
  
  
  });
var jsondata;
function preload(){
  jsondata=loadJSON('json/data.json')
  let ms = [  "json/img/tm00.png",
              "json/img/tm01.png",
              "json/img/tm02.png",
              "json/img/tm03.png",
              "json/img/tm04.png",
              "json/img/tm05.png"]
  ms.forEach((m)=>{
    imgobjs.push(loadImage(m))
  })
}


function setup(){
    
    title.style.position = 'absolute'
    title.style.left = windowWidth*0.05+'px';
    title.style.top = windowHeight*0.75*0.5+gap+'px';
  
  
    about.style.position = 'absolute'
    about.style.left=window.innerWidth*0.75+'px'
    about.style.width=window.innerWidth*0.20+'px'
    about.style.top=window.innerHeight*0.75*0.25+'px'
    about.style.display='none'
//     title.style.position.left=windowWidth*0.15+'px'
//     title.style.position.top=windowHeight*0.75+gap
    // title.domElement.style.left=windowWidth*0.15
    // title.domElement.style.position.x=windowHeight*0.75+gap
  // right
    pgs.push(new pgCanvas(windowWidth,windowHeight,
                        [[[windowWidth*0.55+gap,0],
                         [windowWidth*0.55+gap+windowHeight*cos(radians(ab))/sin(radians(ab)),windowHeight],
                         [windowWidth,windowHeight],
                         [windowWidth,0]
                         ],
                        ]
                       ))
  
    // below
    pgs.push(new pgCanvas(windowWidth,windowHeight,
                        [[[0,windowHeight*0.75+gap],
                         [0,windowHeight],
                         [windowWidth*0.55+(windowHeight*0.75+gap)*cos(radians(ab))/sin(radians(ab))
                                          +(windowHeight*0.25-gap)*cos(radians(ab))/sin(radians(ab))
                          ,windowHeight],
                         [windowWidth*0.55+(windowHeight*0.75+gap)*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75+gap]
                         ],
                        ]
                       ))
    // left
    pgs.push(new pgCanvas(windowWidth,windowHeight,
                          [[[0,0],
                           [0,windowHeight*0.75],
                          // first i
                           [windowWidth*0.55-gap*6,windowHeight*0.75],
                           [windowWidth*0.55-gap*6+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75*0.5],
                           [windowWidth*0.55-gap*4.5+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75*0.5],
                           [windowWidth*0.55-gap*4.5,windowHeight*0.75],
                          // second i
                           [windowWidth*0.55-gap*3,windowHeight*0.75],
                           [windowWidth*0.55-gap*3+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75*0.5],
                           [windowWidth*0.55-gap*1.5+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75*0.5],
                           [windowWidth*0.55-gap*1.5,windowHeight*0.75],
                          //
                           [windowWidth*0.55,windowHeight*0.75],
                           [windowWidth*0.55+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab)),windowHeight*0.75*0.5],
                           [windowWidth*0.55,0]
                           ],
                          ]
                         ))
    

      // center 由右下角點回放
    pgs.push(new pgCanvas(windowWidth,windowHeight,
                          [[
                            [windowWidth*0.55+windowHeight*0.75*0.5*cos(radians(ab))/sin(radians(ab))+
                             ((windowHeight*0.75+gap)*cos(radians(ab))/sin(radians(ab))-gap*cos(radians(ab))/sin(radians(ab)))*0.25*0.5
                             -gap,
                             windowHeight*0.75*0.5+windowHeight*0.75*0.25*0.5
                             -gap*cos(radians(ab))/sin(radians(ab))
                            ],
                            
                            [windowWidth*0.55+((windowHeight*0.75+gap)*cos(radians(ab))/sin(radians(ab))-gap*cos(radians(ab))/sin(radians(ab)))*0.25
                             -gap,
                             windowHeight*0.75
                             -gap*cos(radians(ab))/sin(radians(ab))
                            ],
                            
                            [windowWidth*0.55+(windowHeight*0.75+gap)*cos(radians(ab))/sin(radians(ab))-gap*cos(radians(ab))/sin(radians(ab))
                             -gap,
                             windowHeight*0.75
                             -gap*cos(radians(ab))/sin(radians(ab))
                            ]
                           ],
                          ]
                         ))
  

  
  jsondata.data.forEach((v,i)=>{
    if (v.type =='TXT'){
      let pg = new pgImg(idY=i,ty=v.type,url='',txttitle=v.title, txttitleEN=v.titleEN)
      // console.log(v.titleEN)
      pgis.push(pg)
    }else if (v.type =='L' || v.type =='R'){
      let pg = new pgImg(idY=i,ty=v.type,url=v.img)
      pg.name=v.name
      pg.topic=v.topic
      pg.desc=v.desc
      pg.nameEN=v.nameEN
      pg.topicEN=v.topicEN
      pg.descEN=v.descEN
      pgis.push(pg)
    }else if (v.type =='C'){
      // console.log(v.imgs)
      let pg = new pgImg(idY=i,ty=v.type,url='')
      // v.img.forEach((im)=>{
      //   imgs.push(loadImage(v))
      // })
      pg.imgs = imgobjs
      pgis.push(pg)
    }else{
      pgis.push(new pgImg(idY=i,ty='TXT',url='',txttitle='title'))
    }
    
  })
  // let i=0;
  //   pgis.push(new pgImg(idY=0,'TXT',url='',txttitle='About IIA'))
  //   pgis.push(new pgImg(idY=1,'L'))
  //   pgis.push(new pgImg(idY=2,'R',url='https://dummyimage.com/1600x900/e0e/fff.png'))
  // // 
  // // pgis.push()
  // // pgis.push(new pgImg(idY=i++,'R',url='https://dummyimage.com/1600x900/e0e/fff.png'))
  // pgis.push(new pgImg(idY=3,'L',url='https://dummyimage.com/1600x900/ee0/fff.png'))
  // pgis.push(new pgImg(idY=4,'R'))
  // // pgis.push(new pgImg(idY=i++,'L',url='https://dummyimage.com/1600x900/e0e/fff.png'))
  // // pgis.push(new pgImg(idY=i++,'R',url='https://dummyimage.com/1600x900/ee0/fff.png'))
  // // pgis.push(new pgImg(idY=i++,'L'))
  // // pgis.push(new pgImg(idY=i++,'R',url='https://dummyimage.com/1600x900/e0e/fff.png'))
}
function draw(){
  // title page
    pgs.forEach((p,i)=>{
      p.pg.position(0,Ypos)
      // right
      if (i==0){
        if (Ypos<windowHeight*-0.075){p.alp-=10}
        else{
          p.alp+=10
        }
      }
      // below
      if (i==1){
        if (Ypos<windowHeight*-0.15){p.alp-=10}
        else{
          p.alp+=10
        }
      }
      // below
      if (i==2){
        if (Ypos<windowHeight*-0.30){p.alp-=10}
        else{
          p.alp+=10
          // about.style.display='block';
          // about.style.opcity+=10;
        }
      }
      // below
      if (i==3){
        if (Ypos<windowHeight*-0.40){p.alp-=10}
        else{
          p.alp+=10
        }
      }
      p.display()
    })
  // pop() 
  // title
  
  // content page
  pgis.forEach((p,i)=>{
    p.display()
  })
}
class pgCanvas{
  constructor(w,h,ldrus=[],alp=225){
    this.w=w
    this.h=h
    this.pg = createGraphics(this.w, this.h)
    document.getElementById("content").appendChild(this.pg.canvas);
    this.pg.elt.style.display = 'block';
    this.pg.elt.style.position = 'absolute';
    this.pg.elt.style.top = 0+'px';
    this.pg.elt.style.left = 0+'px';
    this.ldrus=ldrus
    this.alp=alp;
  }
  display(){
      this.pg.clear()
      this.pg.noStroke()
      if (this.alp<=0) this.alp=0
      else if (this.alp>=225) this.alp=225
      this.pg.fill(256,this.alp);
      this.ldrus.forEach((s)=>{
        this.pg.beginShape();
          s.forEach((vxy)=>{
            this.pg.vertex(vxy[0],vxy[1])
          })
        this.pg.endShape(CLOSE);
      })
      
  }
}
class pgImg{
  constructor(idY=0,ty='L',url='https://dummyimage.com/1600x900/e00/fff.png',txttitle='關於',txttitleEN='About',wh=16/9,w=1600,h=150,alp=225,imgurls=[]){
    // this.pg = createGraphics(w, h)
    this.idY=idY
    this.ty = ty
    this.show=0
    // 根據 前一個 pannel 定位
    if (this.idY==0){
      this.imgmark = windowHeight
    }else{
      this.imgmark = pgis[this.idY-1].imgmark+pgis[this.idY-1].h
      // console.log(this.idY,this.imgmark)
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! title
    if (this.ty == 'TXT'){
      this.w=window.innerWidth
      this.h=h
      this.txttitle=txttitle
      this.txttitleEN=txttitleEN
      this.img = null
      this.txt = document.createElement('div');
      document.getElementById("container").appendChild(this.txt);
      this.txt.setAttribute("width", this.w);
      this.txt.setAttribute("height", this.h);
      this.txt.innerHTML= '<div  class="animate__animated animate__flipInX"><h1 style="text-align: left;">'+this.txttitle+'</h1><h3 style="text-align: left;"> '+this.txttitleEN+'</h3></div1>'
      this.txt.style.left = this.w*0.5+"px"
      this.txt.style.setProperty('--animate-duration', '1.5s');
      this.txt.style.display = 'inline-block';
      this.txt.style.color = 'white';
      this.txt.style.position = 'absolute';
      this.txt.style.top = this.imgmark+this.h*0.8+'px';
      
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! carsoule  
    } else if (this.ty == 'C'){
      this.imgid=0;
      this.wh=wh
      this.w=window.innerWidth*0.6
      this.h=this.w/this.wh
      
      this.imgs=[]
      this.rownum=3
      // 作三個 img 框
      for(let i=0;i<this.rownum;i+=1){
        var m = document.createElement('img')
        m.setAttribute("id", 'C_'+i);
        m.setAttribute("width", this.w);
        m.setAttribute("height", this.h);
        m.style.top = this.imgmark+'px';
        m.style.background = 'red';
        m.style.opacity=0.4;
        document.getElementById("container").appendChild(m);
        m.style.display = 'block';
        m.style.position = 'absolute';
        // 
        m.style.left = window.innerWidth*0.485-this.w*1.5+this.w*i+window.innerWidth*0.015*i+'px';
        // m.setAttribute("src", imgobjs[i].canvas.toDataURL());
        m.style.top = this.imgmark + Ypos +'px'

        this.imgs.push(m)
      }
      document.getElementById('C_0').setAttribute("src", imgobjs[imgobjs.length-1].canvas.toDataURL());
      document.getElementById('C_2').setAttribute("src", imgobjs[1].canvas.toDataURL());
      
      document.getElementById('C_1').setAttribute("src", imgobjs[0].canvas.toDataURL());
      document.getElementById('C_1').style.opacity=0.9;
      document.getElementById('C_1').addEventListener("click", ()=>{
        // 重複
        this.imgid = this.imgid+1 > imgobjs.length-1 ? 0 : this.imgid+1
        
        document.getElementById('C_0').classList.add('animate__animated', 'animate__slideOutLeft');
        document.getElementById('C_0').addEventListener('animationend', () => {
            document.getElementById('C_0').classList.remove('animate__animated', 'animate__slideOutLeft')
            if (this.imgid==0){
              document.getElementById('C_0').setAttribute("src", imgobjs[imgobjs.length-1].canvas.toDataURL());
            }else if (this.imgid==imgobjs.length-1){
              document.getElementById('C_0').setAttribute("src", imgobjs[imgobjs.length-2].canvas.toDataURL());
            }else{
              document.getElementById('C_0').setAttribute("src", imgobjs[this.imgid-1].canvas.toDataURL());
            }
          
        });
        document.getElementById('C_1').classList.add('animate__animated', 'animate__slideOutLeft');
        document.getElementById('C_1').addEventListener('animationend', () => {
            document.getElementById('C_1').classList.remove('animate__animated', 'animate__slideOutLeft')
            if (this.imgid==0){
              document.getElementById('C_1').setAttribute("src", imgobjs[0].canvas.toDataURL());
            }else if (this.imgid==imgobjs.length-1){
              document.getElementById('C_1').setAttribute("src", imgobjs[imgobjs.length-1].canvas.toDataURL());
            }else{
              document.getElementById('C_1').setAttribute("src", imgobjs[this.imgid].canvas.toDataURL());
            }
        });
        document.getElementById('C_2').classList.add('animate__animated', 'animate__slideOutLeft');
        document.getElementById('C_2').addEventListener('animationend', () => {
            document.getElementById('C_2').classList.remove('animate__animated', 'animate__slideOutLeft')
            if (this.imgid==0){
              document.getElementById('C_2').setAttribute("src", imgobjs[1].canvas.toDataURL());
            }else if (this.imgid==imgobjs.length-1){
              document.getElementById('C_2').setAttribute("src", imgobjs[0].canvas.toDataURL());
            }else{
              document.getElementById('C_2').setAttribute("src", imgobjs[this.imgid+1].canvas.toDataURL());
            }
        });
        
        // console.log(this.imgid)
        // 特殊
        // if (this.imgid==0){
        //   document.getElementById('C_0').setAttribute("src", imgobjs[imgobjs.length-1].canvas.toDataURL());
        //   document.getElementById('C_1').setAttribute("src", imgobjs[0].canvas.toDataURL());
        //   document.getElementById('C_2').setAttribute("src", imgobjs[1].canvas.toDataURL());
        // }else if (this.imgid==imgobjs.length-1){
        //   document.getElementById('C_0').setAttribute("src", imgobjs[imgobjs.length-2].canvas.toDataURL());
        //   document.getElementById('C_1').setAttribute("src", imgobjs[imgobjs.length-1].canvas.toDataURL());
        //   document.getElementById('C_2').setAttribute("src", imgobjs[0].canvas.toDataURL());
        // }else{
        //   document.getElementById('C_0').setAttribute("src", imgobjs[this.imgid-1].canvas.toDataURL());
        //   document.getElementById('C_1').setAttribute("src", imgobjs[this.imgid].canvas.toDataURL());
        //   document.getElementById('C_2').setAttribute("src", imgobjs[this.imgid+1].canvas.toDataURL());
        // }
        
        
        
      }); 
      
      
      // console.log(this.imgs)
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! image
    }else{
    // with img  
      this.wh=wh
      this.w=window.innerWidth*0.8
      this.h=this.w/this.wh
      this.url=url
      this.img = document.createElement('img');
      this.img.setAttribute("src", this.url);
      this.img.setAttribute("width", this.w);
      this.img.setAttribute("height", this.h);

      // image
      document.getElementById("container").appendChild(this.img);
      this.img.style.display = 'block';
      this.img.style.position = 'absolute';

      this.img.style.top = this.imgmark+'px';
      if (this.ty == 'L'){
        this.img.style.left = window.innerWidth*0.2+'px';
      }else{
        this.img.style.right = window.innerWidth*0.2+'px';
      }
      this.name='nameA'
      this.topic='topicA'
      this.desc='nameA'
      this.nameEN='nameA'
      this.topicEN='topicA'
      this.descEN='nameA'
      
      
      // text
      this.txt = document.createElement('div');
      document.getElementById("container").appendChild(this.txt);
      this.txt.setAttribute("width", window.innerWidth*0.15);
      
      this.txt.innerHTML=this.txt.innerHTML=
        '<h1>'+this.name+'</h1>'+
        '<h4 style="margin-Top:1em;">'+this.nameEN+'</h4>'+
        '<h2>'+this.topic+'</h2>'+
        '<h4 style="margin-Top:1em;">'+this.topicEN+'</h4>'+
        '<p style="margin-Top:-0.5em; width:70%;display: inline-block; word-wrap: break-word;">'+this.desc+'</br></br>'+this.descEN+'</p>';;
      this.txt.style.display = 'inline-block';
      this.txt.style.color = 'white';
      this.txt.style.position = 'absolute';
      this.txt.style.margin = '1em';
      
      this.txt.style.top = this.imgmark+this.h*0.8+'px';
      if (this.ty == 'L'){
        this.txt.style.right = window.innerWidth*0.8+'px';
        this.txt.style.direction = 'rtl';
      }else{
        this.txt.style.left = window.innerWidth*0.8+'px';
        this.txt.style.direction = 'ltr';
      }
    }
  }
  display(){
        // !!!!!!!!!!!!!!!!!!!!!!!!!!! image 
        
    
        if (this.ty =='L' || this.ty =='R'){
          this.img.style.top = this.imgmark + Ypos +'px';
          
          if (this.imgmark+Ypos > this.h*0.95){
            this.img.style.opacity=0.2+map((this.imgmark+Ypos)/this.h,1.5,1,0,0.7)
          }else if (this.imgmark+Ypos < this.h*-0.15){          
            this.img.style.opacity=0.2+map((this.imgmark+Ypos)/this.h,-0.5,-1,0.7,0)
          }else {
            this.img.style.opacity=0.9;
          }
          this.txt.style.top = this.imgmark+this.h+Ypos-this.txt.clientHeight-15+'px';
          this.txt.innerHTML=
            '<h1>'+this.name+'</h1>'+
            '<h4 style="margin-Top:1em;">'+this.nameEN+'</h4>'+
            '<h2>'+this.topic+'</h2>'+
            '<h4 style="margin-Top:1em;">'+this.topicEN+'</h4>'+
            '<p style="margin-Top:-0.5em; width:70%;display: inline-block; word-wrap: break-word;">'+this.desc+'</br></br>'+this.descEN+'</p>';
          
          // !!!!!!!!!!!!!!!!!!!!!!!!!!! title
        }else if (this.ty=='TXT'){
            this.txt.style.top = this.imgmark+Ypos+'px';
          
            // if (this.idY==1){
              if(this.imgmark-offsetH+Ypos<=H-150 && this.imgmark-offsetH+Ypos>-150){
                // console.log(this.imgmark-offsetH+Ypos)
                this.show+=1
                if (this.show<10){
                  this.txt.innerHTML= '<div class="animate__animated animate__flipInX"><h1 style="text-align: left;">'+this.txttitle+'</h1><h3 style="text-align: left;"> '+this.txttitleEN+'</h3></div1>'
                }
                // 
              }else {
                this.show=0
                this.txt.innerHTML= '<div><h1 style="text-align: left;">'+this.txttitle+'</h1><h3 style="text-align: left;"> '+this.txttitleEN+'</h3></div1>'
              }
            // !!!!!!!!!!!!!!!!!!!!!!!!!!! carsoule
        }  else if (this.ty=='C'){
          document.getElementById('C_0').style.top = this.imgmark+Ypos+'px';
          document.getElementById('C_1').style.top = this.imgmark+Ypos+'px';
          document.getElementById('C_2').style.top = this.imgmark+Ypos+'px';
          
          // console.log(this.imgs[0])
//           if (this.imgs.length>0){
//             this.imgs.forEach((m,i)=>{
//               m
              
//             })
//             // 格子
//             // if (this.imgid==0){
//             //   this.imgs[0]
//             //   this.imgs[1].setAttribute("src", imgs[0].canvas.toDataURL());
//             //   this.imgs[2].setAttribute("src", imgs[1].canvas.toDataURL());
//             // }else if (this.imgid==imgs.length-1){
//             //   this.imgs[0].setAttribute("src", imgs[imgs.length-2].canvas.toDataURL());
//             //   this.imgs[0].setAttribute("src", imgs[imgs.length-1].canvas.toDataURL());
//             //   this.imgs[0].setAttribute("src", imgs[0].canvas.toDataURL());
//             // }else{
//             //   this.imgs[0].setAttribute("src", imgs[this.imgid].canvas.toDataURL());
//             //   this.imgs[1].setAttribute("src", imgs[this.imgid+1].canvas.toDataURL());
//             //   this.imgs[2].setAttribute("src", imgs[this.imgid+2].canvas.toDataURL());
//             // }
//           }

        }      
        
  }
}