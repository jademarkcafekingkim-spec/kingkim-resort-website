(() => {
 'use strict';
 const images=[...document.querySelectorAll('.kk-photo-grid img')];
 if(!images.length||typeof HTMLDialogElement==='undefined')return;
 const dialog=document.createElement('dialog');dialog.className='kk-lightbox';dialog.setAttribute('aria-label','Photo viewer');
 const close=document.createElement('button');close.type='button';close.textContent='Close ×';close.className='kk-lightbox-close';
 const photo=document.createElement('img'),caption=document.createElement('p'),controls=document.createElement('div');controls.className='kk-lightbox-controls';
 const previous=document.createElement('button'),next=document.createElement('button');previous.type=next.type='button';previous.textContent='← Previous';next.textContent='Next →';
 caption.id='kk-lightbox-caption';caption.setAttribute('aria-live','polite');dialog.setAttribute('aria-describedby',caption.id);controls.append(previous,next);dialog.append(close,photo,caption,controls);document.body.append(dialog);
 let index=0,opener=null;
 function show(n){index=(n+images.length)%images.length;photo.src=images[index].src;photo.alt=images[index].alt;caption.textContent=`${index+1} / ${images.length} — ${photo.alt}`;}
 images.forEach((img,n)=>{if(img.closest('a,button'))return;const button=document.createElement('button');button.type='button';button.className='kk-photo-open';button.setAttribute('aria-label',`Enlarge photo: ${img.alt}`);img.before(button);button.append(img);button.addEventListener('click',()=>{opener=button;show(n);dialog.showModal();close.focus();});});
 close.addEventListener('click',()=>dialog.close());previous.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>opener?.focus());
})();
