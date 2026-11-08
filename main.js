const menu=document.querySelector(".menu"),nav=document.querySelector(".links");menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));nav.classList.toggle("open",open)});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");nav.classList.remove("open")}));document.addEventListener("keydown",e=>{if(e.key==="Escape"){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}});const enquiryForm=document.getElementById("enquiry");
enquiryForm.addEventListener("submit",async e=>{
 e.preventDefault();
 const form=e.target,status=document.getElementById("status"),button=form.querySelector('button[type="submit"]');
 if(!form.reportValidity())return;
 if(location.protocol==="file:"||location.hostname==="htmlpreview.github.io"){
  status.textContent="Direct enquiry sending is available on our live website. For now, please use the email link.";return;
 }
 button.disabled=true;status.textContent="Sending your enquiry…";
 try{
  const data=new FormData(form);data.set("form-name","enquiry");
  const response=await fetch("/thank-you.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(data).toString()});
  if(!response.ok)throw new Error("Submission failed");
  const result=await response.text();
  if(!result.includes("ENQUIRY_RECEIVED_PAGE"))throw new Error("Form endpoint is not configured");
  status.textContent="Thank you. Your enquiry has been submitted. We will reply using the email address you provided.";form.reset();
 }catch(error){status.textContent="We could not confirm your enquiry was sent. Please email claritymediahouseinc@gmail.com directly or try again later. Your message is still in the form.";}
 finally{button.disabled=false;}
});