questionText="";
questionText.replace(/[~ ` ! @ # £ € $ ¢ ¥ § % ° ^ & * ( ) - _ + = { } [ ] | \ / : ; \" ' < > , . ?]/g, ' ');

questionText="as454asd545!@#!@@!#@!#@!#!@#!@#!@#!%$&^$%&*%^(^&*()FGDFGHF%$^*^%*%^*&/*/-*-*/-*";
questionText.replace(/[^\w\s]/gi, ' ')


function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent.replace(/[^\w\s]/gi, ' ') || tmp.innerText.replace(/[^\w\s]/gi, ' ') || "";
}